import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Store as StoreIcon,
    Star,
    Users,
    Calendar,
    ShieldCheck,
    Truck,
    Lock,
    RotateCcw,
    Shield,
    Clock,
    CreditCard,
    Zap,
    HelpCircle,
    Mail,
    MapPin,
    ArrowRight,
    CheckCircle2
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Button } from '@Presentation/Components/Common/Button';
import { ProductCard } from '@Presentation/Components/Common/ProductCard';
import { Skeleton } from "@heroui/react";
import { storeService } from '@Infrastructure/Services/Store.service';
import { productService } from '@Infrastructure/Services/Product.service';
import type { Store } from '@Domain/Entities/store';
import type { Product } from '@Domain/Entities/product';

const ICON_MAP: Record<string, LucideIcon> = {
    truck: Truck,
    shieldCheck: ShieldCheck,
    rotateCcw: RotateCcw,
    lock: Lock,
    shield: Shield,
    clock: Clock,
    creditCard: CreditCard,
    zap: Zap,
    star: Star,
    store: StoreIcon,
    bolt: Zap,
    supportAgent: HelpCircle,
    locationOn: MapPin
};

export const StoreDetails = () => {
    const { t } = useTranslation();
    const { storeId } = useParams<{ storeId: string }>();
    const [store, setStore] = useState<Store | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingProducts, setLoadingProducts] = useState(true);

    const fetchStoreData = useCallback(async () => {
        if (!storeId) return;
        setLoading(true);
        try {
            const response = await storeService.getStoreById(storeId);
            setStore(response.data);

            // Fetch products for this store
            setLoadingProducts(true);
            const productsResponse = await productService.getProducts({ storeId, limit: 12 });
            setProducts(productsResponse.data);
        } catch (err) {
            console.error('Error fetching store details:', err);
        } finally {
            setLoading(false);
            setLoadingProducts(false);
        }
    }, [storeId]);

    useEffect(() => {
        fetchStoreData();
    }, [fetchStoreData]);

    if (loading && !store) {
        return (
            <div className="container mx-auto px-6 md:px-10 py-10">
                <Skeleton className="h-64 w-full rounded-3xl mb-8" />
                <div className="flex gap-8 items-end -mt-20 px-10">
                    <Skeleton className="size-32 rounded-2xl border-4 border-white shadow-xl" />
                    <div className="mb-4 space-y-2">
                        <Skeleton className="h-8 w-64 rounded-lg" />
                        <Skeleton className="h-4 w-40 rounded-lg" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-20">
                    <div className="md:col-span-4">
                        <Skeleton className="h-64 w-full rounded-2xl" />
                    </div>
                    <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="space-y-4">
                                <Skeleton className="rounded-xl aspect-square" />
                                <Skeleton className="h-4 w-3/4 rounded-lg" />
                                <Skeleton className="h-6 w-1/2 rounded-lg" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (!store) return null;

    return (
        <div className="min-h-screen bg-pfm-bg dark:bg-background-dark text-slate-900 dark:text-slate-100">


            <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col pb-20">
                {/* Banner Section */}
                <div className="relative px-4 pt-6 md:px-0">
                    <div className="h-48 w-full overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800 md:h-80 relative group">
                        {store.coverImageUrl ? (
                            <img
                                src={store.coverImageUrl}
                                alt={store.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        ) : (
                            <div className="h-full w-full bg-gradient-to-br from-pfm-primary/30 via-pfm-primary/10 to-transparent" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>

                    {/* Profile & Identity */}
                    <div className="relative flex flex-col items-center px-6 md:flex-row md:items-end md:gap-6 mt-2 md:mt-4">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="size-32 shrink-0 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-2xl dark:border-background-dark dark:bg-background-dark md:size-40 p-1 flex items-center justify-center -mt-16 md:-mt-20"
                        >
                            {store.logoUrl ? (
                                <img src={store.logoUrl} alt={store.name} className="h-full w-full object-contain rounded-xl" />
                            ) : (
                                <StoreIcon size={64} className="text-pfm-primary" />
                            )}
                        </motion.div>

                        <div className="mt-4 flex flex-1 flex-col items-center text-center md:items-start md:text-left md:pb-2 md:mt-0">
                            <div className="flex items-center gap-3">
                                <h2 className="text-2xl font-extrabold md:text-3xl tracking-tight text-pfm-text dark:text-pfm-text-dark">
                                    {store.name}
                                </h2>
                                {store.verification.isVerified && (
                                    <CheckCircle2 className="text-blue-500 fill-blue-500/10" size={24} />
                                )}
                            </div>

                            <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm font-bold text-pfm-primary md:justify-start">
                                <span className="flex items-center gap-1.5 bg-pfm-primary/10 px-3 py-1 rounded-full text-[11px] uppercase tracking-wider">
                                    <Zap size={14} fill="currentColor" />
                                    {t('store.official', 'Official Store')}
                                </span>
                                <span className="flex items-center gap-1.5 bg-pfm-primary/10 px-3 py-1 rounded-full text-[11px] uppercase tracking-wider">
                                    <Shield size={14} />
                                    {store.metrics.rating > 4.5 ? '98 Trust Score' : 'Top Rated'}
                                </span>
                                <span className="flex items-center gap-1.5 text-pfm-text-muted">
                                    <Calendar size={14} />
                                    {t('store.joined', 'Joined')} {new Date(store.metrics.joinedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 flex gap-3 md:mt-0 md:pb-4">
                            <Button
                                config={{
                                    variant: "solid",
                                    color: "primary",
                                    className: "flex items-center gap-2 rounded-xl h-12 px-8 font-bold text-white shadow-lg shadow-pfm-primary/25 hover:shadow-pfm-primary/40 transition-all",
                                    children: (
                                        <>
                                            <Users size={18} />
                                            {t('store.follow', 'Follow')}
                                        </>
                                    )
                                }}
                            />
                            <Button
                                config={{
                                    variant: "light",
                                    className: "flex items-center gap-2 rounded-xl h-12 px-8 font-bold text-pfm-primary bg-pfm-primary/10 hover:bg-pfm-primary/15 transition-all",
                                    children: (
                                        <>
                                            <Mail size={18} />
                                            {t('store.message', 'Message')}
                                        </>
                                    )
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="mt-12 grid grid-cols-1 gap-8 px-4 md:grid-cols-12 md:px-0">
                    {/* Sidebar */}
                    <div className="space-y-6 md:col-span-4">
                        <section className="rounded-[2rem] border border-pfm-border/10 bg-white dark:bg-pfm-card/20 p-8 shadow-sm">
                            <h3 className="text-xl font-bold tracking-tight">{t('store.about_title', 'About Store')}</h3>
                            <p className="mt-4 text-sm font-medium leading-relaxed text-pfm-text-muted">
                                {store.description || "Leading provider of high-quality electronics. We specialize in bringing the latest tech innovations directly to your doorstep with unmatched customer service."}
                            </p>

                            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-pfm-border/20 pt-8">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-pfm-text dark:text-pfm-text-dark">{store.metrics.rating.toFixed(1)}</p>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-pfm-text-muted mt-1">{t('store.rating', 'Rating')}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-pfm-text dark:text-pfm-text-dark">12.5k</p>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-pfm-text-muted mt-1">{t('store.reviews', 'Reviews')}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-pfm-text dark:text-pfm-text-dark">{(store.metrics.followerCount / 1000).toFixed(1)}k</p>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-pfm-text-muted mt-1">{t('store.followers', 'Followers')}</p>
                                </div>
                            </div>
                        </section>

                        <section className="rounded-[2rem] border border-pfm-border/10 bg-white dark:bg-pfm-card/20 p-8 shadow-sm">
                            <h3 className="text-xl font-bold tracking-tight">{t('store.features_title', 'Store Features')}</h3>
                            <div className="mt-6 space-y-6">
                                {store.features.map((feature, i) => {
                                    const iconKey = feature.icon.replace(/-([a-z])/g, (g) => g[1].toUpperCase()).replace(/_([a-z])/g, (g) => g[1].toUpperCase());
                                    const IconComponent = ICON_MAP[iconKey] || ICON_MAP[feature.icon] || ICON_MAP[feature.key] || HelpCircle;
                                    return (
                                        <div key={i} className="flex items-start gap-4 group">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-pfm-primary/10 text-pfm-primary group-hover:bg-pfm-primary group-hover:text-white transition-all duration-300">
                                                <IconComponent size={20} />
                                            </div>
                                            <div>
                                                <p className="font-extrabold text-sm text-pfm-text dark:text-pfm-text-dark">{feature.label}</p>
                                                <p className="text-xs font-bold text-pfm-text-muted mt-0.5">{feature.details}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                                {!store.features.length && (
                                    <>
                                        <div className="flex items-start gap-4">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-pfm-primary/10 text-pfm-primary">
                                                <Truck size={20} />
                                            </div>
                                            <div>
                                                <p className="font-extrabold text-sm">{t('store.fast_shipping', 'Fast Shipping Worldwide')}</p>
                                                <p className="text-xs font-bold text-pfm-text-muted mt-0.5">{t('store.shipping_desc', 'Dispatch within 24 hours')}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-pfm-primary/10 text-pfm-primary">
                                                <HelpCircle size={20} />
                                            </div>
                                            <div>
                                                <p className="font-extrabold text-sm">{t('store.support', '24/7 Customer Support')}</p>
                                                <p className="text-xs font-bold text-pfm-text-muted mt-0.5">{store.contact.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-pfm-primary/10 text-pfm-primary">
                                                <MapPin size={20} />
                                            </div>
                                            <div>
                                                <p className="font-extrabold text-sm">{t('store.location', 'Location')}</p>
                                                <p className="text-xs font-bold text-pfm-text-muted mt-0.5">{store.contact.baseCountry}</p>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </section>
                    </div>

                    {/* Main Content Area */}
                    <div className="md:col-span-8">
                        <div className="mb-8 flex items-center justify-between">
                            <h3 className="text-2xl font-bold tracking-tight text-pfm-text dark:text-pfm-text-dark">
                                {t('store.top_selling', 'Top Selling Products')}
                            </h3>
                            <Link to={`/products?storeId=${storeId}`} className="group flex items-center gap-1.5 text-sm font-bold text-pfm-primary">
                                {t('common.view_all', 'View All')}
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        <AnimatePresence mode="wait">
                            {loadingProducts ? (
                                <motion.div
                                    key="loading"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                                >
                                    {[...Array(6)].map((_, i) => (
                                        <div key={i} className="space-y-4">
                                            <Skeleton className="rounded-[2rem] aspect-square" />
                                            <div className="space-y-2 px-2">
                                                <Skeleton className="h-4 w-1/3 rounded-lg" />
                                                <Skeleton className="h-6 w-3/4 rounded-lg" />
                                                <Skeleton className="h-4 w-1/2 rounded-lg" />
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            ) : products.length > 0 ? (
                                <motion.div
                                    key="products"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
                                >
                                    {products.map((p) => (
                                        <ProductCard
                                            key={p.id}
                                            id={p.id}
                                            title={p.name}
                                            category={p.categoryName}
                                            price={`${p.currency === 'USD' ? '$' : p.currency} ${p.cost.toFixed(2)}`}
                                            image={p.imgs?.[0]?.url || 'https://via.placeholder.com/400'}
                                            rating={p.rating ?? undefined}
                                            product={p}
                                        />
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="empty"
                                    className="flex flex-col items-center justify-center py-20 px-4 text-center bg-pfm-primary/5 rounded-[3rem] border-2 border-dashed border-pfm-primary/20"
                                >
                                    <div className="size-20 bg-pfm-primary/10 rounded-full flex items-center justify-center text-pfm-primary mb-6">
                                        <Zap size={32} />
                                    </div>
                                    <h4 className="text-xl font-bold mb-2">{t('store.empty_state', 'No Products Found')}</h4>
                                    <p className="text-pfm-text-muted font-bold max-w-xs">{t('store.empty_state_desc', "This store hasn't listed any products yet. Check back later!")}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </main>


        </div>
    );
};
