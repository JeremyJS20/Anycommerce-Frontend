import axios from "axios";
import type { AxiosInstance, AxiosResponse } from "axios";
import type {
    DataResponseType,
    DataWithAdditionalResponseType,
    errorResponseType,
} from "../../Domain/Entities/generics";

class HttpClient {
    private axiosInstance: AxiosInstance;
    private apiKey = import.meta.env.VITE_REST_API_KEY;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: import.meta.env.VITE_REST_API_URL,
        });
    }

    public getApiKey() {
        return this.apiKey;
    }

    public getStoredToken() {
        const token = localStorage.getItem("authToken");
        return token ? JSON.parse(token) : null;
    }

    private handleError(e: unknown): never {
        const err = e as { response?: { status?: number; data?: { error?: Record<string, unknown> } }; message?: string };
        const rawError = err.response?.data?.error;

        const error: errorResponseType = {
            success: false,
            statusCode: err.response?.status || 500,
            error: (rawError && typeof rawError === 'object' && 'errorId' in rawError)
                ? (rawError as unknown as errorResponseType['error'])
                : {
                    errorId: 500,
                    description: err.message || "Unknown error",
                    details: (err.response?.data as Record<string, unknown>) || null
                },
        };
        throw error;
    }

    async get<T>(
        route: string,
        headers?: Record<string, string>
    ): Promise<DataResponseType<T>> {
        try {
            const result: AxiosResponse = await this.axiosInstance.get(route, {
                headers: headers,
            });

            return {
                success: true,
                statusCode: result.status,
                data: result.data.data !== undefined ? result.data.data : result.data,
            };
        } catch (e) {
            throw this.handleError(e);
        }
    }

    async getWithAdditional<T, T2>(
        route: string,
        headers?: Record<string, string>
    ): Promise<DataWithAdditionalResponseType<T, T2>> {
        try {
            const result: AxiosResponse = await this.axiosInstance.get(route, {
                headers: headers,
            });

            return {
                success: true,
                statusCode: result.status,
                data: result.data.data !== undefined ? result.data.data : result.data,
                additionalData: result.data.additionalData,
            };
        } catch (e) {
            throw this.handleError(e);
        }
    }

    async post<T>(
        route: string,
        data: unknown,
        headers?: Record<string, string>
    ): Promise<DataResponseType<T>> {
        try {
            const result: AxiosResponse = await this.axiosInstance.post(
                route,
                data,
                { headers: headers }
            );

            return {
                success: true,
                statusCode: result.status,
                data: result.data.data !== undefined ? result.data.data : result.data,
            };
        } catch (e) {
            throw this.handleError(e);
        }
    }

    async put<T>(
        route: string,
        data: unknown,
        headers?: Record<string, string>
    ): Promise<DataResponseType<T>> {
        try {
            const result: AxiosResponse = await this.axiosInstance.put(
                route,
                data,
                { headers: headers }
            );

            return {
                success: true,
                statusCode: result.status,
                data: result.data.data !== undefined ? result.data.data : result.data,
            };
        } catch (e) {
            throw this.handleError(e);
        }
    }

    async delete<T>(
        route: string,
        headers?: Record<string, string>
    ): Promise<DataResponseType<T>> {
        try {
            const result: AxiosResponse = await this.axiosInstance.delete(route, {
                headers: headers,
            });

            return {
                success: true,
                statusCode: result.status,
                data: result.data.data !== undefined ? result.data.data : result.data,
            };
        } catch (e) {
            throw this.handleError(e);
        }
    }
}

export const HttpClientInstance = new HttpClient();
