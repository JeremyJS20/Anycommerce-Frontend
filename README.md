# ✨ AnyCommerce Frontend

[![React](https://img.shields.io/badge/React-19.0-blue?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0-646CFF?logo=vite)](https://vitejs.dev/)
[![HeroUI](https://img.shields.io/badge/HeroUI-v3-00B8D9?logo=heroui)](https://heroui.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)

AnyCommerce is a premium, high-performance e-commerce frontend built with **React 19**, **Vite**, and **HeroUI**. It strictly adheres to **Clean Architecture** principles to ensure a modular, scalable, and maintainable codebase.

---

## 💎 Premium Aesthetic & Design

The application features a modern, high-fidelity design system focused on a **Teal/Slate** palette, incorporating:
- **Glassmorphism**: Sophisticated backdrop blurs and subtle white borders.
- **Micro-animations**: Fluid transitions powered by **Framer Motion**.
- **Dynamic Theming**: Deep support for both Light and Dark modes.
- **Typography**: Clean and legible **Inter** font family.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [React 19](https://react.dev/) |
| **Build Tool** | [Vite](https://vite.dev/) |
| **UI Library** | [HeroUI v3](https://heroui.com/) |
| **Styling** | [Tailwind CSS v4.0](https://tailwindcss.com/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **HTTP Client** | [Axios](https://axios-http.com/) |
| **Validation** | [Zod](https://zod.dev/) |
| **State Management** | React Context API |
| **i18n** | [react-i18next](https://react.i18next.com/) |

---

## 🏛️ Architecture Overview

We implement **Clean Architecture** to decouple the UI from business logic and external integrations.

### Layered Structure:
- **`Domain/`**: Core business entities and logic (Pure TypeScript).
- **`Data/`**: Static definitions, constants, and mapping data.
- **`Infrastructure/`**: Implementation of external world interactions (Services, HTTP Client).
- **`Presentation/`**: UI components, pages, hooks, and global state (Context).
- **`Validation/`**: Centralized Zod schemas for input and API data integrity.
- **`Main/`**: Entry point and high-level application wiring.

---

## 📁 Directory Structure

```text
src/
├── Domain/         # Entities & Business Interfaces
├── Data/           # Constants & Static Data
├── Infrastructure/ # API Services & HTTP Client
├── Presentation/   # Components, Pages, Hooks, Context, Styles
├── Validation/     # Zod Schemas
├── Main/           # App Wiring & Entry Point
└── Assets/         # Optimized Images & Icons
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0 or higher)
- [npm](https://www.npmjs.com/)

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

### Environment Setup
Create a `.env` file in the root directory:
```env
VITE_REST_API_URL=your_api_url
VITE_REST_API_KEY=your_api_key
```

### Development
Run the development server with Hot Module Replacement (HMR):
```bash
npm run dev
```

### Build
Generate a production-ready bundle in the `dist/` folder:
```bash
npm run build
```

---

## 🛡️ Coding Standards

- **Strict TypeScript**: No `any` types allowed.
- **HeroUI Wrappers**: All UI components must be generic, reusable wrappers around HeroUI components, configured via JSON.
- **i18n Mandatory**: No hardcoded strings in the UI.
- **Service Layer**: Components must never call APIs directly; always use the `Service` layer.

---

Developed with ❤️ by **AnyCommerce Team**.
