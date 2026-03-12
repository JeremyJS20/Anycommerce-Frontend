import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
    ShoppingCart,
    ChevronRight,
    Star,
    StarHalf,
    Minus,
    Plus,
    Heart,
    RotateCcw,
    Store as StoreIcon,
    Lock,
    ArrowRight,
    ArrowLeft,
    Shield,
    Clock,
    CreditCard,
    Zap,
    HelpCircle,
    Info,
    MessageSquare,
    Truck,
    ShieldCheck,
    Check
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Button } from '@Presentation/Components/Common/Button';
import ProductVariantSelection from '@Presentation/Components/Common/ProductVariantSelection';
import { ProductCard } from '@Presentation/Components/Common/ProductCard';
import {
    Skeleton,
    Tabs,
    Tab,
    Card,
    CardBody
} from "@heroui/react";
import { productService } from '@Infrastructure/Services/Product.service';
import { storeService } from '@Infrastructure/Services/Store.service';
import type { Product, ProductAdditionalData, AttributeType } from '@Domain/Entities/product';
import type { Store } from '@Domain/Entities/store';
import { getCategoryTranslationKey } from '@Presentation/Utils/translationUtils';
import { useCart } from '@Presentation/Context/CartContext';

// Icon mapping for dynamic feature rendering from string names
const ICON_MAP: Record<string, LucideIcon> = {
    truck: Truck,
    shieldCheck: ShieldCheck,
    check: Check,
    info: Info,
    messageSquare: MessageSquare,
    rotateCcw: RotateCcw,
    lock: Lock,
    shield: Shield,
    clock: Clock,
    creditCard: CreditCard,
    zap: Zap,
    star: Star,
    heart: Heart,
    arrowLeft: ArrowLeft,
    store: StoreIcon,
    warranty: ShieldCheck,
    shipping: Truck
};

export const ProductDetails = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { productId } = useParams<{ productId: string }>();
    const { addToCart } = useCart();

    const [product, setProduct] = useState<Product | null>(null);
    const [additionalData, setAdditionalData] = useState<ProductAdditionalData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
    const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
    const [loadingSimilar, setLoadingSimilar] = useState(false);
    const [store, setStore] = useState<Store | null>(null);
    const [loadingStore, setLoadingStore] = useState(false);

    const fetchProduct = useCallback(async () => {
        if (!productId) return;
        setLoading(true);
        setError(null);
        try {
            const response = await productService.getProductById(productId);
            setProduct(response.data);
            setAdditionalData(response.additionalData);

            // Set default variants for all available variant types
            if (response.data.variants) {
                const initialVariants: Record<string, string> = {};
                Object.entries(response.data.variants).forEach(([type, options]) => {
                    if (options && options.length > 0) {
                        const defaultOpt = options.find(opt => opt.default) || options[0];
                        initialVariants[type] = defaultOpt.key;
                    }
                });
                setSelectedVariants(initialVariants);
            }
        } catch (err) {
            console.error('Error fetching product details:', err);
            setError('Failed to load product details. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, [productId]);

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);

    const fetchSimilarProducts = useCallback(async (categoryId: string) => {
        setLoadingSimilar(true);
        console.log('Fetching similar products for categoryId:', categoryId);
        try {
            const response = await productService.getProducts({ categoryId, limit: 10 });
            console.log('Raw API Response data:', response.data);

            const productsArray = Array.isArray(response.data) ? response.data : [];

            // Filter out the current product and take only first 4
            const filtered = productsArray
                .filter(p => String(p.id) !== String(productId))
                .slice(0, 4);

            setSimilarProducts(filtered);
        } catch (err) {
            console.error('Error fetching similar products:', err);
        } finally {
            setLoadingSimilar(false);
        }
    }, [productId]);

    useEffect(() => {
        if (product?.categoryId) {
            fetchSimilarProducts(product.categoryId);
        }
    }, [product?.categoryId, fetchSimilarProducts]);

    const fetchStore = useCallback(async (storeId: string) => {
        setLoadingStore(true);
        try {
            const response = await storeService.getStoreById(storeId);
            setStore(response.data);
        } catch (err) {
            console.error('Error fetching store details:', err);
        } finally {
            setLoadingStore(false);
        }
    }, []);

    useEffect(() => {
        if (product?.storeId) {
            fetchStore(product.storeId);
        }
    }, [product?.storeId, fetchStore]);

    const totalPrice = useMemo(() => {
        if (!product) return 0;
        let total = product.cost;
        if (product.variants) {
            Object.entries(product.variants).forEach(([type, options]) => {
                const selectedKey = selectedVariants[type];
                if (selectedKey) {
                    const selectedOpt = options.find(opt => opt.key === selectedKey);
                    if (selectedOpt?.price) {
                        total += selectedOpt.price;
                    }
                }
            });
        }
        return total;
    }, [product, selectedVariants]);

    const handleQuantityChange = (type: 'inc' | 'dec') => {
        setQuantity(prev => {
            if (type === 'inc') return Math.min(prev + 1, product?.stock || 99);
            return Math.max(prev - 1, 1);
        });
    };

    const handleAddToCart = () => {
        if (!product) return;

        const selectedVariantsList: AttributeType[] = [];
        if (product.variants) {
            Object.entries(product.variants).forEach(([type, options]) => {
                const selectedKey = selectedVariants[type];
                if (selectedKey) {
                    const selectedOpt = options.find(opt => opt.key === selectedKey);
                    if (selectedOpt) {
                        selectedVariantsList.push(selectedOpt);
                    }
                }
            });
        }

        addToCart(product, quantity, selectedVariantsList.length > 0 ? selectedVariantsList : null);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-pfm-bg transition-colors duration-300">
                <div className="mx-auto max-w-[1280px] px-6 py-12 lg:px-12">
                    <Skeleton className="h-6 w-48 rounded-lg mb-8" />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <Skeleton className="aspect-square w-full rounded-2xl" />
                        <div className="space-y-6">
                            <Skeleton className="h-4 w-24 rounded-lg" />
                            <Skeleton className="h-12 w-3/4 rounded-lg" />
                            <Skeleton className="h-6 w-1/2 rounded-lg" />
                            <Skeleton className="h-24 w-full rounded-2xl" />
                            <div className="flex gap-4">
                                <Skeleton className="h-14 flex-1 rounded-xl" />
                                <Skeleton className="h-14 flex-1 rounded-xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen bg-pfm-bg flex items-center justify-center p-6">
                <Card className="max-w-md w-full p-8 text-center border-none shadow-2xl bg-pfm-card dark:bg-pfm-card/10 backdrop-blur-md">
                    <div className="bg-red-500/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-red-500">
                        <Info size={32} />
                    </div>
                    <h2 className="text-2xl font-bold mb-2 text-pfm-text dark:text-pfm-text-dark">{t('common.error', 'Something went wrong')}</h2>
                    <p className="text-pfm-text-muted mb-8">{error || t('product.not_found', 'Product not found.')}</p>
                    <div className="flex flex-col gap-3">
                        <Button
                            config={{
                                variant: "solid",
                                color: "primary",
                                onClick: () => window.location.reload(),
                                children: t('common.retry', 'Try Again')
                            }}
                        />
                        <Link to="/products">
                            <Button
                                config={{
                                    variant: "light",
                                    className: "w-full",
                                    children: (
                                        <div className="flex items-center gap-2">
                                            <ArrowLeft size={16} />
                                            {t('product.back_to_shop', 'Back to Shop')}
                                        </div>
                                    )
                                }}
                            />
                        </Link>
                    </div>
                </Card>
            </div>
        );
    }

    const mainImage = product.imgs?.[selectedImage]?.url || '/placeholder-product.png';

    return (
        <div className="min-h-screen bg-pfm-bg text-pfm-text transition-colors duration-300">
            <main className="mx-auto max-w-[1280px] px-6 py-8 md:px-20 w-full">
                {/* Breadcrumbs */}
                <nav className="flex flex-wrap gap-2 items-center mb-8 text-sm font-medium">
                    <Link to="/products" className="text-pfm-primary hover:underline">{t('products.header.breadcrumb_products', 'Products')}</Link>
                    <span className="text-slate-400"><ChevronRight size={14} /></span>
                    <Link
                        to={`/products?category=${product.categoryId}`}
                        className="text-pfm-primary hover:underline"
                    >
                        {t(getCategoryTranslationKey(product.categoryName), product.categoryName)}
                    </Link>
                    <span className="text-slate-400"><ChevronRight size={14} /></span>
                    <span className="text-pfm-text-muted truncate max-w-[200px] md:max-w-none">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Left Column: Gallery */}
                    <div className="flex flex-col gap-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative aspect-square w-full bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-pfm-border shadow-sm flex items-center justify-center group"
                        >
                            <img
                                src={mainImage}
                                alt={product.name}
                                className="w-full h-full object-contain p-8 md:p-12 transition-transform duration-700 group-hover:scale-110"
                            />
                        </motion.div>

                        {/* Thumbnails */}
                        {product.imgs && product.imgs.length > 1 && (
                            <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
                                {product.imgs.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(idx)}
                                        className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all p-2 bg-white dark:bg-slate-800 ${selectedImage === idx
                                            ? 'border-pfm-primary shadow-lg ring-2 ring-pfm-primary/20'
                                            : 'border-pfm-border opacity-70 hover:opacity-100 hover:border-pfm-primary/50'
                                            }`}
                                    >
                                        <img src={img.url} alt={`${product.name} thumbnail ${idx + 1}`} className="w-full h-full object-contain" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Column: Info */}
                    <div className="flex flex-col gap-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-pfm-primary text-xs font-bold tracking-[0.2em] uppercase">{product.subcategory || product.categoryName}</span>
                                <span className="h-1 w-1 bg-pfm-border rounded-full"></span>
                                <div className="flex items-center gap-1.5 text-amber-500">
                                    <div className="flex items-center gap-0.5">
                                        {[...Array(5)].map((_, i) => {
                                            const ratingValue = i + 1;
                                            if ((product.rating || 0) >= ratingValue) {
                                                return <Star key={i} size={14} className="fill-current" />;
                                            } else if ((product.rating || 0) >= ratingValue - 0.5) {
                                                return <StarHalf key={i} size={14} className="fill-current" />;
                                            } else {
                                                return <Star key={i} size={14} className="opacity-30" />;
                                            }
                                        })}
                                    </div>
                                    <span className="text-pfm-text-muted text-xs font-bold ml-1">({(product.rating || 0).toFixed(1)})</span>
                                </div>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-pfm-text dark:text-pfm-text-dark leading-tight tracking-tight mb-3">
                                {product.name}
                            </h1>
                            <p className="text-pfm-text-muted text-lg font-medium italic opacity-80 leading-relaxed">
                                {product.details.description.split('.')[0]}.
                            </p>
                        </div>

                        {/* Price Card */}
                        <Card className="border border-pfm-primary/20 shadow-none bg-pfm-primary/5 dark:bg-pfm-primary/10 backdrop-blur-sm overflow-hidden rounded-[24px]">
                            <CardBody className="p-6">
                                <div className="flex items-baseline gap-4 mb-3">
                                    <span className="text-3xl md:text-4xl font-bold text-pfm-primary tracking-tight">
                                        ${totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </span>
                                    {product.oldPrice && (
                                        <span className="text-pfm-text-muted line-through text-lg opacity-50 font-medium">
                                            $ {product.oldPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-2.5 text-pfm-primary font-bold text-sm">
                                    <Check size={18} />
                                    <span>{product.stock > 0 ? t('product.in_stock', { count: product.stock, defaultValue: `+${product.stock} units available` }) : t('product.out_of_stock', 'Out of stock')}</span>
                                </div>
                            </CardBody>
                        </Card>

                        {/* Variants */}
                        <div className="flex flex-col gap-8">
                            {product.variants && Object.entries(product.variants).map(([type, options]) => {
                                if (!options || options.length === 0) return null;

                                return (
                                    <ProductVariantSelection
                                        key={type}
                                        label={t(`product.${type.toLowerCase()}`, type.charAt(0).toUpperCase() + type.slice(1))}
                                        type={type.toLowerCase() === 'colors' || type.toLowerCase() === 'color' ? 'color' : 'size'}
                                        options={options
                                            .filter(opt => opt.available !== false)
                                            .map(opt => ({ key: opt.key, value: typeof opt.value === 'string' ? opt.value : opt.key }))}
                                        selectedOption={selectedVariants[type] || ''}
                                        onSelect={(val) => {
                                            setSelectedVariants(prev => ({ ...prev, [type]: val }));
                                        }}
                                    />
                                );
                            })}
                        </div>

                        {/* Quantity */}
                        <div className="flex flex-col gap-4">
                            <p className="text-pfm-text dark:text-pfm-text-dark font-bold text-sm uppercase tracking-widest">{t('product.quantity', 'Quantity')}</p>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center border-2 border-pfm-border rounded-2xl h-12 bg-white dark:bg-pfm-card/5 overflow-hidden ring-pfm-primary/5 focus-within:ring-4 focus-within:border-pfm-primary/50 transition-all">
                                    <button
                                        onClick={() => handleQuantityChange('dec')}
                                        className="px-5 h-full hover:bg-pfm-primary/10 text-pfm-text transition-colors disabled:opacity-20"
                                        disabled={quantity <= 1}
                                    >
                                        <Minus size={20} />
                                    </button>
                                    <span className="w-12 text-center font-bold text-lg tabular-nums">{quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange('inc')}
                                        className="px-5 h-full hover:bg-pfm-primary/10 text-pfm-text transition-colors disabled:opacity-20"
                                        disabled={quantity >= (product.stock || 99)}
                                    >
                                        <Plus size={20} />
                                    </button>
                                </div>
                                {quantity >= (product.stock || 99) && (
                                    <span className="text-xs font-bold text-pfm-text-muted uppercase tracking-wider opacity-60">
                                        {t('product.max_units', 'Maximum availability reached')}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-4">
                            <Button
                                config={{
                                    variant: "solid",
                                    color: "primary",
                                    className: "flex-1 h-14 rounded-xl font-bold text-lg shadow-lg shadow-pfm-primary/20 active:scale-95 transition-all px-10",
                                    onClick: handleAddToCart,
                                    children: (
                                        <div className="flex items-center justify-center gap-3">
                                            <ShoppingCart size={22} className="stroke-[2]" />
                                            {t('product.add_to_cart', 'Add to Cart')}
                                        </div>
                                    )
                                }}
                            />
                            <Button
                                config={{
                                    variant: "bordered",
                                    className: "flex-1 h-14 rounded-xl font-bold text-lg border-2 border-pfm-primary text-pfm-primary hover:bg-pfm-primary/5 active:scale-95 transition-all px-10",
                                    children: t('product.buy_now', 'Buy Now')
                                }}
                            />
                            <Button
                                config={{
                                    isIconOnly: true,
                                    variant: "bordered",
                                    className: "w-14 h-14 rounded-xl border-pfm-border text-pfm-text-muted hover:text-red-500 hover:border-red-500 hover:bg-red-50 transition-all active:scale-90",
                                    children: <Heart size={24} />
                                }}
                            />
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-2 gap-6 pt-10 border-t border-pfm-border mt-4">
                            {product.features && product.features.length > 0 ? (
                                product.features.map((feature) => {
                                    // Map kebab-case from backend to camelCase for ICON_MAP
                                    const iconKey = feature.icon.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                                    const IconComponent = ICON_MAP[iconKey] || ICON_MAP[feature.icon] || ICON_MAP[feature.key] || HelpCircle;
                                    return (
                                        <div key={feature.key} className="flex items-center gap-3.5 text-sm font-bold text-pfm-text-muted" title={feature.details}>
                                            <div className="p-2 bg-pfm-primary/10 rounded-xl text-pfm-primary">
                                                <IconComponent size={18} />
                                            </div>
                                            {feature.label}
                                        </div>
                                    );
                                })
                            ) : (
                                <>
                                    <div className="flex items-center gap-3.5 text-sm font-bold text-pfm-text-muted">
                                        <div className="p-2 bg-pfm-primary/10 rounded-xl text-pfm-primary">
                                            <Truck size={18} />
                                        </div>
                                        {t('product.shipping_info', 'Free express delivery')}
                                    </div>
                                    <div className="flex items-center gap-3.5 text-sm font-bold text-pfm-text-muted">
                                        <div className="p-2 bg-pfm-primary/10 rounded-xl text-pfm-primary">
                                            <ShieldCheck size={18} />
                                        </div>
                                        {t('product.warranty_info', '2 Year Warranty')}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Tabs */}
                <div className="mt-24">
                    <Tabs
                        aria-label="Product details"
                        variant="underlined"
                        color="primary"
                        fullWidth
                        classNames={{
                            tabList: "w-full relative rounded-none p-0 border-b border-pfm-border",
                            cursor: "w-full bg-pfm-primary h-1",
                            tab: "px-2 h-14 text-md font-bold text-pfm-text-muted",
                            tabContent: "group-data-[selected=true]:text-pfm-primary"
                        }}
                    >
                        <Tab
                            key="details"
                            title={t('product.tabs.details', 'Details')}
                        >
                            <div className="py-12 grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="space-y-8"
                                >
                                    <div className="flex items-center gap-3">
                                        <Info className="text-pfm-primary" size={24} />
                                        <h3 className="text-xl font-extrabold text-pfm-text dark:text-pfm-text-dark uppercase tracking-tight">{t('product.overview', 'Product Overview')}</h3>
                                    </div>
                                    <p className="text-pfm-text-muted text-lg leading-relaxed font-medium">
                                        {product.details.description}
                                    </p>
                                    <ul className="space-y-5">
                                        {[
                                            t('product.feature_1', 'High-performance components engineered for excellence'),
                                            t('product.feature_2', 'Advanced thermal management for sustained performance'),
                                            t('product.feature_3', 'Premium design and build quality for long-lasting durability')
                                        ].map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-4 text-pfm-text-muted font-medium">
                                                <div className="mt-1 flex-shrink-0 size-6 bg-pfm-primary rounded-full flex items-center justify-center text-white">
                                                    <Check size={14} strokeWidth={4} />
                                                </div>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>

                                {product.details.characteristics && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        className="bg-pfm-primary/5 dark:bg-pfm-card/10 rounded-[32px] p-8 md:p-10 border border-pfm-primary/10 h-fit shadow-inner"
                                    >
                                        <h3 className="text-lg font-bold text-pfm-text dark:text-pfm-text-dark mb-10 uppercase tracking-widest text-center">{t('product.specs', 'Technical Characteristics')}</h3>
                                        <div className="space-y-5">
                                            {product.details.characteristics.map((spec, idx) => (
                                                <div key={idx} className={`flex justify-between items-center gap-4 pb-4 ${idx !== product.details.characteristics!.length - 1 ? 'border-b border-pfm-primary/10' : ''}`}>
                                                    <span className="text-pfm-text-muted font-bold text-sm tracking-wide uppercase opacity-70">{spec.text || spec.key}</span>
                                                    <span className="text-slate-900 dark:text-slate-100 font-semibold text-right">{spec.value?.toString()}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </Tab>
                        <Tab
                            key="reviews"
                            title={
                                <div className="flex items-center gap-2">
                                    <MessageSquare size={18} />
                                    <span>{t('product.tabs.reviews', 'Reviews')}</span>
                                    {additionalData?.totalReviews !== undefined && (
                                        <div className="px-2 py-0.5 bg-pfm-primary/10 text-pfm-primary text-[10px] font-bold rounded-full">
                                            {additionalData.totalReviews}
                                        </div>
                                    )}
                                </div>
                            }
                        >
                            <div className="py-20 text-center">
                                <div className="bg-pfm-card/20 border border-pfm-border border-dashed p-16 rounded-[40px]">
                                    <MessageSquare size={48} className="mx-auto mb-6 text-pfm-border" />
                                    <h4 className="text-xl font-bold mb-2">{t('product.reviews.empty_title', 'No reviews yet')}</h4>
                                    <p className="text-pfm-text-muted mb-8">{t('product.reviews.empty_desc', 'Be the first to share your experience with this product.')}</p>
                                    <Button config={{ variant: "shadow", color: "primary", children: t('product.reviews.write', 'Write a Review') }} />
                                </div>
                            </div>
                        </Tab>
                        <Tab
                            key="shipping"
                            title={
                                <div className="flex items-center gap-2">
                                    <RotateCcw size={18} />
                                    <span>{t('product.tabs.shipping', 'Shipping & Returns')}</span>
                                </div>
                            }
                        >
                            <div className="py-12 max-w-3xl">
                                <div className="space-y-10">
                                    <div className="space-y-4">
                                        <h4 className="text-lg font-extrabold uppercase tracking-tight">{t('product.shipping.delivery_title', 'Global Express Shipping')}</h4>
                                        <p className="text-pfm-text-muted leading-relaxed font-medium">
                                            We offer free express delivery to over 150 countries. Orders are typically processed within 24 hours and delivered within 3-5 business days. Real-time tracking is provided for every shipment.
                                        </p>
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="text-lg font-extrabold uppercase tracking-tight">{t('product.shipping.returns_title', 'Hassle-Free Returns')}</h4>
                                        <p className="text-pfm-text-muted leading-relaxed font-medium">
                                            Not satisfied with your purchase? No problem. We provide a 30-day return policy. Simply initiate a return from your account dashboard, and we'll handle the rest.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                </div>

                {/* Store Info Section */}
                <div className="mt-16 mb-10">
                    <h2 className="text-3xl font-extrabold text-pfm-text dark:text-pfm-text-dark tracking-tight">
                        {t('store_info.title', 'Store Information')}
                    </h2>
                </div>
                <section className="bg-white dark:bg-pfm-card/20 rounded-[32px] border border-pfm-border p-8 md:p-10 shadow-sm">
                    {loadingStore ? (
                        <div className="space-y-8">
                            <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <Skeleton className="size-20 rounded-2xl" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-6 w-40 rounded-lg" />
                                        <Skeleton className="h-4 w-20 rounded-lg" />
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <Skeleton className="w-32 h-12 rounded-xl" />
                                    <Skeleton className="w-32 h-12 rounded-xl" />
                                </div>
                            </div>
                            <div className="pt-6 border-t border-pfm-border/30">
                                <Skeleton className="h-4 w-full rounded-lg" />
                                <Skeleton className="h-4 w-3/4 rounded-lg mt-2" />
                            </div>
                        </div>
                    ) : store ? (
                        <div className="space-y-8">
                            <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <div className="size-20 flex items-center justify-center bg-pfm-primary text-white rounded-2xl shadow-xl shadow-pfm-primary/20 overflow-hidden">
                                        {store.logoUrl ? (
                                            <img src={store.logoUrl} alt={store.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <StoreIcon size={36} />
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-extrabold text-pfm-text dark:text-pfm-text-dark tracking-tight">
                                            {store.name}
                                        </h3>
                                        <div className="flex items-center gap-1.5 text-amber-500 mt-1.5">
                                            <span className="text-pfm-text dark:text-pfm-text-dark text-lg font-bold">
                                                {store.metrics.rating.toFixed(1)}/5.0
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-4 min-w-fit">
                                    <Button
                                        config={{
                                            variant: "bordered",
                                            className: "px-8 h-12 rounded-xl font-bold border-pfm-primary text-pfm-primary hover:bg-pfm-primary/5 transition-all text-base",
                                            children: t('store_info.visit_store', 'Visit Store'),
                                            onClick: () => navigate(`/store/${store.id}`)
                                        }}
                                    />
                                    <Button
                                        config={{
                                            variant: "solid",
                                            color: "primary",
                                            className: "px-8 h-12 rounded-xl font-bold shadow-lg shadow-pfm-primary/20 transition-all text-base",
                                            children: t('store_info.follow', 'Follow')
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="pt-8 border-t border-pfm-border/50">
                                <p className="text-pfm-text-muted text-lg leading-relaxed font-medium">
                                    {store.description}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-6 text-pfm-text-muted">
                            {t('store_info.not_found', 'Store information unavailable')}
                        </div>
                    )}

                    {store && (
                        <>
                            <div className="h-px bg-pfm-border my-10 w-full opacity-50"></div>
                            <div className="flex flex-wrap gap-10 justify-center md:justify-start">
                                {store.features.map((feature) => {
                                    const IconComponent = ICON_MAP[feature.icon] || HelpCircle;
                                    return (
                                        <div key={feature.key} className="flex items-center gap-3 text-pfm-text-muted font-bold text-base" title={feature.details}>
                                            <IconComponent size={22} className="text-pfm-primary" />
                                            {feature.label}
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </section>

                {/* Similar Items Section */}
                <section className="mt-16 mb-16">
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-3xl font-extrabold text-pfm-text dark:text-pfm-text-dark tracking-tight">
                            {t('similar_items.title', 'Similar Items')}
                        </h2>
                        {!loadingSimilar && similarProducts.length > 0 && (
                            <Link to={`/products?categoryId=${product?.categoryId}`} className="text-pfm-primary font-bold flex items-center gap-2 hover:translate-x-1 transition-transform">
                                {t('similar_items.view_all', 'View All')}
                                <ArrowRight size={20} />
                            </Link>
                        )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {loadingSimilar ? (
                            [...Array(4)].map((_, idx) => (
                                <div key={idx} className="space-y-4">
                                    <Skeleton className="rounded-xl aspect-[3/4]" />
                                    <Skeleton className="h-4 w-3/4 rounded-lg" />
                                    <Skeleton className="h-6 w-1/2 rounded-lg" />
                                </div>
                            ))
                        ) : (
                            similarProducts.map((p, idx) => (
                                <ProductCard
                                    key={p.id}
                                    id={p.id}
                                    index={idx}
                                    title={p.name}
                                    price={`${p.currency === 'USD' ? '$' : p.currency} ${p.cost.toFixed(2)}`}
                                    image={p.imgs?.[0]?.url || 'https://via.placeholder.com/400'}
                                    rating={p.rating ?? undefined}
                                    product={p}
                                />
                            ))
                        )}
                    </div>
                    {!loadingSimilar && similarProducts.length === 0 && (
                        <div className="text-center py-10 text-pfm-text-muted">
                            {t('similar_items.no_items', 'No similar items found.')}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};
