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
            },
            "home": {
                "hero": {
                    "badge": "Now Live: Winter Collection 2026",
                    "title": "The definitive platform to buy and sell anything you wish.",
                    "highlight": "buy and sell",
                    "description": "Buy and sell any products you want all around the world, no matter the distance, no matter the cost.",
                    "cta_buy": "Start Buying",
                    "cta_sell": "Become a Seller"
                },
                "flash_sale": {
                    "title": "Flash Sale Event",
                    "description": "Massive discounts on premium tech and fashion. Don't miss out!",
                    "timer_label": "Remaining Time",
                    "cta": "Shop the Sale"
                },
                "new_arrivals": {
                    "title": "New Arrivals",
                    "view_all": "View all",
                    "badge": "New"
                },
                "best_sellers": {
                    "title": "Best Sellers"
                },
                "features": {
                    "title": "Why Choose AnyCommerce?",
                    "description": "We provide the best tools for both buyers and sellers globally, ensuring every transaction is seamless.",
                    "global": {
                        "title": "Global Marketplace",
                        "desc": "Access a worldwide network of buyers and sellers. We break down borders to bring the world to your doorstep."
                    },
                    "protection": {
                        "title": "Trusted Protection",
                        "desc": "Shop with confidence. Our robust escrow system and fraud protection ensure every cent and product is secure."
                    },
                    "economics": {
                        "title": "Fair Economics",
                        "desc": "Industry-leading low commission rates. We believe in empowering creators and sellers to keep more of their earnings."
                    }
                }
            },
            "categories": {
                "title": "Explore Categories",
                "all_products": "All Products",
                "electronics": {
                    "name": "Electronics",
                    "description": "Gadgets, devices, and electronic appliances.",
                    "subcategories": {
                        "smartphones": "Smartphones",
                        "laptops": "Laptops",
                        "tablets": "Tablets",
                        "audio_headphones": "Audio & Headphones",
                        "cameras": "Cameras",
                        "wearable_tech": "Wearable Technology",
                        "smart_home": "Smart Home"
                    }
                },
                "fashion": {
                    "name": "Fashion",
                    "description": "Clothing, footwear, and accessories for all.",
                    "subcategories": {
                        "mens_clothing": "Men's Clothing",
                        "womens_clothing": "Women's Clothing",
                        "kids_clothing": "Kids' Clothing",
                        "shoes": "Shoes",
                        "watches": "Watches",
                        "bags_wallets": "Bags & Wallets",
                        "jewelry": "Jewelry"
                    }
                },
                "home_garden": {
                    "name": "Home & Garden",
                    "description": "Everything for your living space and outdoor activities.",
                    "subcategories": {
                        "furniture": "Furniture",
                        "kitchenware": "Kitchenware",
                        "bedding_bath": "Bedding & Bath",
                        "home_decor": "Home Decor",
                        "garden_tools": "Garden Tools",
                        "patio_furniture": "Patio Furniture",
                        "lighting": "Lighting"
                    }
                },
                "health_beauty": {
                    "name": "Health & Beauty",
                    "description": "Personal care, cosmetics, and wellness products.",
                    "subcategories": {
                        "skincare": "Skincare",
                        "makeup": "Makeup",
                        "haircare": "Haircare",
                        "fragrances": "Fragrances",
                        "personal_care": "Personal Care",
                        "vitamins_supplements": "Vitamins & Supplements",
                        "grooming": "Grooming"
                    }
                },
                "sports_outdoors": {
                    "name": "Sports & Outdoors",
                    "description": "Equipment and gear for sports and adventure.",
                    "subcategories": {
                        "exercise_fitness": "Exercise & Fitness",
                        "cycling": "Cycling",
                        "camping_hiking": "Camping & Hiking",
                        "water_sports": "Water Sports",
                        "team_sports": "Team Sports",
                        "outdoor_clothing": "Outdoor Clothing",
                        "footwear": "Footwear"
                    }
                },
                "toys_hobbies": {
                    "name": "Toys & Hobbies",
                    "description": "Fun for all ages, from toys to collectables.",
                    "subcategories": {
                        "action_figures": "Action Figures",
                        "board_games_puzzles": "Board Games & Puzzles",
                        "dolls_teddy_bears": "Dolls & Teddy Bears",
                        "educational_toys": "Educational Toys",
                        "model_kits": "Model Kits",
                        "rc_vehicles": "RC Vehicles",
                        "art_crafts": "Art & Crafts"
                    }
                },
                "automotive": {
                    "name": "Automotive",
                    "description": "Parts, accessories, and tools for vehicles.",
                    "subcategories": {
                        "car_electronics": "Car Electronics",
                        "tools_equipment": "Tools & Equipment",
                        "interior_accessories": "Interior Accessories",
                        "exterior_accessories": "Exterior Accessories",
                        "car_care": "Car Care",
                        "tires_wheels": "Tires & Wheels",
                        "replacement_parts": "Replacement Parts"
                    }
                },
                "books_stationery": {
                    "name": "Books & Stationery",
                    "description": "Reading material, office supplies, and creative tools.",
                    "subcategories": {
                        "fiction": "Fiction",
                        "non_fiction": "Non-Fiction",
                        "childrens_books": "Children's Books",
                        "education_textbooks": "Education & Textbooks",
                        "notebooks_planners": "Notebooks & Planners",
                        "writing_instruments": "Writing Instruments",
                        "office_supplies": "Office Supplies"
                    }
                }
            },
            "products": {
                "sidebar": {
                    "filters": "Filters",
                    "clear_all": "Clear All",
                    "category": "Category",
                    "price_range": "Price Range",
                    "rating": "Rating",
                    "stars": "stars",
                    "and_up": "& up"
                },
                "grid": {
                    "showing": "Showing",
                    "premium_products": "premium products",
                    "sort_by": "Sort by:",
                    "error_fetch": "Unable to retrieve products.",
                    "error_title": "Something went wrong",
                    "retry": "Try Again"
                },
                "sort": {
                    "newest": "Newest Arrivals",
                    "oldest": "Oldest",
                    "price_asc": "Price: Low to High",
                    "price_desc": "Price: High to Low",
                    "alphabetical_asc": "Alphabetical: A-Z",
                    "alphabetical_desc": "Alphabetical: Z-A",
                    "rating_desc": "Highest Rated"
                },
                "header": {
                    "breadcrumb_home": "Home",
                    "breadcrumb_products": "Products",
                    "description": "Discover premium tech and lifestyle essentials."
                },
                "empty": {
                    "no_results": "No products found matching your criteria.",
                    "view_all": "View all products"
                }
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
            },
            "home": {
                "hero": {
                    "badge": "Ya Disponible: Colección de Invierno 2026",
                    "title": "La plataforma definitiva para comprar y vender lo que desees.",
                    "highlight": "comprar y vender",
                    "description": "Compra y vende los productos que quieras en todo el mundo, sin importar la distancia ni el costo.",
                    "cta_buy": "Empezar a Comprar",
                    "cta_sell": "Ser Vendedor"
                },
                "flash_sale": {
                    "title": "Evento de Venta Flash",
                    "description": "Grandes descuentos en tecnología y moda premium. ¡No te lo pierdas!",
                    "timer_label": "Tiempo Restante",
                    "cta": "Comprar en la Venta"
                },
                "new_arrivals": {
                    "title": "Recién Llegados",
                    "view_all": "Ver todo",
                    "badge": "Nuevo"
                },
                "best_sellers": {
                    "title": "Los Más Vendidos"
                },
                "features": {
                    "title": "¿Por qué elegir AnyCommerce?",
                    "description": "Ofrecemos las mejores herramientas para compradores y vendedores a nivel mundial, garantizando transacciones fluidas.",
                    "global": {
                        "title": "Mercado Global",
                        "desc": "Accede a una red mundial de compradores y vendedores. Rompemos las fronteras para traer el mundo a tu puerta."
                    },
                    "protection": {
                        "title": "Protección de Confianza",
                        "desc": "Compra con confianza. Nuestro sólido sistema de depósito y protección contra fraudes aseguran cada centavo y producto."
                    },
                    "economics": {
                        "title": "Economía Justa",
                        "desc": "Tasas de comisión líderes en la industria. Creemos en empoderar a los creadores y vendedores para que conserven más de sus ganancias."
                    }
                }
            },
            "categories": {
                "title": "Explorar Categorías",
                "all_products": "Todos los productos",
                "electronics": {
                    "name": "Electrónica",
                    "description": "Gadgets, dispositivos y electrodomésticos.",
                    "subcategories": {
                        "smartphones": "Smartphones",
                        "laptops": "Portátiles",
                        "tablets": "Tabletas",
                        "audio_headphones": "Audio y Auriculares",
                        "cameras": "Cámaras",
                        "wearable_tech": "Tecnología Vestible",
                        "smart_home": "Hogar Inteligente"
                    }
                },
                "fashion": {
                    "name": "Moda",
                    "description": "Ropa, calzado y accesorios para todos.",
                    "subcategories": {
                        "mens_clothing": "Ropa de Hombre",
                        "womens_clothing": "Ropa de Mujer",
                        "kids_clothing": "Ropa de Niños",
                        "shoes": "Zapatos",
                        "watches": "Relojes",
                        "bags_wallets": "Bolsos y Carteras",
                        "jewelry": "Joyería"
                    }
                },
                "home_garden": {
                    "name": "Hogar y Jardín",
                    "description": "Todo para tu espacio vital y actividades al aire libre.",
                    "subcategories": {
                        "furniture": "Muebles",
                        "kitchenware": "Utensilios de Cocina",
                        "bedding_bath": "Ropa de Cama y Baño",
                        "home_decor": "Decoración del Hogar",
                        "garden_tools": "Herramientas de Jardín",
                        "patio_furniture": "Muebles de Patio",
                        "lighting": "Iluminación"
                    }
                },
                "health_beauty": {
                    "name": "Salud y Belleza",
                    "description": "Cuidado personal, cosméticos y bienestar.",
                    "subcategories": {
                        "skincare": "Cuidado de la Piel",
                        "makeup": "Maquillaje",
                        "haircare": "Cuidado del Cabello",
                        "fragrances": "Fragancias",
                        "personal_care": "Cuidado Personal",
                        "vitamins_supplements": "Vitaminas y Suplementos",
                        "grooming": "Aseo"
                    }
                },
                "sports_outdoors": {
                    "name": "Deportes y Aire Libre",
                    "description": "Equipo para deportes y aventuras.",
                    "subcategories": {
                        "exercise_fitness": "Ejercicio y Fitness",
                        "cycling": "Ciclismo",
                        "camping_hiking": "Camping y Senderismo",
                        "water_sports": "Deportes Acuáticos",
                        "team_sports": "Deportes de Equipo",
                        "outdoor_clothing": "Ropa para Exteriores",
                        "footwear": "Calzado"
                    }
                },
                "toys_hobbies": {
                    "name": "Juguetes y Pasatiempos",
                    "description": "Diversión para todas las edades, desde juguetes hasta coleccionables.",
                    "subcategories": {
                        "action_figures": "Figuras de Acción",
                        "board_games_puzzles": "Juegos de Mesa y Puzzles",
                        "dolls_teddy_bears": "Muñecas y Peluches",
                        "educational_toys": "Juguetes Educativos",
                        "model_kits": "Maquetas",
                        "rc_vehicles": "Vehículos RC",
                        "art_crafts": "Arte y Manualidades"
                    }
                },
                "automotive": {
                    "name": "Automoción",
                    "description": "Repuestos, accesorios y herramientas para vehículos.",
                    "subcategories": {
                        "car_electronics": "Electrónica para Coche",
                        "tools_equipment": "Herramientas y Equipamiento",
                        "interior_accessories": "Accesorios de Interior",
                        "exterior_accessories": "Accesorios de Exterior",
                        "car_care": "Cuidado del Coche",
                        "tires_wheels": "Neumáticos y Ruedas",
                        "replacement_parts": "Piezas de Repuesto"
                    }
                },
                "books_stationery": {
                    "name": "Libros y Papelería",
                    "description": "Material de lectura, suministros de oficina.",
                    "subcategories": {
                        "fiction": "Ficción",
                        "non_fiction": "No Ficción",
                        "childrens_books": "Libros Infantiles",
                        "education_textbooks": "Educación y Libros de Texto",
                        "notebooks_planners": "Cuadernos y Agendas",
                        "writing_instruments": "Instrumentos de Escritura",
                        "office_supplies": "Suministros de Oficina"
                    }
                }
            },
            "products": {
                "sidebar": {
                    "filters": "Filtros",
                    "clear_all": "Limpiar Todo",
                    "category": "Categoría",
                    "price_range": "Rango de Precio",
                    "rating": "Calificación",
                    "stars": "estrellas",
                    "and_up": "y superior"
                },
                "grid": {
                    "showing": "Mostrando",
                    "premium_products": "productos premium",
                    "sort_by": "Ordenar por:",
                    "error_fetch": "No se pudieron obtener los productos.",
                    "error_title": "Algo salió mal",
                    "retry": "Reintentar"
                },
                "sort": {
                    "newest": "Novedades",
                    "oldest": "Más Antiguos",
                    "price_asc": "Precio: Menor a Mayor",
                    "price_desc": "Precio: Mayor a Menor",
                    "alphabetical_asc": "Alfabético: A-Z",
                    "alphabetical_desc": "Alfabético: Z-A",
                    "rating_desc": "Mejor Calificados"
                },
                "header": {
                    "breadcrumb_home": "Inicio",
                    "breadcrumb_products": "Productos",
                    "description": "Descubre lo mejor en tecnología y estilo de vida."
                },
                "empty": {
                    "no_results": "No se encontraron productos con estos criterios.",
                    "view_all": "Ver todos los productos"
                }
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
