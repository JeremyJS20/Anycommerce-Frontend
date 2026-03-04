import { HeroUIProvider } from '@heroui/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from '@Presentation/Components/Navbar'
import { Footer } from '@Presentation/Components/Footer'
import { ThemeProvider } from '@Presentation/Context/ThemeContext'
import { LanguageProvider } from '@Presentation/Context/LanguageContext'
import { AuthProvider, useAuth } from '@Presentation/Context/AuthContext'
import { Home } from '@Presentation/Pages/Home'
import { SignIn } from '@Presentation/Pages/Auth/SignIn'
import { Products } from '@Presentation/Pages/Products'
import { ProductDetails } from '@Presentation/Pages/ProductDetails'
import { motion } from 'framer-motion';
import { Logo } from '@Presentation/Components/Common/Logo';

const AppContent = () => {
    const { loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-pfm-bg relative overflow-hidden">
                {/* Background decorative elements to stay consistent */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pfm-primary/10 rounded-full blur-[100px] animate-pulse"></div>

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                        scale: [0.8, 1.1, 1],
                        opacity: 1
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative z-10"
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.05, 1],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="relative"
                    >
                        {/* Soft glow behind the logo */}
                        <div className="absolute inset-0 bg-pfm-primary/20 blur-xl rounded-2xl scale-150"></div>

                        <Logo config={{ size: "lg", showText: false }} />
                    </motion.div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-pfm-bg transition-colors duration-300">
            <Navbar />

            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/product/:productId" element={<ProductDetails />} />
                </Routes>
            </main>

            <Footer />
        </div>
    );
};

function App() {
    return (
        <AuthProvider>
            <ThemeProvider>
                <LanguageProvider>
                    <HeroUIProvider>
                        <BrowserRouter>
                            <AppContent />
                        </BrowserRouter>
                    </HeroUIProvider>
                </LanguageProvider>
            </ThemeProvider>
        </AuthProvider>
    )
}

export default App
