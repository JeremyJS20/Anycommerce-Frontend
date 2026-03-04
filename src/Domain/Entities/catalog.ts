export type Category = {
    id: string;
    name: string;
    description: string;
    subcategories: string[];
    image?: string; // Optional as it might not come from backend initially
};
