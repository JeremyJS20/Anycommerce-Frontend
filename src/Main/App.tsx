import { HeroUIProvider } from '@heroui/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from '@Presentation/Components/Navbar'
import { Footer } from '@Presentation/Components/Footer'
import { ThemeProvider } from '@Presentation/Context/ThemeContext'
import { LanguageProvider } from '@Presentation/Context/LanguageContext'
import { AuthProvider } from '@Presentation/Context/AuthContext'
import { Home } from '@Presentation/Pages/Home'
import { SignIn } from '@Presentation/Pages/Auth/SignIn'

function App() {
    return (
        <AuthProvider>
            <ThemeProvider>
                <LanguageProvider>
                    <HeroUIProvider>
                        <BrowserRouter>
                            <div className="min-h-screen flex flex-col bg-pfm-bg transition-colors duration-300">
                                <Navbar />

                                <main className="flex-grow">
                                    <Routes>
                                        <Route path="/" element={<Home />} />
                                        <Route path="/signin" element={<SignIn />} />
                                    </Routes>
                                </main>

                                <Footer />
                            </div>
                        </BrowserRouter>
                    </HeroUIProvider>
                </LanguageProvider>
            </ThemeProvider>
        </AuthProvider>
    )
}

export default App
