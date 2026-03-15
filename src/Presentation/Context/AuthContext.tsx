import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { User } from "../../Domain/Entities/user";
import type { Token } from "../../Domain/Entities/generics";
import { authService } from "../../Infrastructure/Services/Auth.service";
import { toast } from "../Utils/ToastService";

interface AuthContextProps {
    isAuthenticated: boolean;
    user: User | null;
    loading: boolean;
    login: (formData: FormData) => Promise<void>;
    signUp: (data: any) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const initializeAuth = async () => {
            const storedToken = localStorage.getItem("authToken");
            if (storedToken) {
                const token: Token = JSON.parse(storedToken);
                try {
                    const currentUser = await authService.getCurrentUser(token);
                    setUser(currentUser);
                    setIsAuthenticated(true);
                } catch (error: any) {
                    console.error("Auth initialization check failed:", error);

                    // If unauthorized, try to refresh
                    if (error.statusCode === 401) {
                        try {
                            console.log("Token expired, attempting refresh...");
                            const newToken = await authService.refreshToken(token);
                            localStorage.setItem("authToken", JSON.stringify(newToken));

                            // Retry getting user with new token
                            const refreshedUser = await authService.getCurrentUser(newToken);
                            setUser(refreshedUser);
                            setIsAuthenticated(true);
                            console.log("Session refreshed successfully");
                        } catch (refreshError) {
                            console.error("Token refresh failed:", refreshError);
                            localStorage.removeItem("authToken");
                        }
                    } else {
                        // For other errors, we just clear and stay logged out
                        localStorage.removeItem("authToken");
                    }
                }
            }
            setLoading(false);
        };

        initializeAuth();
    }, []);

    const login = async (formData: FormData) => {
        try {
            const token = await authService.signIn(formData);
            localStorage.setItem("authToken", JSON.stringify(token));
            const currentUser = await authService.getCurrentUser(token);
            setUser(currentUser);
            setIsAuthenticated(true);
            toast.success("toast.login_success_title", {
                descriptionKey: "toast.login_success",
                params: { name: currentUser.name }
            });
        } catch (error: any) {
            console.error("Login failed:", error);
            toast.handleBackendError(error, "toast.login_error_title");
            throw error;
        }
    };

    const logout = async () => {
        setLoading(true);
        const storedToken = localStorage.getItem("authToken");
        if (storedToken) {
            try {
                const token: Token = JSON.parse(storedToken);
                await authService.signOut(token);
            } catch (error) {
                console.error("Sign out failed:", error);
            }
        }
        localStorage.removeItem("authToken");
        setUser(null);
        setIsAuthenticated(false);
        setLoading(false);
        toast.info("toast.logout_title", { descriptionKey: "toast.logout_success" });
    };

    const signUp = async (data: any) => {
        try {
            await authService.signUp(data);
            toast.success("auth.sign_up_success");
        } catch (error: any) {
            console.error("Sign up failed:", error);
            toast.handleBackendError(error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, loading, login, signUp, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
