import type {
    Message,
    Token,
} from "../../Domain/Entities/generics";
import type { Address, PaymentMethodCard } from "../../Domain/Entities/user";

import type { cartProducts } from "../../Presentation/Utils/types.utils";
import { HttpClientInstance } from "../Http/Http";

interface UserServiceHttpMethods {
    getCart: (token?: Token) => Promise<cartProducts[]>;
    createCart: (data: cartProducts[], token?: Token) => Promise<Message>;
    updateCart: (data: cartProducts[], token?: Token) => Promise<Message>;
    removeCart: (token?: Token) => Promise<Message>;
    getAddresses: (token?: Token) => Promise<Address[]>;
    addAddress: (address: Address, token?: Token) => Promise<Message>;
    getPaymentMethods: (token?: Token) => Promise<PaymentMethodCard[]>;
}

class UserService implements UserServiceHttpMethods {
    private prefix = "/user";

    async getCart(token: Token = HttpClientInstance.getStoredToken()): Promise<cartProducts[]> {
        const response = await HttpClientInstance.get<cartProducts[]>(
            `${this.prefix}/cart`,
            {
                Authorization: `${token.tokenType} ${token.accessToken}`,
            }
        );
        return response.data;
    }

    async createCart(
        data: cartProducts[],
        token: Token = HttpClientInstance.getStoredToken()
    ): Promise<Message> {
        const response = await HttpClientInstance.post<Message>(
            `${this.prefix}/cart/create`,
            data,
            {
                Authorization: `${token.tokenType} ${token.accessToken}`,
            }
        );
        return response.data;
    }

    async updateCart(
        data: cartProducts[],
        token: Token = HttpClientInstance.getStoredToken()
    ): Promise<Message> {
        const response = await HttpClientInstance.put<Message>(
            `${this.prefix}/cart/update`,
            data,
            {
                Authorization: `${token.tokenType} ${token.accessToken}`,
            }
        );
        return response.data;
    }

    async removeCart(token: Token = HttpClientInstance.getStoredToken()): Promise<Message> {
        const response = await HttpClientInstance.delete<Message>(
            `${this.prefix}/cart/remove`,
            {
                Authorization: `${token.tokenType} ${token.accessToken}`,
            }
        );
        return response.data;
    }

    async getAddresses(token: Token = HttpClientInstance.getStoredToken()): Promise<Address[]> {
        const response = await HttpClientInstance.get<Address[]>(
            `${this.prefix}/addresses`,
            {
                Authorization: `${token.tokenType} ${token.accessToken}`,
            }
        );
        return response.data;
    }

    async addAddress(
        address: Address,
        token: Token = HttpClientInstance.getStoredToken()
    ): Promise<Message> {
        const response = await HttpClientInstance.post<Message>(
            `${this.prefix}/addresses/add`,
            address,
            {
                Authorization: `${token.tokenType} ${token.accessToken}`,
            }
        );
        return response.data;
    }

    async getPaymentMethods(token: Token = HttpClientInstance.getStoredToken()): Promise<PaymentMethodCard[]> {
        const response = await HttpClientInstance.get<PaymentMethodCard[]>(
            `stripe${this.prefix}/payment-method`,
            {
                Authorization: `${token.tokenType} ${token.accessToken}`,
            }
        );
        return response.data;
    }
}

export const userService = new UserService();
