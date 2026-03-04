import { useSearchParams } from 'react-router-dom';

export const Products = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    return (
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
            <h1 className="text-4xl font-black text-pfm-text dark:text-pfm-text-dark">
                Products
                {category && ` - Category: ${category}`}
                {startDate && endDate && ` - Date Range: ${startDate} to ${endDate}`}
            </h1>
            <p className="mt-4 text-pfm-text-muted">
                This is a placeholder for the products listing page.
            </p>
        </div>
    );
};
