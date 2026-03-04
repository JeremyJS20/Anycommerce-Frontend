import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
    id: string;
    image: string;
    title: string;
    price: string;
    isNew?: boolean;
    rating?: number;
    reviews?: number;
    index: number;
}

export const ProductCard = ({ id, image, title, price, isNew, rating, reviews, index }: ProductCardProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/product/${id}`);
    };
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative cursor-pointer"
            onClick={handleClick}
        >
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-pfm-primary/5">
                {isNew && (
                    <div className="absolute top-3 left-3 z-10 rounded-full bg-pfm-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
                        New
                    </div>
                )}
                <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay with potential actions can be added here */}
                <div className="absolute inset-0 bg-pfm-primary/0 group-hover:bg-pfm-primary/5 transition-colors duration-300 pointer-events-none" />
            </div>

            <div className="mt-4 flex flex-col gap-1">
                {rating !== undefined && (
                    <div className="flex items-center gap-1 mb-1 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={12}
                                className={i < Math.floor(rating) ? "fill-current" : "text-pfm-primary/20"}
                            />
                        ))}
                        {reviews !== undefined && (
                            <span className="text-xs font-medium text-pfm-text-muted ml-1">({reviews})</span>
                        )}
                    </div>
                )}
                <h3 className="text-sm font-semibold text-pfm-text dark:text-pfm-text-dark group-hover:text-pfm-primary transition-colors line-clamp-1">{title}</h3>
                <p className="text-lg font-bold text-pfm-primary">{price}</p>
            </div>
        </motion.div>
    );
};
