import './chat.scss'
import { renderDom, FormDatatoConsole } from '../../core/utils'
import { aside } from '../../core/repeating_blocks';
import { Button } from '../../components/button/button';

import { Block } from '../../core/block';
import { Props } from '../../core/type';
import chat_template from "./chat.hbs";

export class Chat extends Block {
    constructor(props: Props) {
        const send_message_button = new Button({
            class: 'send-block__send-button',
            label: '➔',
            type:'submit',
            events: {
                click: () => FormDatatoConsole(this,'send_message_form')
            },
        });
        super('div', { ...props, send_message_button });
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


const message_menu_button = new Button({
    img: {
        src: '/menu-dots-vertical.svg',
        alt: 'Меню чата'
    },
    class: 'message-header__menu-button'
})

const attach_file_button = new Button({
    img: {
        src: '/attach-file.svg', 
        alt: 'Прикрепить вложение к сообщению'
    },
    class: 'send-block__attach-file'
})



const chat_page = new Chat({
    aside: aside,
    display_name: 'Вадим',
    message_menu_button: message_menu_button,
    attach_file_button: attach_file_button,
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

