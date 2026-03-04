import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LogoConfig {
    size?: "sm" | "md" | "lg";
    showText?: boolean;
    className?: string;
}

interface LogoProps {
    config?: LogoConfig;
}

export const Logo = ({ config }: LogoProps) => {
    const navigate = useNavigate();

    const sizeMap = {
        sm: { icon: 16, text: "text-lg", container: "w-7 h-7" },
        md: { icon: 18, text: "text-xl", container: "w-8 h-8" },
        lg: { icon: 24, text: "text-3xl", container: "w-12 h-12" }
    };

    const currentSize = config?.size || "md";
    const { icon, text, container } = sizeMap[currentSize];

    return (
        <div
            className={`flex items-center gap-3 cursor-pointer select-none ${config?.className || ""}`}
            onClick={() => navigate("/")}
        >
            <div className={`${container} flex items-center justify-center bg-pfm-primary text-white rounded-lg shadow-lg shadow-pfm-primary/20`}>
                <ShoppingBag size={icon} />
            </div>
            {(config?.showText !== false) && (
                <p className={`text-pfm-text dark:text-pfm-text-dark-inverse font-bold leading-tight tracking-tight ${text}`}>
                    AnyCommerce
                </p>
            )}
        </div>
    );
};
