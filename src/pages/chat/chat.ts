import './chat.scss'
import { renderDom } from '../../utils'
import { Aside } from '../../components/aside/aside';
import { Button } from '../../components/button/button';
import { Block, Props } from '../../block';
import chat_template from "./chat.hbs";

export class Chat extends Block {
    constructor(props: Props) {
        super('div', props);
    }

    render() {
        return this.compile(chat_template, {
            aside: this.props.aside,
            display_name: this.props.display_name,
            message: this.props.message,
            message_menu_button: this.props.message_menu_button,
            attach_file_button: this.props.attach_file_button,
            send_message_button: this.props.send_message_button
        });
    };
}

const aside = new Aside({
    display_name: 'Елена',
    second_name: 'Second_name',
    first_name: 'First_name',
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
    open: true,
})

const message_menu_button = new Button({
    img: {
        src: '/public/menu-dots-vertical.svg',
        alt: 'Меню чата'
    },
    class: 'message-header__menu-button'
})

const attach_file_button = new Button({
    img: {
        src: '/public/attach-file.svg',
        alt: 'Прикрепить вложение к сообщению'
    },
    class: 'send-block__attach-file'
})

const send_message_button = new Button({
    class: 'send-block__send-button',
    label: '➔',
    events: {
        click: (event: Event) => {
            console.log(event);
        },
    }
})

const chat_page = new Chat({
    aside: aside,
    display_name: 'Вадим',
    message_menu_button: message_menu_button,
    attach_file_button: attach_file_button,
    send_message_button: send_message_button,
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
});



renderDom("#app", chat_page);


