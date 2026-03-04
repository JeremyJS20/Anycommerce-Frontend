import { HttpClientInstance } from "../Http/Http";
import type { Product, productQueryParams, ProductAdditionalData } from "../../Domain/Entities/product";
import type { Pagination } from "../../Domain/Entities/generics";

interface ProductServiceMethods {
    getProducts: (params?: productQueryParams) => Promise<{ data: Product[], additionalData: Pagination }>;
    getProductById: (id: string) => Promise<{ data: Product, additionalData: ProductAdditionalData }>;
}

class ProductService implements ProductServiceMethods {
    async getProducts(params?: productQueryParams): Promise<{ data: Product[], additionalData: Pagination }> {
        const queryParams = new URLSearchParams();
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    queryParams.append(key, value.toString());
                }
            });
        }

        const response = await HttpClientInstance.getWithAdditional<Product[], Pagination>(
            `/products/?${queryParams.toString()}`,
            {
                "x-api-key": HttpClientInstance.getApiKey(),
            }
        );
        return {
            data: response.data,
            additionalData: response.additionalData
        };
    }

    async getProductById(id: string): Promise<{ data: Product, additionalData: ProductAdditionalData }> {
        const response = await HttpClientInstance.getWithAdditional<Product, ProductAdditionalData>(
            `/products/${id}`,
            {
                "x-api-key": HttpClientInstance.getApiKey(),
            }
        );
        return {
            data: response.data,
            additionalData: response.additionalData
        };
    }
}

export const productService = new ProductService();
