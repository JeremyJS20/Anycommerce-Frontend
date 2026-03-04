import { Link } from "@heroui/react";
import { ShoppingBag, Github, Twitter, Instagram } from "lucide-react";
import { useLocation } from "react-router-dom";

export const Footer = () => {
    const location = useLocation();

    const hiddenRoutes = ['/signin', '/signup', '/register', '/forgot-password'];
    if (hiddenRoutes.includes(location.pathname)) {
        return null;
    }

    return (
        <footer className="w-full bg-pfm-bg border-t border-pfm-border py-12 px-6 mt-auto">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1 md:col-span-1">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 bg-pfm-primary rounded-lg flex items-center justify-center">
                            <ShoppingBag className="text-white" size={16} />
                        </div>
                        <p className="font-bold text-pfm-text text-lg">AnyCommerce</p>
                    </div>
                    <p className="text-pfm-text-muted text-sm leading-relaxed">
                        Leading the future of commerce with premium experiences and seamless integration.
                    </p>
                    <div className="flex gap-4 mt-6">
                        <Link href="#" className="text-pfm-text-muted hover:text-pfm-primary transition-all">
                            <Github size={18} />
                        </Link>
                        <Link href="#" className="text-pfm-text-muted hover:text-pfm-primary transition-all">
                            <Twitter size={18} />
                        </Link>
                        <Link href="#" className="text-pfm-text-muted hover:text-pfm-primary transition-all">
                            <Instagram size={18} />
                        </Link>
                    </div>
                </div>

                <div>
                    <h4 className="font-bold text-pfm-text mb-6">Shop</h4>
                    <ul className="space-y-4">
                        <li><Link href="#" className="text-pfm-text-muted text-sm hover:text-pfm-primary">All Products</Link></li>
                        <li><Link href="#" className="text-pfm-text-muted text-sm hover:text-pfm-primary">New Arrivals</Link></li>
                        <li><Link href="#" className="text-pfm-text-muted text-sm hover:text-pfm-primary">Featured</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-pfm-text mb-6">Support</h4>
                    <ul className="space-y-4">
                        <li><Link href="#" className="text-pfm-text-muted text-sm hover:text-pfm-primary">Shipping Policy</Link></li>
                        <li><Link href="#" className="text-pfm-text-muted text-sm hover:text-pfm-primary">Return & Exchange</Link></li>
                        <li><Link href="#" className="text-pfm-text-muted text-sm hover:text-pfm-primary">FAQ</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-pfm-text mb-6">Contact</h4>
                    <ul className="space-y-4">
                        <li className="text-pfm-text-muted text-sm">support@anycommerce.com</li>
                        <li className="text-pfm-text-muted text-sm">+1 (555) 000-0000</li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-pfm-border flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-pfm-text-muted text-xs">
                    © 2026 AnyCommerce Inc. All rights reserved.
                </p>
                <div className="flex gap-8">
                    <Link href="#" className="text-pfm-text-muted text-xs hover:text-pfm-primary">Privacy Policy</Link>
                    <Link href="#" className="text-pfm-text-muted text-xs hover:text-pfm-primary">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
};
