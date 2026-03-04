import { useParams } from 'react-router-dom';

export const ProductDetails = () => {
    const { productId } = useParams();

    return (
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
            <h1 className="text-4xl font-black text-pfm-text dark:text-pfm-text-dark">
                Product Details {productId ? `- ID: ${productId}` : ''}
            </h1>
            <p className="mt-4 text-pfm-text-muted">
                This is a placeholder for the product details page.
            </p>
        </div>
    );
};
