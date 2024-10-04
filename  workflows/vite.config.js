import { defineConfig } from 'vite'
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
    plugins: [handlebars({
        partialDirectory: resolve(__dirname, 'partials'),
        context: {

            login_name: 'Hello, world!',
            title: 'Hello, world!',
            name_people: {
                0: 'kfjkadsf',
                1:'fdighdoifrgh'
            },
            register_people: {
                mail: 'pochta@yandex.ru',
                login:'first_user',
                first_name: 'first_name',
                second_name:'second_name',
                phone:'8(911)0735529',
                password:'12345678',
                confirm_password:'123456789'


            }
        },
    })],
}) 