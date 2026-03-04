import type { AttributeType, Product } from "../../Domain/Entities/product";

export type commonType = {
    key: string;
    text: string;
    value: string | number | boolean | null;
};

export type cartProducts = {
    product: Product;
    cartInfo: {
        amount: number;
        variants: AttributeType[] | null;
    };
};
