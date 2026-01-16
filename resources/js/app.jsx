import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ThemeProvider } from './Context/ThemeContext';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        const pages = import.meta.glob('./Pages/**/*.{tsx,jsx}');
        const page = pages[`./Pages/${name}.tsx`] || pages[`./Pages/${name}.jsx`];

        if (!page) {
            throw new Error(`Page not found: ./Pages/${name}.tsx`);
        }

        // On attend que le module charge, puis on retourne le .default
        const module = await page();
        return module.default;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <ThemeProvider>
                <App {...props} />
            </ThemeProvider>
        );
    },
    progress: {
        color: '#0080FF', // Optionnel : couleur DC-HUB
    },
});