import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, X, Trash2, Minus, Plus, ArrowRight } from 'lucide-react';
import { useCart } from '../Context/CartContext';
import { Button } from './Common/Button';

export const CartDrawer: React.FC = () => {
    const { t } = useTranslation();
    const {
        cartItems,
        isCartOpen,
        toggleCart,
        removeFromCart,
        updateQuantity,
        totalAmount,
        totalItems
    } = useCart();

    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    };

    const drawerVariants = {
        hidden: { x: '100%' },
        visible: { x: 0 }
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <div className="fixed inset-0 z-[100] flex justify-end">
                    {/* Backdrop */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={backdropVariants}
                        transition={{ duration: 0.3 }}
                        onClick={() => toggleCart(false)}
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={drawerVariants}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="relative w-full max-w-md bg-pfm-bg dark:bg-pfm-bg-dark h-full shadow-2xl flex flex-col overflow-hidden transition-colors duration-300"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-pfm-primary/10">
                            <div className="flex items-center gap-2">
                                <ShoppingCart className="text-pfm-primary" size={24} />
                                <h2 className="text-xl font-bold text-pfm-text dark:text-pfm-text-dark">{t('cart_drawer.title')}</h2>
                                {totalItems > 0 && (
                                    <span className="ml-2 bg-pfm-primary/10 text-pfm-primary text-xs font-bold px-2 py-0.5 rounded-full">
                                        {totalItems}
                                    </span>
                                )}
                            </div>
                            <button
                                onClick={() => toggleCart(false)}
                                className="p-2 hover:bg-pfm-primary/10 rounded-full text-pfm-text-muted transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Cart Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cartItems.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-60">
                                    <div className="p-6 bg-pfm-primary/5 rounded-full">
                                        <ShoppingCart size={48} className="text-pfm-primary" />
                                    </div>
                                    <h3 className="text-lg font-bold">{t('cart_drawer.empty_title')}</h3>
                                    <p className="text-sm max-w-[200px]">{t('cart_drawer.empty_desc')}</p>
                                    <Button
                                        config={{
                                            variant: "light",
                                            color: "primary",
                                            onClick: () => toggleCart(false),
                                            children: t('cart_drawer.continue')
                                        }}
                                    />
                                </div>
                            ) : (
                                cartItems.map((item, idx) => (
                                    <motion.div
                                        key={`${item.product.id}-${idx}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex gap-4 group"
                                    >
                                        <div className="size-24 bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-pfm-primary/10 flex-shrink-0 p-2 shadow-sm transition-transform group-hover:scale-[1.02]">
                                            <img
                                                alt={item.product.name}
                                                className="w-full h-full object-contain"
                                                src={item.product.imgs?.[0]?.url || '/placeholder-product.png'}
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start gap-2">
                                                    <h3 className="font-bold text-pfm-text dark:text-pfm-text-dark line-clamp-2 text-sm">
                                                        {item.product.name}
                                                    </h3>
                                                    <button
                                                        onClick={() => removeFromCart(item.product.id)}
                                                        className="text-pfm-text-muted hover:text-red-500 transition-colors p-1"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                                {item.cartInfo.variants && (
                                                    <div className="flex flex-wrap gap-2 mt-1">
                                                        {item.cartInfo.variants.map((v, vIdx) => (
                                                            <span key={vIdx} className="text-[10px] bg-pfm-primary/5 text-pfm-primary px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                                                                {String(v.value)}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                                <div className="flex items-center border-2 border-pfm-primary/10 rounded-lg h-8 bg-pfm-bg dark:bg-pfm-bg-dark overflow-hidden">
                                                    <button
                                                        onClick={() => updateQuantity(item.product.id, item.cartInfo.amount - 1)}
                                                        className="px-2 h-full hover:bg-pfm-primary/10 text-pfm-text transition-colors disabled:opacity-30"
                                                        disabled={item.cartInfo.amount <= 1}
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="w-8 text-center text-xs font-bold tabular-nums">
                                                        {item.cartInfo.amount}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.product.id, item.cartInfo.amount + 1)}
                                                        className="px-2 h-full hover:bg-pfm-primary/10 text-pfm-text transition-colors"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                                <span className="font-bold text-pfm-primary text-sm">
                                                    ${(item.product.cost * item.cartInfo.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cartItems.length > 0 && (
                            <div className="p-6 bg-pfm-primary/5 dark:bg-pfm-primary/10 border-t border-pfm-primary/10 space-y-6">
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-pfm-text-muted font-medium">{t('cart_drawer.subtotal')}</span>
                                        <span className="font-bold text-pfm-text dark:text-pfm-text-dark">${totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-pfm-text-muted font-medium">{t('cart_drawer.shipping')}</span>
                                        <span className="text-pfm-primary font-bold">{t('cart_drawer.free')}</span>
                                    </div>
                                    <div className="pt-3 border-t border-pfm-primary/10 flex justify-between items-center">
                                        <span className="text-base font-extrabold text-pfm-text dark:text-pfm-text-dark uppercase tracking-tight">{t('cart_drawer.total')}</span>
                                        <span className="text-2xl font-black text-pfm-primary tracking-tight">
                                            ${totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Button
                                        config={{
                                            variant: "solid",
                                            color: "primary",
                                            className: "w-full h-14 rounded-xl font-bold text-lg shadow-lg shadow-pfm-primary/20",
                                            children: (
                                                <div className="flex items-center justify-center gap-2">
                                                    {t('cart_drawer.checkout')}
                                                    <ArrowRight size={20} />
                                                </div>
                                            )
                                        }}
                                    />
                                    <p className="text-center">
                                        <button
                                            onClick={() => toggleCart(false)}
                                            className="text-sm text-pfm-text-muted hover:text-pfm-primary transition-colors font-bold uppercase tracking-wider"
                                        >
                                            {t('cart_drawer.continue')}
                                        </button>
                                    </p>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
