import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface CategoryCardProps {
    id: string;
    image: string;
    title: string;
    description: string;
    index: number;
}

export const CategoryCard = ({ id, image, title, description, index }: CategoryCardProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/products?category=${id}`);
    };

    return (
        <motion.div
            className="group cursor-pointer transition-all duration-300 hover:-translate-y-2"
            onClick={handleClick}
        >
            <div className="mb-4 aspect-square overflow-hidden rounded-2xl bg-pfm-primary/5 shadow-sm group-hover:shadow-xl group-hover:shadow-pfm-primary/10">
                <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>
            <h3 className="text-xl font-bold text-pfm-text dark:text-pfm-text-dark group-hover:text-pfm-primary transition-colors">
                {title}
            </h3>
            <p className="mt-2 text-sm text-pfm-text-muted line-clamp-2">
                {description}
            </p>
        </motion.div>
    );
};
