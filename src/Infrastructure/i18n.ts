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
            "common": {
                "error": "Something went wrong",
                "retry": "Try Again",
                "back": "Back"
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
            },
            "product": {
                "not_found": "Product not found.",
                "back_to_shop": "Back to Shop",
                "in_stock": "+{{count}} units available",
                "out_of_stock": "Out of stock",
                "quantity": "Quantity",
                "max_units": "Maximum availability reached",
                "add_to_cart": "Add to Cart",
                "buy_now": "Buy Now",
                "shipping_info": "Free express delivery",
                "warranty_info": "2 Year Warranty",
                "overview": "Product Overview",
                "specs": "Technical Characteristics",
                "feature_1": "High-performance components engineered for excellence",
                "feature_2": "Advanced thermal management for sustained performance",
                "feature_3": "Premium design and build quality for long-lasting durability",
                "tabs": {
                    "details": "Details",
                    "reviews": "Reviews",
                    "shipping": "Shipping & Returns"
                },
                "reviews": {
                    "empty_title": "No reviews yet",
                    "empty_desc": "Be the first to share your experience with this product.",
                    "write": "Write a Review"
                },
                "shipping": {
                    "delivery_title": "Global Express Shipping",
                    "returns_title": "Hassle-Free Returns"
                },
                "colors": "Colors",
                "color": "Color",
                "size": "Size",
                "sizes": "Sizes"
            },
            "cart_drawer": {
                "title": "Shopping Cart",
                "empty_title": "Your cart is empty",
                "empty_desc": "Looks like you haven't added anything to your cart yet.",
                "subtotal": "Subtotal",
                "shipping": "Shipping",
                "free": "FREE",
                "total": "Total",
                "checkout": "Proceed to Checkout",
                "continue": "Continue Shopping"
            },
            "toast": {
                "success_title": "Success!",
                "info_title": "Information",
                "warning_title": "Warning",
                "error_title": "Error",
                "cart_added": "{{quantity}} x {{product}} added to cart.",
                "cart_cleared_title": "Cart cleared",
                "cart_cleared": "Your shopping bag is now empty.",
                "login_success_title": "Welcome back!",
                "login_success": "Logged in as {{name}}",
                "login_error_title": "Login failed",
                "login_error_desc": "Please check your credentials.",
                "logout_title": "Logged out",
                "logout_success": "You have been successfully signed out."
            },
            "store_info": {
                "official_store": "Official Store",
                "visit_store": "Visit Store",
                "follow": "Follow",
                "store_desc": "Your premier destination for high-end electronics and gaming gear. We specialize in bringing the latest tech breakthroughs directly to your doorstep with guaranteed authenticity and superior support.",
                "shipping_fast": "Fast Shipping Worldwide",
                "secure_payments": "100% Secure Payments",
                "easy_returns": "30-Day Easy Returns"
            },
            "similar_items": {
                "title": "Similar Items",
                "view_all": "View All"
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
            "common": {
                "error": "Algo salió mal",
                "retry": "Reintentar",
                "back": "Volver"
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
            },
            "product": {
                "not_found": "Producto no encontrado.",
                "back_to_shop": "Volver a la tienda",
                "in_stock": "+{{count}} unidades disponibles",
                "out_of_stock": "Agotado",
                "quantity": "Cantidad",
                "max_units": "Máxima disponibilidad alcanzada",
                "add_to_cart": "Añadir al carrito",
                "buy_now": "Comprar ahora",
                "shipping_info": "Envío express gratuito",
                "warranty_info": "2 años de garantía",
                "overview": "Descripción general",
                "specs": "Características técnicas",
                "feature_1": "Componentes de alto rendimiento diseñados para la excelencia",
                "feature_2": "Gestión térmica avanzada para un rendimiento sostenido",
                "feature_3": "Diseño y calidad de construcción premium para una durabilidad duradera",
                "tabs": {
                    "details": "Detalles",
                    "reviews": "Reseñas",
                    "shipping": "Envíos y Devoluciones"
                },
                "reviews": {
                    "empty_title": "Aún no hay reseñas",
                    "empty_desc": "Sé el primero en compartir tu experiencia con este producto.",
                    "write": "Escribir una reseña"
                },
                "shipping": {
                    "delivery_title": "Envío Express Global",
                    "returns_title": "Devoluciones sin complicaciones"
                },
                "colors": "Colores",
                "color": "Color",
                "size": "Talla",
                "sizes": "Tallas"
            },
            "cart_drawer": {
                "title": "Carrito de Compras",
                "empty_title": "Tu carrito está vacío",
                "empty_desc": "Parece que aún no has añadido nada a tu carrito.",
                "subtotal": "Subtotal",
                "shipping": "Envío",
                "free": "GRATIS",
                "total": "Total",
                "checkout": "Proceder al Pago",
                "continue": "Continuar Comprando"
            },
            "toast": {
                "success_title": "¡Éxito!",
                "info_title": "Información",
                "warning_title": "Advertencia",
                "error_title": "Error",
                "cart_added": "{{quantity}} x {{product}} añadido al carrito.",
                "cart_cleared_title": "Carrito vaciado",
                "cart_cleared": "Tu bolsa de compras está vacía.",
                "login_success_title": "¡Bienvenido de nuevo!",
                "login_success": "Sesión iniciada como {{name}}",
                "login_error_title": "Error al iniciar sesión",
                "login_error_desc": "Por favor, verifica tus credenciales.",
                "logout_title": "Sesión cerrada",
                "logout_success": "Has cerrado sesión correctamente."
            },
            "store_info": {
                "official_store": "Tienda Oficial",
                "visit_store": "Visitar Tienda",
                "follow": "Seguir",
                "store_desc": "Tu destino principal para electrónica de alta gama y equipos de juego. Nos especializamos en llevar los últimos avances tecnológicos directamente a tu puerta con autenticidad garantizada y soporte superior.",
                "shipping_fast": "Envío Rápido a Nivel Mundial",
                "secure_payments": "Pagos 100% Seguros",
                "easy_returns": "Devoluciones Fáciles en 30 Días"
            },
            "similar_items": {
                "title": "Artículos Similares",
                "view_all": "Ver Todo"
            }
        }
    }
};

const savedLanguage = localStorage.getItem('pfm_language') || 'en';

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: savedLanguage,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

i18n.on('languageChanged', (lng: string) => {
    localStorage.setItem('pfm_language', lng);
});

export default i18n;
