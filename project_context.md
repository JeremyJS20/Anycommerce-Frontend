# AnyCommerce Frontend - Project Context & Guidelines

This document serves as the single source of truth for the AnyCommerce frontend project, defining its identity, architecture, technology stack, and coding standards.

## 1. Project Identity
*   **Name:** AnyCommerce Frontend
*   **Type:** E-commerce Web Application (B2C/B2B)
*   **Goal:** Provide a high-performance, responsive, and secure shopping experience utilizing a modular Clean Architecture.
*   **Aesthetic:** Premium, Modern, Dynamic (Glassmorphism, Vibrant Gradients, Micro-animations).
*   **Design System:** [HeroUI v3](https://heroui.com/) + [Tailwind CSS v4.0](https://tailwindcss.com/) with CSS-variable based theming.
*   **Color Palette (Premium Teal/Slate):**
    *   **Primary:** `#0D9488` (Teal-600) | Hover: `#0F766E` (Teal-700) (`pfm-primary`).
    *   **Secondary:** `#10B981` (Emerald-500) (`pfm-secondary`).
    *   **Background:** `#F8FAFC` (Light) | `#020617` (Dark - Slate-950) (`pfm-bg`).
    *   **Surface/Card:** `#FFFFFF` (Light) | `rgba(30, 41, 59, 0.7)` (Dark - Glassmorphism) (`pfm-card`).
    *   **Text:**
        *   Dark/Main: `#0F172A` (Light) | `#F8FAFC` (Dark) (`pfm-text-dark`).
        *   Light/Muted: `#64748B` (Light) | `#94A3B8` (Dark) (`pfm-text-light`).
    *   **State:**
        *   Danger: `#EF4444`.
        *   Success: `#10B981`.
        *   Border: `rgba(226, 232, 240, 0.5)` (Light) | `rgba(51, 65, 85, 0.5)` (Dark) (`pfm-border`).
*   **Typography:** [Inter](https://fonts.google.com/specimen/Inter) (via Google Fonts).
*   **Premium Effects:**
    *   **Glassmorphism:** `backdrop-blur-md bg-opacity-70 border border-white/10 shadow-xl`.
    *   **Gradients:** `bg-gradient-to-br from-pfm-primary to-pfm-secondary`.
    *   **Animations:** Smooth transitions and micro-interactions powered by [Framer Motion](https://www.framer.com/motion/).
*   **Component Styles:**
    *   **Primary Button:** `bg-pfm-primary text-white font-bold rounded-xl px-6 py-3 shadow-lg shadow-pfm-primary/20 transition-all hover:bg-pfm-primary-hover hover:shadow-xl hover:-translate-y-0.5 active:scale-95`
    *   **Secondary/Action Button:** `bg-pfm-surface/50 backdrop-blur-sm border border-pfm-border text-pfm-text-dark font-semibold rounded-xl px-4 py-2 hover:bg-pfm-bg shadow-sm transition-all hover:-translate-y-0.5`
    *   **Icon Button:** `text-pfm-text-light hover:bg-pfm-primary/10 hover:text-pfm-primary rounded-xl p-2 transition-all active:scale-90`
    *   **List Item / Row:** `transition-all hover:bg-pfm-primary/5 hover:pl-4 rounded-lg` (Add `group` class to container for child interactions).
*   **General Rule:** Consistency: All other components (Inputs, Cards, Toggles, etc.) MUST follow these design patterns (rounded corners, shadow depth, transition speeds, and color usage).
*   **Animations:** Smooth transitions and micro-interactions powered by [Framer Motion](https://www.framer.com/motion/).

## 2. Technology Stack
*   **Core Framework:** React 18 (Vite-based).
*   **Language:** TypeScript (Strict mode).
*   **UI Library:** HeroUI v3.
*   **Styling:** Tailwind CSS.
*   **Routing:** React Router Dom v6.
*   **HTTP Client:** Axios (Custom `HttpClient` wrapper).
*   **State Management:** React Context API (Auth, Language, Theme, Cart, Preloader).
*   **Validation:** Zod (for schemas and form data).
*   **Internationalization:** `react-i18next`.
*   **Integrations:** Stripe (React Stripe JS).

## 3. Architecture & Structure
The project strictly follows **Clean Architecture** principles to decouple business logic from UI and external services.

### Directory Structure (`src/`)
*   **`Domain/`**: The heart of the app. Contains pure business models, entities, and interfaces.
    *   `entities/`: Product, User, Stripe, Generics (Base Response types).
*   **`Data/`**: Static data definitions and constants.
    *   `Constants/`: Error messages, status IDs, and static UI text mapping.
*   **`Infrastructure/`**: External world implementations.
    *   `Http/`: The `HttpClient` class handling Axios instances, interceptors, and default headers.
    *   `Services/`: Business services that orchestrate data fetching (Auth, Catalogs, Product, Stripe, User).
*   **`Presentation/`**: Everything related to the UI and UX.
    *   `Components/`: Reusable, atomic components (Cart, Navbar, Footer, Common UI elements).
    *   `Pages/`: High-level page orchestrators (divided into `PublicPages` and `Private`).
    *   `Hooks/`: Custom React hooks encapsulate component-level logic.
    *   `Context/`: Global state providers using React Context.
    *   `Assets/`: Static images, icons, and preloader animations.
*   **`Main/`**: Application wiring.
    *   `App.tsx`: Router initialization.
    *   `main.tsx`: DOM entry point.
*   **`Validation/`**: Zod validators and business rules for input validation.

## 4. Coding Standards & Conventions
### React & TypeScript
*   **Functional Components:** Always use functional components with standard React hooks.
*   **Strict Typing:** Explicitly type all props, state, and function return values. Avoid `any`.
*   **Generic & Reusable Components (MANDATORY):** All UI components (Buttons, Tables, Modals, Inputs, etc.) MUST be built as generic, reusable, and highly customizable wrappers around HeroUI components.
    *   **Configuration via JSON:** Components MUST be designed to be customized by passing a single configuration object (JSON-like interface) rather than many individual props. This ensures a consistent interface and allows for easier extension of business logic without changing the UI structure.
*   **Layers Separation:** NEVER perform direct API calls inside a component. Use a `Service` from the Infrastructure layer.
*   **Naming:**
    *   Files: `PascalCase.tsx` for components/pages, `camelCase.ts` for services/hooks/utils.
    *   Extensions: `.service.ts`, `.context.tsx`, `.routes.utils.ts`.

### Styling & UI
*   **HeroUI First:** ALWAYS use HeroUI components for base layouts (Buttons, Inputs, Modals).
*   **Tailwind Utilities:** Use Tailwind for positioning, spacing, and specific brand-color overrides.
*   **Responsive Design:** Use custom screen tokens (`mobile`, `tablet`, `laptop`, `desktop`) defined in `tailwind.config.js`.

### Internationalization (i18n)
*   **Mandatory:** Every string visible to the user must be translated using the `useTranslation` hook or the `translator` utility function.
*   **Dictionaries:** Translation keys should be organized by domain/feature.

## 5. Frontend Performance & SEO
*   **SWC Integration:** Uses `@vitejs/plugin-react-swc` for ultra-fast builds and refreshes.
*   **Lazy Loading:** Components should be wrapped in `React.Suspense` with a `<Preloader />` during navigation.
*   **Image Efficiency:** Use optimized assets and prefer semantic `<img>` tags over CSS backgrounds where possible for better SEO and lazy loading.
*   **Bundle Size:** Keep external dependencies to a minimum; favor custom logic or lightweight libraries over heavy frameworks.

## 6. Development Workflow
1.  **Environment Setup:** Ensure `VITE_REST_API_URL` and `VITE_REST_API_KEY` are configured in `.env`.
2.  **Dependencies:** Use `npm install` for reproducible builds.
3.  **Local Dev:** `npm run dev` for HMR.
4.  **Verification:** `npm run test` (Vitest) and `npm run lint` before committing.
5.  **Build:** `npm run build` generates a production-ready `dist` folder.

## 7. Operational & AI Guidance
*   **Compliance:** ALWAYS cross-reference implementations with the layer structure defined here.
*   **Consistency:** Follow the pattern: Router -> Page -> Components -> Hooks -> Services -> Domain Entities.
*   **Security:** Ensure sensitive operations (payments, user profile updates) are routed through authenticated services using the `Authorization` header.
*   **Forms:** Use Zod schemas from `src/Validation/` for all form-based interactions to ensure data integrity.
