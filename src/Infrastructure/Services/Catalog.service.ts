import { HttpClientInstance } from "../Http/Http";
import type { Category } from "../../Domain/Entities/catalog";

interface CatalogServiceMethods {
    getCategories: () => Promise<Category[]>;
}

class CatalogService implements CatalogServiceMethods {
    async getCategories(): Promise<Category[]> {
        const response = await HttpClientInstance.get<Category[]>(
            "/catalogs/categories",
            {
                "x-api-key": HttpClientInstance.getApiKey(),
            }
        );
        return response.data;
    }
}

export const catalogService = new CatalogService();
