import { defineConfig } from 'vite'
import { handlebarsPrecompile } from './hendlbars_precompille'
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
    }, server: {
        port: 3000,
        open: true,
        proxy: {
            "/api": {
              target: 'https://ya-praktikum.tech', 
              changeOrigin: true,
              secure: false,
              ws: true,
              configure: (proxy) => {
                proxy.on('proxyReq', (proxyReq, req, res) => {
                    proxyReq.setHeader('Origin', 'https://ya-praktikum.tech');
                });
            },
            cookieDomainRewrite: '', 
            },
            '/ws': {
              target: 'ws://localhost:5249/ws',  //'ws://192.168.10.111:5249/ws', //  'ws://10.100.100.123:5000/ws',
              ws: true,
              changeOrigin: true,
              rewrite: path => path.replace(/^\/ws/, '')
            }
          },
    },

    plugins: [
        handlebarsPrecompile(),
    ]
})

