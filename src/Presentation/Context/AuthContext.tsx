import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { User } from "../../Domain/Entities/user";
import type { Token } from "../../Domain/Entities/generics";
import { authService } from "../../Infrastructure/Services/Auth.service";

interface AuthContextProps {
    isAuthenticated: boolean;
    user: User | null;
    loading: boolean;
    login: (formData: FormData) => Promise<void>;
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
                try {
                    const token: Token = JSON.parse(storedToken);
                    const currentUser = await authService.getCurrentUser(token);
                    setUser(currentUser);
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error("Failed to initialize auth:", error);
                    localStorage.removeItem("authToken");
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
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    };

    const logout = async () => {
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
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout }}>
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
