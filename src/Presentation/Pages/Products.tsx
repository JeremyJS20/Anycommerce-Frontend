import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronRight,
    Star,
    Filter,
    ArrowUpDown,
    Loader2
} from 'lucide-react';
import { Button } from '@Presentation/Components/Common/Button';
import { ProductCard } from '@Presentation/Components/Common/ProductCard';
import { Pagination } from '@Presentation/Components/Common/Pagination';
import {
    Checkbox,
    Slider,
    RadioGroup,
    Radio,
    Skeleton,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem
} from "@heroui/react";
import { productService } from '@Infrastructure/Services/Product.service';
import { catalogService } from '@Infrastructure/Services/Catalog.service';
import type { Product } from '@Domain/Entities/product';
import type { Category } from '@Domain/Entities/catalog';
import { getCategoryTranslationKey } from '@Presentation/Utils/translationUtils';

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 5000;
const SKELETON_DELAY = 300; // Increased delay to further suppress tiny flashes

export const Products = () => {
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();

    // Derived values from URL - stable primitives
    const priceMinParam = Number(searchParams.get('priceMin')) || DEFAULT_MIN_PRICE;
    const priceMaxParam = Number(searchParams.get('priceMax')) || DEFAULT_MAX_PRICE;
    const ratingFilter = searchParams.get('rating') || '';
    const searchFilter = searchParams.get('search') || '';
    const categoryFilter = searchParams.get('categoryId') || searchParams.get('category') || '';
    const sortFilter = searchParams.get('sort') || 'newest';
    const startDateFilter = searchParams.get('startDate') || '';
    const endDateFilter = searchParams.get('endDate') || '';
    const hasPriceFilter = searchParams.has('priceMin') || searchParams.has('priceMax');
    const pageParam = Number(searchParams.get('index')) || 1;

    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(pageParam);
    const [showSkeletons, setShowSkeletons] = useState(false);

    // Initialize temp price range from URL only once or when strictly necessary
    const [tempPriceRange, setTempPriceRange] = useState<number[]>([priceMinParam, priceMaxParam]);

    // Sync state with URL params - only update if values actually changed
    useEffect(() => {
        if (currentPage !== pageParam) {
            setCurrentPage(pageParam);
        }
    }, [pageParam, currentPage]);

    useEffect(() => {
        if (tempPriceRange[0] !== priceMinParam || tempPriceRange[1] !== priceMaxParam) {
            setTempPriceRange([priceMinParam, priceMaxParam]);
        }
    }, [priceMinParam, priceMaxParam]);

    useEffect(() => {
        setTempPriceRange([
            Number(searchParams.get('priceMin')) || DEFAULT_MIN_PRICE,
            Number(searchParams.get('priceMax')) || DEFAULT_MAX_PRICE
        ]);
    }, [searchParams, DEFAULT_MIN_PRICE, DEFAULT_MAX_PRICE]);

    // Debounce price change
    useEffect(() => {
        const timer = setTimeout(() => {
            const [min, max] = tempPriceRange;
            if (min !== priceMinParam || max !== priceMaxParam) {
                const newParams = new URLSearchParams(searchParams);
                newParams.set('priceMin', min.toString());
                newParams.set('priceMax', max.toString());
                newParams.set('index', '1');
                setSearchParams(newParams);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [tempPriceRange, priceMinParam, priceMaxParam, searchParams, setSearchParams]);


    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const { data, additionalData } = await productService.getProducts({
                search: searchFilter || null,
                categoryId: categoryFilter || null,
                sort: sortFilter || null,
                priceMin: hasPriceFilter ? priceMinParam : null,
                priceMax: hasPriceFilter ? priceMaxParam : null,
                rating: ratingFilter || null,
                subcategory: null,
                index: currentPage,
                startDate: startDateFilter || null,
                endDate: endDateFilter || null
            });
            setProducts(data);
            if (additionalData) {
                setTotalPages(additionalData.totalPages || 1);
            }
        } catch (err) {
            console.error('Error fetching products:', err);
            setError('Failed to load products. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, [searchFilter, categoryFilter, sortFilter, priceMinParam, priceMaxParam, ratingFilter, startDateFilter, endDateFilter, hasPriceFilter, currentPage]);

    // Handle skeleton delay to prevent flicker on fast loads
    useEffect(() => {
        let timer: ReturnType<typeof setTimeout> | undefined;
        if (loading && products.length === 0) {
            timer = setTimeout(() => setShowSkeletons(true), SKELETON_DELAY);
        } else {
            setShowSkeletons(false);
        }
        return () => clearTimeout(timer);
    }, [loading, products.length]);

    const fetchCategories = useCallback(async () => {
        try {
            const data = await catalogService.getCategories();
            setCategories(data);
        } catch (err) {
            console.error('Error fetching categories:', err);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    // Search input removed as requested

    const handleCategoryClick = (categoryName: string) => {
        const params = new URLSearchParams(searchParams);
        if (categoryName === 'All Products') {
            params.delete('category');
        } else {
            params.set('category', categoryName);
        }
        params.set('index', '1'); // Reset to first page on filter change
        setSearchParams(params);
        setCurrentPage(1);
    };

    const handleSortChange = (key: string | number) => {
        const params = new URLSearchParams(searchParams);
        params.set('sort', key.toString());
        params.set('index', '1'); // Reset to first page on sort change
        setSearchParams(params);
        setCurrentPage(1);
    };

    const handlePriceChange = (value: number | number[]) => {
        setTempPriceRange(Array.isArray(value) ? value : [0, value]);
    };

    const handleRatingChange = (value: string) => {
        const newParams = new URLSearchParams(searchParams);
        if (value) newParams.set('rating', value);
        else newParams.delete('rating');
        newParams.set('index', '1'); // Reset to first page on rating change
        setSearchParams(newParams);
        setCurrentPage(1);
    };

    const clearAllFilters = () => {
        setSearchParams(new URLSearchParams());
        setCurrentPage(1); // Reset to first page on clear filters
    };

    return (
        <div className="min-h-screen bg-pfm-bg text-pfm-text transition-colors duration-300">
            <div className="mx-auto max-w-[1280px] px-6 py-10 md:px-20">
                {/* Header Section */}
                <div className="flex flex-col gap-6 mb-12">
                    <nav className="flex items-center gap-2 text-sm font-medium text-pfm-text-muted">
                        <Link to="/" className="hover:text-pfm-primary transition-colors">{t('products.header.breadcrumb_home', 'Home')}</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-pfm-primary">{t('products.header.breadcrumb_products', 'Products')}</span>
                    </nav>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-3xl font-extrabold tracking-tight text-pfm-text dark:text-pfm-text-dark">
                                {categoryFilter ? t(getCategoryTranslationKey(categories.find(c => c.id === categoryFilter)?.name || ''), categories.find(c => c.id === categoryFilter)?.name || 'Products') : t('home.categories_data.all_products', 'All Products')}
                            </h1>
                            <p className="text-pfm-primary font-medium text-lg italic">
                                {searchParams.get('startDate') && searchParams.get('endDate')
                                    ? t('products.header.available_date', {
                                        defaultValue: `Showing products available from ${searchParams.get('startDate')} to ${searchParams.get('endDate')}`,
                                        start: searchParams.get('startDate'),
                                        end: searchParams.get('endDate')
                                    })
                                    : t('products.header.description', 'Discover premium tech and lifestyle essentials.')}
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            {/* Search input removed as requested */}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-72 flex-shrink-0">
                        <div className="sticky top-24 bg-pfm-card dark:bg-pfm-card/10 backdrop-blur-md border border-pfm-border rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="font-bold text-lg flex items-center gap-2">
                                    <Filter className="w-4 h-4 text-pfm-primary" />
                                    {t('products.sidebar.filters', 'Filters')}
                                </h3>
                                <button
                                    onClick={clearAllFilters}
                                    className="text-xs font-semibold text-pfm-primary hover:underline"
                                >
                                    {t('products.sidebar.clear_all', 'Clear All')}
                                </button>
                            </div>

                            {/* Categories */}
                            <div className="mb-10">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-pfm-text-muted mb-4">{t('products.sidebar.category', 'Category')}</h4>
                                <div className="space-y-3 flex flex-col gap-2">
                                    <Checkbox
                                        isSelected={!categoryFilter}
                                        onChange={() => handleCategoryClick('All Products')}
                                        color="primary"
                                        classNames={{ label: "text-sm" }}
                                    >
                                        {t('categories.all_products', 'All Products')}
                                    </Checkbox>
                                    {categories.map((cat) => (
                                        <Checkbox
                                            key={cat.id}
                                            isSelected={categoryFilter === cat.id}
                                            onChange={() => handleCategoryClick(cat.id)}
                                            color="primary"
                                            classNames={{ label: "text-sm" }}
                                        >
                                            {t(getCategoryTranslationKey(cat.name), cat.name)}
                                        </Checkbox>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div className="mb-10">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-pfm-text-muted mb-4">{t('products.sidebar.price_range', 'Price Range')}</h4>
                                <Slider
                                    label="Range"
                                    step={50}
                                    minValue={DEFAULT_MIN_PRICE}
                                    maxValue={DEFAULT_MAX_PRICE}
                                    value={tempPriceRange}
                                    onChange={handlePriceChange}
                                    formatOptions={{ style: "currency", currency: "USD" }}
                                    className="max-w-md"
                                    color="primary"
                                />
                                <div className="flex justify-between mt-2 text-xs text-pfm-text-muted font-medium">
                                    <span>${tempPriceRange[0]}</span>
                                    <span>${tempPriceRange[1]}</span>
                                </div>
                            </div>

                            {/* Rating */}
                            <div className="mb-10">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-pfm-text-muted mb-4">{t('products.sidebar.rating', 'Rating')}</h4>
                                <RadioGroup
                                    color="primary"
                                    value={ratingFilter}
                                    onValueChange={handleRatingChange}
                                >
                                    <Radio value="5" classNames={{ label: "flex gap-1 items-center" }}>
                                        <div className="flex text-amber-400">
                                            {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                                        </div>
                                        <span className="text-xs text-pfm-text-muted">5 {t('products.sidebar.stars', 'stars')}</span>
                                    </Radio>
                                    <Radio value="4" classNames={{ label: "flex gap-1 items-center" }}>
                                        <div className="flex text-amber-400">
                                            {[...Array(4)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                                            <Star className="w-3.5 h-3.5 text-pfm-border" />
                                        </div>
                                        <span className="text-xs text-pfm-text-muted">{t('products.sidebar.and_up', '& up')}</span>
                                    </Radio>
                                    <Radio value="3" classNames={{ label: "flex gap-1 items-center" }}>
                                        <div className="flex text-amber-400">
                                            {[...Array(3)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                                            {[...Array(2)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-pfm-border" />)}
                                        </div>
                                        <span className="text-xs text-pfm-text-muted">{t('products.sidebar.and_up', '& up')}</span>
                                    </Radio>
                                </RadioGroup>
                            </div>
                        </div>
                    </aside>

                    {/* Products Content */}
                    <div className="flex-1">
                        {/* Sort Bar */}
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 bg-pfm-card dark:bg-pfm-card/10 backdrop-blur-md p-5 rounded-2xl shadow-sm border border-pfm-border">
                            <p className="text-sm font-medium text-pfm-text-muted">
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <Loader2 className="w-4 h-4 animate-spin text-pfm-primary" />
                                        {t('products.grid.updating_results', 'Updating results...')}
                                    </span>
                                ) : error ? (
                                    <span className="text-red-500 font-medium italic">{t('products.grid.error_fetch', 'Unable to retrieve products.')}</span>
                                ) : (
                                    <>
                                        {t('products.grid.showing', 'Showing')} <span className="text-pfm-text dark:text-pfm-text-dark font-bold">{products.length}</span> {t('products.grid.premium_products', 'premium products')}
                                    </>
                                )}
                            </p>
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-bold uppercase tracking-wider text-pfm-text-muted shrink-0">
                                    {t('products.grid.sort_by', 'Sort by:')}
                                </span>
                                <Dropdown
                                    classNames={{
                                        content: "bg-pfm-card border border-pfm-border min-w-[200px] shadow-xl rounded-xl p-1"
                                    }}
                                >
                                    <DropdownTrigger>
                                        <Button
                                            config={{
                                                variant: "flat",
                                                className: "bg-pfm-primary/10 text-pfm-primary font-bold text-xs uppercase tracking-widest h-9 px-4 rounded-xl border border-pfm-primary/20",
                                                children: (
                                                    <div className="flex items-center gap-2">
                                                        <ArrowUpDown className="w-3.5 h-3.5" />
                                                        {t(`products.sort.${sortFilter}`, sortFilter.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()))}
                                                    </div>
                                                )
                                            }}
                                        />
                                    </DropdownTrigger>
                                    <DropdownMenu
                                        aria-label="Sort options"
                                        onAction={handleSortChange}
                                        selectedKeys={new Set([sortFilter])}
                                        selectionMode="single"
                                        itemClasses={{
                                            base: [
                                                "flex",
                                                "w-full",
                                                "items-center",
                                                "gap-2",
                                                "px-3",
                                                "py-2",
                                                "rounded-lg",
                                                "transition-colors",
                                                "text-pfm-text",
                                                "dark:text-pfm-text-dark",
                                                "outline-none",
                                                "data-[hover=true]:!bg-pfm-primary/10",
                                                "data-[hover=true]:!text-pfm-primary",
                                                "data-[focus=true]:!bg-pfm-primary/10",
                                                "data-[focus=true]:!text-pfm-primary",
                                                "data-[pressed=true]:!bg-pfm-primary/20",
                                                "data-[selected=true]:!bg-pfm-primary/20",
                                                "data-[selected=true]:!text-pfm-primary",
                                                "data-[selected=true]:font-bold",
                                            ].join(" "),
                                        }}
                                    >
                                        <DropdownItem key="newest">{t('products.sort.newest', 'Newest')}</DropdownItem>
                                        <DropdownItem key="priceAsc">{t('products.sort.price_asc', 'Price: Low to High')}</DropdownItem>
                                        <DropdownItem key="priceDesc">{t('products.sort.price_desc', 'Price: High to Low')}</DropdownItem>
                                        <DropdownItem key="alphabeticallyAsc">{t('products.sort.alphabetical_asc', 'A-Z')}</DropdownItem>
                                        <DropdownItem key="alphabeticallyDesc">{t('products.sort.alphabetical_desc', 'Z-A')}</DropdownItem>
                                        <DropdownItem key="ratingDesc">{t('products.sort.rating_desc', 'Highest Rated')}</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        </div>

                        {/* Error State */}
                        {error && !loading && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="col-span-full py-24 flex flex-col items-center justify-center text-center bg-pfm-card dark:bg-pfm-card/5 border border-pfm-border rounded-[32px] shadow-sm backdrop-blur-sm"
                            >
                                <div className="bg-red-500/10 p-4 rounded-full mb-6 text-red-500">
                                    <Filter className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-pfm-text dark:text-pfm-text-dark mb-2">{t('products.grid.error_title', 'Something went wrong')}</h3>
                                <p className="text-pfm-text-muted max-w-md mb-8 leading-relaxed">
                                    {t('products.grid.error_message', error)}
                                </p>
                                <Button
                                    config={{
                                        className: "px-10 h-12 text-sm font-bold uppercase tracking-wider",
                                        color: "primary",
                                        variant: "shadow",
                                        onClick: fetchProducts,
                                        children: t('products.grid.retry', 'Try Again')
                                    }}
                                />
                            </motion.div>
                        )}

                        {/* Product Grid */}
                        {!error && (
                            <div className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 min-h-[600px] items-start transition-all duration-500 ease-in-out ${loading && products.length > 0 ? 'opacity-60 blur-[2px] pointer-events-none' : ''}`}>
                                <AnimatePresence mode="popLayout" initial={false}>
                                    {showSkeletons ? (
                                        [...Array(6)].map((_, i) => (
                                            <div key={`skeleton-${i}`} className="flex flex-col gap-4">
                                                <div className="aspect-square rounded-[32px] bg-pfm-card/10 overflow-hidden">
                                                    <Skeleton className="w-full h-full" />
                                                </div>
                                                <Skeleton className="h-6 w-3/4 rounded-lg" />
                                                <Skeleton className="h-4 w-1/2 rounded-lg" />
                                                <div className="flex justify-between items-center mt-2">
                                                    <Skeleton className="h-8 w-1/4 rounded-lg" />
                                                    <Skeleton className="h-10 w-10 rounded-full" />
                                                </div>
                                            </div>
                                        ))
                                    ) : products.length > 0 ? (
                                        products.map((product, index) => (
                                            <ProductCard
                                                key={product.id}
                                                id={product.id}
                                                index={index}
                                                title={product.name}
                                                category={product.subcategory || product.categoryName}
                                                price={`$${product.cost.toFixed(2)}`}
                                                image={product.imgs?.[0]?.url || '/placeholder-product.png'}
                                                rating={product.rating ?? undefined}
                                                product={product}
                                            />
                                        ))
                                    ) : !loading && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="col-span-full py-20 text-center bg-pfm-card/5 rounded-[32px] border border-pfm-border border-dashed"
                                        >
                                            <p className="text-pfm-text-muted text-lg">{t('products.empty.no_results', 'No products found matching your criteria.')}</p>
                                            <Button
                                                config={{
                                                    className: "mt-4",
                                                    color: "primary",
                                                    variant: "light",
                                                    onClick: clearAllFilters,
                                                    children: t('products.empty.view_all', 'View all products')
                                                }}
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}

                        {!error && !loading && totalPages > 1 && (
                            <Pagination
                                total={totalPages}
                                page={currentPage}
                                initialPage={1}
                                onChange={(page) => {
                                    const params = new URLSearchParams(searchParams);
                                    params.set('index', page.toString());
                                    setSearchParams(params);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="mt-12"
                            />
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};
