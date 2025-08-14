# Product Entry App

A modern web application built with **React**, **TypeScript**, **Vite**, and **Bootstrap**, designed for managing product entries efficiently.

---

## Features

1. **General Information Input**  
   Capture essential data: City, Date, Receiver, and other relevant details.

2. **Producer Information**  
   Add personal information of the producer: First Name, Last Name, etc.

3. **Product Management**  
   - Enter product details: Description, Quantity, Cost Price, Sale Price  
   - Dynamically view the list of added products  
   - Edit or remove products individually

4. **Final Review & Export**  
   - View the complete product list  
   - Export or print the list as a PDF

---

## Tech Stack

- **React** – Frontend library for building user interfaces  
- **TypeScript** – Strongly typed JavaScript for safer code  
- **Vite** – Fast development server with Hot Module Replacement  
- **Bootstrap** – Responsive UI components  
- **jsPDF** – PDF generation for export/printing  

---

## Getting Started

### Prerequisites

- Node.js >= 18.12
- npm or yarn

### Installation

```bash
git clone https://github.com/ismaelmarot/product-entry-app.git
cd product-entry-app
npm install


------------------------------------------------
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
