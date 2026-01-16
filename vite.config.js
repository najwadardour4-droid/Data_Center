import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react'; // 1. Ajoute cet import
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            // 2. Change 'resources/js/app.js' en 'resources/js/app.jsx' (si c'est ton cas)
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
        react(), // 3. Ajoute le plugin React ici
        tailwindcss(),
    ],
    server: {
        host: '127.0.0.1', // Force l'IPv4 pour éviter les erreurs 404
        port: 5173,
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});