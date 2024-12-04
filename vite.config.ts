import { defineConfig } from 'vite'
import { handlebarsPrecompile } from './hendlbars_precompille'
import { resolve } from 'path';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html')
            },
        },
    }, server: {
        port: 3000,
        open: true,
    },

    plugins: [
        handlebarsPrecompile(),
    ]
})

