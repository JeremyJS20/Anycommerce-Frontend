import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            "nav": {
                "search_placeholder": "Search products...",
                "cart": "Cart",
                "profile": "Profile",
                "sign_in": "Sign In"
            },
            "hero": {
                "badge": "Now Live: Winter Collection 2026",
                "title_part1": "E-commerce",
                "title_part2": "Redefined.",
                "description": "Experience a new era of shopping with our modular, high-performance architecture and premium glass-inspired design.",
                "start_shopping": "Start Shopping",
                "view_collections": "View Collections"
            },
            "auth": {
                "welcome_back": "Welcome Back!",
                "enter_details": "Please enter your details to sign in to your account.",
                "email_address": "Email Address",
                "email_placeholder": "Enter your email",
                "username": "Username",
                "username_placeholder": "Enter your username",
                "password": "Password",
                "password_placeholder": "Enter your password",
                "forgot_password": "Forgot password?",
                "remember_me": "Remember me for 30 days",
                "sign_in": "Sign In",
                "logout": "Logout",
                "no_account": "Don't have an account?",
                "sign_up": "Sign up for free"
            }
        }
    },
    es: {
        translation: {
            "nav": {
                "search_placeholder": "Buscar productos...",
                "cart": "Carrito",
                "profile": "Perfil",
                "sign_in": "Iniciar Sesión"
            },
            "hero": {
                "badge": "Ya Disponible: Colección de Invierno 2026",
                "title_part1": "Comercio Electrónico",
                "title_part2": "Redefinido.",
                "description": "Experimenta una nueva era de compras con nuestra arquitectura modular de alto rendimiento y diseño premium inspirado en el cristal.",
                "start_shopping": "Empezar a Comprar",
                "view_collections": "Ver Colecciones"
            },
            "auth": {
                "welcome_back": "¡Bienvenido de nuevo!",
                "enter_details": "Por favor ingresa tus datos para iniciar sesión.",
                "email_address": "Correo Electrónico",
                "email_placeholder": "Ingresa tu correo",
                "username": "Nombre de usuario",
                "username_placeholder": "Ingresa tu nombre de usuario",
                "password": "Contraseña",
                "password_placeholder": "Ingresa tu contraseña",
                "forgot_password": "¿Olvidaste tu contraseña?",
                "remember_me": "Recordarme por 30 días",
                "sign_in": "Iniciar Sesión",
                "logout": "Cerrar Sesión",
                "no_account": "¿No tienes una cuenta?",
                "sign_up": "Regístrate gratis"
            }
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
