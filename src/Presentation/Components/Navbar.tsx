import { useNavigate, useLocation } from "react-router-dom";
import { ShoppingBag, User, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { useAuth } from "../Context/AuthContext";
import { Button } from "./Common/Button";
import { Logo } from "./Common/Logo";
import { useCart } from "../Context/CartContext";

import { Input } from "./Common/Input";

export const Navbar = () => {
    const { t } = useTranslation();
    const { isAuthenticated, user, logout } = useAuth();
    const { totalItems, toggleCart } = useCart();
    const navigate = useNavigate();
    const location = useLocation();

    const hiddenRoutes = ['/signin', '/signup', '/register', '/forgot-password'];
    if (hiddenRoutes.includes(location.pathname)) {
        return null;
    }

    return (
        <header className="flex items-center justify-between whitespace-nowrap border-b border-pfm-primary/10 bg-pfm-bg dark:bg-pfm-bg-dark px-6 md:px-20 py-4 sticky top-0 z-50 transition-colors duration-300">
            <div className="flex items-center gap-4 text-pfm-primary">
                <Logo />
            </div>

            <div className="flex flex-1 justify-end gap-4 md:gap-8 items-center">
                <div className="hidden md:flex min-w-40 max-w-64">
                    <Input
                        config={{
                            placeholder: t("nav.search_placeholder"),
                            variant: "flat",
                            radius: "lg",
                            size: "md",
                            startContent: <Search size={20} className="text-pfm-primary" />,
                            classNames: {
                                inputWrapper: "bg-pfm-primary/5 border-none h-10 data-[hover=true]:bg-pfm-primary/5 group-data-[focus=true]:bg-pfm-primary/5 data-[hover=true]:border-none focus-within:border-none",
                                input: "text-pfm-text dark:text-pfm-text-dark-inverse placeholder:text-pfm-primary/60 text-sm",
                            }
                        }}
                    />
                </div>

                <div className="flex gap-2 items-center">
                    <ThemeToggle />
                    <LanguageToggle />

                    <Button
                        config={{
                            isIconOnly: true,
                            variant: "flat",
                            color: "primary",
                            className: "h-10 w-10 min-w-10 p-0 transition-all",
                            title: t("nav.cart"),
                            onClick: () => toggleCart(true),
                            children: <ShoppingBag size={20} className="text-pfm-primary" />,
                            badge: {
                                content: totalItems.toString(),
                                color: "primary",
                                size: "sm"
                            }
                        }}
                    />

                    {isAuthenticated ? (
                        <Button
                            config={{
                                mode: "dropdown",
                                variant: "flat",
                                color: "primary",
                                className: "h-10 px-4 min-w-10 transition-all font-medium",
                                title: t("nav.profile"),
                                children: (
                                    <div className="flex items-center gap-2">
                                        <User size={18} className="text-pfm-primary" />
                                        <span className="hidden sm:inline text-pfm-primary">{user?.name}</span>
                                    </div>
                                ),
                                dropdownItems: [
                                    { key: "profile", label: t("nav.profile") },
                                    { key: "logout", label: <span className="text-danger font-semibold">{t("auth.logout")}</span> }
                                ],
                                onDropdownAction: (key: string | number) => {
                                    if (key === "logout") logout();
                                    if (key === "profile") navigate('/profile');
                                }
                            }}
                        />
                    ) : (
                        <Button
                            config={{
                                variant: "solid",
                                className: "bg-pfm-primary text-white font-bold rounded-xl px-6 h-10 shadow-lg shadow-pfm-primary/20 transition-all hover:bg-pfm-primary-hover hover:shadow-xl hover:-translate-y-0.5 ml-2",
                                onClick: () => navigate('/signin', { state: { from: location } }),
                                children: t("nav.sign_in")
                            }}
                        />
                    )}
                </div>
            </div>
        </header>
    );
};
