import { HttpClientInstance } from "../Http/Http";
import type { Store } from "../../Domain/Entities/store";

interface StoreServiceMethods {
    getStoreById: (id: string) => Promise<{ data: Store }>;
}

class StoreService implements StoreServiceMethods {
    async getStoreById(id: string): Promise<{ data: Store }> {
        const response = await HttpClientInstance.get<Store>(
            `/stores/${id}`,
            {
                "x-api-key": HttpClientInstance.getApiKey(),
            }
        );
        return {
            data: response.data
        };
    }
}

export const storeService = new StoreService();
