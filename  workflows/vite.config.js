import { defineConfig } from 'vite'
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
    plugins: [handlebars({
        partialDirectory: resolve(__dirname, 'partials'),
        context: {

            login_name: 'Hello, world!',
            title: 'Hello, world!',
            message: {
                0: {
                    name: 'Андрей',
                    message: 'Изображение',
                    new_count: 2,
                    time: '10:49'
                },
                1: {
                    name: 'Киноклуб',
                    message: 'стикер',
                    new_count: 4,
                    time: '12:00',
                    output: true
                },
                2: {
                    name: 'Илья',
                    message: 'Друзья, у меня для вас особенный выпуск новостей!...',
                    new_count: 0,
                    time: '15:12'
                },
                3: {
                    name: 'Вадим',
                    message: 'Круто!',
                    new_count: 0,
                    time: 'Пт',
                    output: true
                },
                4: {
                    name: 'тет-а-теты',
                    message: 'И Human Interface Guidelines и Material Design рекомендуют...',
                    new_count: 0,
                    time: 'Ср'
                },
                5: {
                    name: '1,2,3',
                    message: 'Миллионы россиян ежедневно проводят десятки часов свое...',
                    new_count: 0,
                    time: 'Пн'
                },
                6: {
                    name: 'Design Destroyer',
                    message: 'В 2008 году художник Jon Rafman  начал собирать...',
                    new_count: 0,
                    time: 'Пн'
                },
                7:{name: 'Day.',
                    message: 'Так увлёкся работой по курсу, что совсем забыл его анонсир...',
                    new_count: 0,
                    time: '1 Мая 2020'

                }
            },
            login_people: {
                mail: 'pochta@yandex.ru',
                login: 'first_user',
                first_name: 'first_name',
                second_name: 'second_name',
                phone: '8(911)0735529',
                password: '12345678',
                confirm_password: '123456789'


            }
        },
    })],
}) 