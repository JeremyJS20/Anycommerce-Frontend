import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Globe, Wallet, Clock } from 'lucide-react';
import { Button } from '@Presentation/Components/Common/Button';
import { CategoryCard } from '@Presentation/Components/Common/CategoryCard';
import { ProductCard } from '@Presentation/Components/Common/ProductCard';
import { catalogService } from '@Infrastructure/Services/Catalog.service';
import { productService } from '@Infrastructure/Services/Product.service';
import type { Category } from '@Domain/Entities/catalog';
import type { Product } from '@Domain/Entities/product';
import categoriesData from '@Data/Constants/categories.json';

export const Home = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [categories, setCategories] = useState<Category[]>([]);
    const [newArrivals, setNewArrivals] = useState<Product[]>([]);
    const [bestSellers, setBestSellers] = useState<Product[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await catalogService.getCategories();
                // Map images from local json if backend doesn't provide them
                const mappedCategories = data.map(cat => {
                    const localMatch = categoriesData.find(lc => lc.name === cat.name);
                    return {
                        ...cat,
                        image: cat.image || localMatch?.image || ''
                    };
                });
                setCategories(mappedCategories);
            } catch (error) {
                console.error("Error fetching categories:", error);
                // Fallback to local data on error
                setCategories(categoriesData as Category[]);
            }
        };

        fetchCategories();

        const fetchProducts = async () => {
            try {
                // Fetch New Arrivals (dateDesc)
                const newArrivalsRes = await productService.getProducts({
                    search: null, priceMin: null, priceMax: null, rating: null, category: null, subcategory: null,
                    sort: 'dateDesc', index: 1, startDate: null, endDate: null
                });
                setNewArrivals(newArrivalsRes.data.slice(0, 4));

                // Fetch Best Sellers (using dateDesc as proxy for now, or just default)
                // In a real app, this might be a specific endpoint or sort
                const bestSellersRes = await productService.getProducts({
                    search: null, priceMin: null, priceMax: null, rating: null, category: null, subcategory: null,
                    sort: 'dateDesc', index: 1, startDate: null, endDate: null
                });
                setBestSellers(bestSellersRes.data.slice(0, 4));
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const handleViewAllNewArrivals = () => {
        const today = new Date();
        const lastMonth = new Date();
        lastMonth.setDate(today.getDate() - 30);

        const startDate = lastMonth.toISOString().split('T')[0];
        const endDate = today.toISOString().split('T')[0];

        navigate(`/products?sort=dateDesc&startDate=${startDate}&endDate=${endDate}`);
    };


    return (
        <div className="flex flex-col w-full overflow-x-hidden">
            {/* Hero Section */}
            <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12 lg:py-32 w-full flex flex-col items-center justify-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col gap-10 items-center"
                >
                    <div className="flex flex-col gap-6 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-block px-4 py-1.5 text-xs font-bold tracking-wider text-pfm-primary uppercase bg-pfm-primary/10 rounded-full"
                        >
                            {t("home.hero.badge")}
                        </motion.div>
                        <h1 className="text-5xl font-black leading-tight tracking-tight text-pfm-text dark:text-pfm-text-dark md:text-7xl lg:text-8xl lg:leading-[1.1] max-w-5xl">
                            {t("home.hero.title").split(t("home.hero.highlight")).map((part, i, arr) => (
                                <span key={i}>
                                    {part}
                                    {i < arr.length - 1 && <span className="text-pfm-primary">{t("home.hero.highlight")}</span>}
                                </span>
                            ))}
                        </h1>
                        <p className="max-w-2xl text-xl md:text-2xl text-pfm-text-muted leading-relaxed">
                            {t("home.hero.description")}
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-6 justify-center">
                        <Button
                            config={{
                                className: "h-16 px-12 text-xl font-bold rounded-2xl",
                                variant: "solid",
                                color: "primary",
                                children: (
                                    <div className="flex items-center gap-2">
                                        <span>{t("home.hero.cta_buy")}</span>
                                        <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                )
                            }}
                        />
                        <Button
                            config={{
                                className: "h-16 px-12 text-xl font-semibold border-2 border-pfm-primary/20 rounded-2xl",
                                variant: "bordered",
                                color: "primary",
                                children: t("home.hero.cta_sell")
                            }}
                        />
                    </div>
                </motion.div>
            </section>

            {/* Categories Section */}
            <section className="bg-pfm-card py-20 dark:bg-pfm-bg-dark/50">
                <div className="mx-auto max-w-7xl px-6 lg:px-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12 text-3xl font-bold tracking-tight text-pfm-text dark:text-pfm-text-dark"
                    >
                        {t("home.categories_data.title")}
                    </motion.h2>
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:gap-8">
                        {categories.map((cat, index) => (
                            <CategoryCard
                                key={cat.id}
                                id={cat.id}
                                index={index}
                                title={t(cat.name)}
                                description={t(cat.description)}
                                image={cat.image || ''}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* New Arrivals Section */}
            <section className="py-24 bg-pfm-bg dark:bg-pfm-bg-dark">
                <div className="mx-auto max-w-7xl px-6 lg:px-12">
                    <div className="flex items-center justify-between mb-12">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl font-bold tracking-tight text-pfm-text dark:text-pfm-text-dark"
                        >
                            {t("home.new_arrivals.title")}
                        </motion.h2>
                        <motion.button
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            onClick={handleViewAllNewArrivals}
                            className="text-pfm-primary font-semibold hover:underline flex items-center gap-1 bg-transparent border-none cursor-pointer p-0"
                        >
                            {t("home.new_arrivals.view_all")} <ArrowRight size={16} />
                        </motion.button>
                    </div>
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:gap-8">
                        {newArrivals.map((product, index) => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                index={index}
                                title={product.name}
                                price={`${product.currency === 'USD' ? '$' : product.currency} ${product.cost.toFixed(2)}`}
                                image={product.imgs?.[0]?.url || 'https://via.placeholder.com/400'}
                                isNew={true}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Flash Sale Section */}
            <section className="w-full bg-pfm-primary py-16 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48 animate-pulse" />
                <div className="mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
                    <div className="flex flex-col items-center justify-between gap-10 md:flex-row">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="flex flex-col gap-3 text-center md:text-left"
                        >
                            <h2 className="text-4xl md:text-5xl font-black tracking-tight">{t("home.flash_sale.title")}</h2>
                            <p className="text-xl text-white/80 max-w-xl">{t("home.flash_sale.description")}</p>
                        </motion.div>

                        <div className="flex flex-col items-center gap-8 md:items-end">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="flex flex-col items-center bg-white/10 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/20"
                            >
                                <div className="flex gap-2 items-baseline">
                                    <Clock size={20} className="text-white/70" />
                                    <span className="text-4xl font-black tracking-widest tabular-nums font-mono">12:45:00</span>
                                </div>
                                <span className="text-xs uppercase tracking-widest mt-1 font-bold opacity-70">{t("home.flash_sale.timer_label")}</span>
                            </motion.div>

                            <Button
                                config={{
                                    className: "h-14 px-12 text-lg bg-white text-pfm-primary hover:bg-white/90 font-black rounded-full shadow-2xl",
                                    children: t("home.flash_sale.cta")
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Best Sellers Section */}
            <section className="py-24 bg-pfm-card dark:bg-pfm-bg-dark/50">
                <div className="mx-auto max-w-7xl px-6 lg:px-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12 text-3xl font-bold tracking-tight text-pfm-text dark:text-pfm-text-dark"
                    >
                        {t("home.best_sellers.title")}
                    </motion.h2>
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:gap-8">
                        {bestSellers.map((product, index) => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                index={index}
                                title={product.name}
                                price={`${product.currency === 'USD' ? '$' : product.currency} ${product.cost.toFixed(2)}`}
                                image={product.imgs?.[0]?.url || 'https://via.placeholder.com/400'}
                                rating={product.rating || 0}
                                reviews={0}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Section */}
            <section className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
                <div className="mb-16 flex flex-col gap-4 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-black text-pfm-text dark:text-pfm-text-dark md:text-5xl"
                    >
                        {t("home.features.title")}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="max-w-2xl text-lg text-pfm-text-muted mx-auto"
                    >
                        {t("home.features.description")}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {[
                        { key: 'global', icon: Globe },
                        { key: 'protection', icon: ShieldCheck },
                        { key: 'economics', icon: Wallet }
                    ].map((feature, index) => (
                        <motion.div
                            key={feature.key}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group p-10 rounded-3xl border border-pfm-primary/10 bg-pfm-card transition-all hover:border-pfm-primary/30 hover:shadow-2xl hover:shadow-pfm-primary/5 dark:bg-pfm-bg-dark/80"
                        >
                            <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-pfm-primary/10 text-pfm-primary transition-all group-hover:bg-pfm-primary group-hover:text-white group-hover:scale-110 shadow-lg shadow-pfm-primary/10">
                                <feature.icon size={32} />
                            </div>
                            <h3 className="mb-4 text-2xl font-bold text-pfm-text dark:text-pfm-text-dark">{t(`home.features.${feature.key}.title`)}</h3>
                            <p className="text-pfm-text-muted leading-relaxed text-lg">
                                {t(`home.features.${feature.key}.desc`)}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};
