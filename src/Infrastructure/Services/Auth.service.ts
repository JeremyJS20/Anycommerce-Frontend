import type { Token } from "../../Domain/Entities/generics";
import type { SignUpModel, User } from "../../Domain/Entities/user";
import { HttpClientInstance } from "../Http/Http";

interface AuthServiceHttpMethods {
    signUp: (data: SignUpModel) => Promise<string>;
    signIn: (formData: FormData) => Promise<Token>;
    getCurrentUser: (token: Token) => Promise<User>;
    refreshToken: (token: Token) => Promise<Token>;
    signOut: (token?: Token) => Promise<string>;
}

class AuthService implements AuthServiceHttpMethods {
    async signUp(data: SignUpModel): Promise<string> {
        const response = await HttpClientInstance.post<string>(
            "/auth/sign-up",
            data,
            {
                "x-api-key": HttpClientInstance.getApiKey(),
            }
        );
        return response.data;
    }

    async signIn(formData: FormData): Promise<Token> {
        const response = await HttpClientInstance.post<Token>(
            "/auth/sign-in",
            formData,
            {
                "x-api-key": HttpClientInstance.getApiKey(),
            }
        );
        return response.data;
    }

    async getCurrentUser(token: Token): Promise<User> {
        const response = await HttpClientInstance.get<User>(
            "/auth/current-user",
            {
                "Authorization": `${token.tokenType} ${token.accessToken}`,
            }
        );
        return response.data;
    }

    async refreshToken(token: Token): Promise<Token> {
        const response = await HttpClientInstance.put<Token>(
            `/auth/refresh-token?refreshToken=${token.refreshToken}`,
            {},
            {
                "x-api-key": HttpClientInstance.getApiKey(),
            }
        );
        return response.data;
    }

    async signOut(token: Token = HttpClientInstance.getStoredToken()): Promise<string> {
        const response = await HttpClientInstance.post<string>(
            "/auth/sign-out",
            {},
            {
                "Authorization": `${token.tokenType} ${token.accessToken}`,
            }
        );
        return response.data;
    }
}

export const authService = new AuthService();
