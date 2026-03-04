import type { commonType } from "../../Presentation/Utils/types.utils";
import type { MediaModel } from "./generics";
import type { UserResponse } from "./user";

export type Product = {
    id: string;
    storeId: string;
    name: string;
    cost: number;
    currency: string;
    stock: number;
    category: string;
    subcategory: string;
    rating: number | null;
    imgs: MediaModel[] | null;
    dates: {
        creation: string;
        restock: string;
    };
    details: Details;
    variants: Variants | null;
    reviews: Review[] | null;
};

export type Variants = {
    colors: AttributeType[];
    size: AttributeType[];
    [key: string]: AttributeType[];
};

export type Details = {
    description: string;
    characteristics: commonType[] | null;
};

export type Review = {
    id: string;
    title: string;
    opinion: string;
    rating: number;
    date: string;
    customer: UserResponse;
    media: MediaModel[] | null;
};

export type AttributeType = {
    key: string;
    value: unknown;
    price: number | null;
    default: boolean | null;
    available: boolean;
};

export type productQueryParams = {
    search: string | null;
    priceMin: number | null;
    priceMax: number | null;
    rating: string | null;
    category: string | null;
    subcategory: string | null;
    sort: string | null;
    index: number | null;
};

export type ProductAdditionalData = {
    totalReviews: number;
};

export type productQueryParamsType =
    | "search"
    | "priceMin"
    | "priceMax"
    | "rating"
    | "category"
    | "subcategory"
    | "sort"
    | "index";
