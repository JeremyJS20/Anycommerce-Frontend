import { motion } from 'framer-motion';
import { Star, StarHalf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../Context/CartContext';
import { Button } from './Button';
import type { Product } from '../../../Domain/Entities/product';

interface ProductCardProps {
    id: string;
    image: string;
    title: string;
    price: string;
    isNew?: boolean;
    rating?: number;
    reviews?: number;
    category?: string;
    product?: Product;
}

export const ProductCard = ({ id, image, title, price, isNew, rating, category, product }: ProductCardProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const handleClick = (e: React.MouseEvent) => {
        // Prevent navigation if clicking the cart button
        if ((e.target as HTMLElement).closest('button')) return;
        navigate(`/product/${id}`);
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (product) {
            const defaultVariants: any[] = [];
            if (product.variants) {
                Object.values(product.variants).forEach(options => {
                    if (Array.isArray(options)) {
                        const defaultOpt = options.find(opt => opt.default) || options[0];
                        if (defaultOpt) {
                            defaultVariants.push(defaultOpt);
                        }
                    }
                });
            }
            addToCart(product, 1, defaultVariants.length > 0 ? defaultVariants : null);
        }
    };

    return (
        <motion.div
            className="group relative cursor-pointer"
            onClick={handleClick}
        >
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-pfm-primary/5">
                {isNew && (
                    <div className="absolute top-3 left-3 z-10 rounded-full bg-pfm-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
                        {t("home.new_arrivals.badge")}
                    </div>
                )}
                <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-pfm-primary/0 group-hover:bg-pfm-primary/5 transition-colors duration-300 pointer-events-none" />
            </div >

            <div className="mt-4 flex flex-col gap-1 px-1">
                {category && (
                    <p className="text-[10px] uppercase tracking-wider font-bold text-pfm-primary/70 mb-0.5">
                        {category}
                    </p>
                )}
                <h3 className="text-sm font-bold text-pfm-text dark:text-pfm-text-dark group-hover:text-pfm-primary transition-colors line-clamp-1">{title}</h3>
                <div className="flex items-center justify-between mt-1">
                    <p className="text-lg font-bold text-pfm-primary">{price}</p>

                    <div className="flex items-center gap-3">
                        {rating !== undefined && (
                            <div className="flex items-center gap-1.5 text-amber-500 bg-amber-500/5 px-2 py-0.5 rounded-lg">
                                <div className="flex items-center gap-0.5">
                                    {[...Array(5)].map((_, i) => {
                                        const ratingValue = i + 1;
                                        if (rating >= ratingValue) {
                                            return <Star key={i} size={10} className="fill-current" />;
                                        } else if (rating >= ratingValue - 0.5) {
                                            return <StarHalf key={i} size={10} className="fill-current" />;
                                        } else {
                                            return <Star key={i} size={10} className="opacity-30" />;
                                        }
                                    })}
                                </div>
                                <span className="text-[10px] font-bold">{rating.toFixed(1)}</span>
                            </div>
                        )}
                        {product && (
                            <Button
                                config={{
                                    isIconOnly: true,
                                    size: "sm",
                                    color: "primary",
                                    variant: "flat",
                                    className: "bg-pfm-primary/10 text-pfm-primary hover:bg-pfm-primary hover:text-white transition-all rounded-lg h-8 w-8",
                                    onClick: handleAddToCart,
                                    children: <ShoppingCart size={14} />
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </motion.div >
    );
};
