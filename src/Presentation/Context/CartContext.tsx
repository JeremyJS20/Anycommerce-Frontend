import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import type { Product, AttributeType } from '../../Domain/Entities/product';
import type { cartProducts } from '../Utils/types.utils';
import { userService } from '../../Infrastructure/Services/User.service';
import { useAuth } from './AuthContext';
import { toast } from '../Utils/ToastService';

interface CartContextType {
    cartItems: cartProducts[];
    isCartOpen: boolean;
    totalAmount: number;
    totalItems: number;
    addToCart: (product: Product, quantity: number, variants: AttributeType[] | null) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    toggleCart: (isOpen?: boolean) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const [cartItems, setCartItems] = useState<cartProducts[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const cartRef = React.useRef<cartProducts[]>(cartItems);

    // Keep cartRef in sync
    useEffect(() => {
        cartRef.current = cartItems;
    }, [cartItems]);

    const GUEST_KEY = 'anycommerce_cart_guest';
    const AUTH_KEY = 'anycommerce_cart_auth';

    // Initialize cart from localStorage or Backend and Merge
    useEffect(() => {
        const syncAndLoadCart = async () => {
            if (isAuthenticated) {
                try {
                    let backendCart: cartProducts[] = [];
                    let cartNotFound = false;

                    try {
                        backendCart = await userService.getCart();
                    } catch (error: any) {
                        if (error?.statusCode === 404) {
                            cartNotFound = true;
                        } else {
                            throw error;
                        }
                    }

                    const guestCartStr = localStorage.getItem(GUEST_KEY);
                    const guestItems: cartProducts[] = guestCartStr ? JSON.parse(guestCartStr) : [];

                    if (guestItems.length === 0) {
                        setCartItems(backendCart);
                        localStorage.setItem(AUTH_KEY, JSON.stringify(backendCart));
                        setIsLoaded(true);
                        return;
                    }

                    // Merge local guest cart with backend cart
                    let mergedCart = [...backendCart];
                    guestItems.forEach(guestItem => {
                        const existingIndex = mergedCart.findIndex(item =>
                            item.product.id === guestItem.product.id &&
                            JSON.stringify(item.cartInfo.variants) === JSON.stringify(guestItem.cartInfo.variants)
                        );

                        if (existingIndex > -1) {
                            mergedCart = mergedCart.map((item, idx) =>
                                idx === existingIndex
                                    ? { ...item, cartInfo: { ...item.cartInfo, amount: item.cartInfo.amount + guestItem.cartInfo.amount } }
                                    : item
                            );
                        } else {
                            mergedCart.push({ ...guestItem });
                        }
                    });

                    setCartItems(mergedCart);

                    // Sync merged result back to backend
                    if (cartNotFound && mergedCart.length > 0) {
                        await userService.createCart(mergedCart);
                    } else if (mergedCart.length > 0) {
                        await userService.updateCart(mergedCart);
                    }

                    // Clear guest cart as it's now merged
                    localStorage.removeItem(GUEST_KEY);
                    localStorage.setItem(AUTH_KEY, JSON.stringify(mergedCart));
                } catch (error) {
                    console.error('Error fetching/merging backend cart:', error);
                    const savedAuthCart = localStorage.getItem(AUTH_KEY);
                    if (savedAuthCart) setCartItems(JSON.parse(savedAuthCart));
                }
            } else {
                const guestCart = localStorage.getItem(GUEST_KEY);
                if (guestCart) {
                    setCartItems(JSON.parse(guestCart));
                } else {
                    setCartItems([]);
                }
            }
            setIsLoaded(true);
        };

        setIsLoaded(false);
        syncAndLoadCart();
    }, [isAuthenticated]);

    // Persist to localStorage and sync with Backend (debounced)
    useEffect(() => {
        if (!isLoaded) return;

        const key = isAuthenticated ? AUTH_KEY : GUEST_KEY;
        localStorage.setItem(key, JSON.stringify(cartItems));

        const syncWithBackend = async () => {
            if (isAuthenticated) {
                try {
                    // Use the ref to ensure we always send the absolute latest state
                    await userService.updateCart(cartRef.current);
                } catch (error) {
                    console.error('Error syncing cart with backend:', error);
                }
            }
        };

        const timeoutId = setTimeout(syncWithBackend, 500); // reduced debounce
        return () => clearTimeout(timeoutId);
    }, [cartItems, isAuthenticated, isLoaded]);

    const totalAmount = useMemo(() => {
        return cartItems.reduce((total, item) => {
            let price = item.product.cost;
            // Add variant prices if applicable
            if (item.cartInfo.variants) {
                item.cartInfo.variants.forEach(v => {
                    if (v.price) price += v.price;
                });
            }
            return total + (price * item.cartInfo.amount);
        }, 0);
    }, [cartItems]);

    const totalItems = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.cartInfo.amount, 0);
    }, [cartItems]);

    const toggleCart = useCallback((isOpen?: boolean) => {
        setIsCartOpen(prev => isOpen !== undefined ? isOpen : !prev);
    }, []);

    const addToCart = useCallback((product: Product, quantity: number, variants: AttributeType[] | null) => {
        setCartItems(prev => {
            // Check if item with same ID and variants already exists
            const existingItemIndex = prev.findIndex(item =>
                item.product.id === product.id &&
                JSON.stringify(item.cartInfo.variants) === JSON.stringify(variants)
            );

            if (existingItemIndex > -1) {
                return prev.map((item, index) =>
                    index === existingItemIndex
                        ? { ...item, cartInfo: { ...item.cartInfo, amount: item.cartInfo.amount + quantity } }
                        : item
                );
            }

            return [...prev, {
                product,
                cartInfo: {
                    amount: quantity,
                    variants
                }
            }];
        });
        toast.success("toast.success_title", {
            descriptionKey: "toast.cart_added",
            params: { quantity, product: product.name }
        });
    }, []);

    const removeFromCart = useCallback((productId: string) => {
        setCartItems(prev => prev.filter(item => item.product.id !== productId));
    }, []);

    const updateQuantity = useCallback((productId: string, quantity: number) => {
        setCartItems(prev => prev.map(item =>
            item.product.id === productId
                ? { ...item, cartInfo: { ...item.cartInfo, amount: Math.max(1, quantity) } }
                : item
        ));
    }, []);

    const clearCart = useCallback(() => {
        setCartItems([]);
        if (isAuthenticated) {
            userService.removeCart().catch(err => console.error('Error clearing backend cart:', err));
        }
        toast.info("toast.cart_cleared_title", { descriptionKey: "toast.cart_cleared" });
    }, [isAuthenticated]);

    return (
        <CartContext.Provider value={{
            cartItems,
            isCartOpen,
            totalAmount,
            totalItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            toggleCart,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
