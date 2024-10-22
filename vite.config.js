import { defineConfig } from 'vite'
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                register: resolve(__dirname, 'src/pages/register.html'),
                authorization: resolve(__dirname, 'src/pages/authorization.html'),
                change_password: resolve(__dirname, 'src/pages/change_password.html'),
                chat: resolve(__dirname, 'src/pages/chat.html'),
                client_errors: resolve(__dirname, 'src/pages/client_errors.html'),
                profile: resolve(__dirname, 'src/pages/profile.html'),
                server_errors: resolve(__dirname, 'src/pages/server_errors.html'),
            },
        },
    },server: {
        port: 3000,
        open: true
    },
    plugins: [
        handlebars({
            partialDirectory: [resolve(__dirname, 'src/components')],
            context: {
                chats: {
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
                    7: {
                        name: 'Day.',
                        message: 'Так увлёкся работой по курсу, что совсем забыл его анонсир...',
                        new_count: 0,
                        time: '1 Мая 2020'

                    }
                },
                login_people: {
                    mail: 'pochta@yandex.ru',
                    login: 'user',
                    first_name: 'First_name',
                    second_name: 'Second_name',
                    display_name: 'Елена',
                    phone: '8(911)0735529',
                    password: '12345678',
                    confirm_password: '123456789'


                },
                message: {
                    '14 июня': [{
                        output: false,
                        message: 'Равным образом постоянный количественный рост и сфера нашей активности  представляет собой интересный эксперимент проверки дальнейших  направлений развития.'
                        ,
                        time: '12:34'
                    }],
                    '19 июня': [{
                        output: true,
                        message: 'Значимость этих проблем настолько очевидна, что постоянное  информационно-пропагандистское обеспечение нашей деятельности  обеспечивает широкому кругу (специалистов) участие в формировании модели развития.        Значимость этих проблем настолько очевидна, что постоянный  количественный рост и сфера нашей активности играет важную роль в  формировании форм развития.'
                        ,
                        time: '11:09'
                    }, {
                        output: false,
                        message: 'Идейные соображения высшего порядка, а также начало повседневной  работы по формированию позиции позволяет оценить значение дальнейших  направлений развития.        '
                        ,
                        time: '11:50'
                    }, {
                        output: true,
                        message: 'Разнообразный и богатый опыт консультация с широким активом в  значительной степени обуславливает создание направлений прогрессивного  развития.'
                        ,
                        time: '11:58'
                    }, {
                        output: false,
                        message: 'Круто!',
                        time: '11:59'
                    }],
                },
            },
        })],
})
