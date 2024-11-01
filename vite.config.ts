import { defineConfig } from 'vite'
import {handlebarsPrecompile} from './hendlbars_precompille'
import { resolve } from 'path';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                register: resolve(__dirname, 'src/pages/register/register.html'),
                authorization: resolve(__dirname, 'src/pages/authorization/authorization.html'),
                change_password: resolve(__dirname, 'src/pages/change_password/change_password.html'),
                chat: resolve(__dirname, 'src/pages/chat/chat.html'),
                client_errors: resolve(__dirname, 'src/pages/client_errors/client_errors.html'),
                profile: resolve(__dirname, 'src/pages/profile/profile.html'),
                server_errors: resolve(__dirname, 'src/pages/server_errors/server_errors.html'),
            },
        },
    },server: {
        port: 3000,
        open: true
    },
    plugins:[
        handlebarsPrecompile(),
    ]
})

