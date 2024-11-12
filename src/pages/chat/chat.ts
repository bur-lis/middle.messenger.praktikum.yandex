import './chat.scss'
import { FormDatatoConsole } from '../../core/utils'
import { aside } from '../../core/repeating_blocks';
import { Button } from '../../components/button/button';

import { Block } from '../../core/block';
import { Props } from '../../core/type';
import chat_template from "./chat.hbs";

export class Chat extends Block {
    constructor(props: Props) {
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

        const send_message_button = new Button({
            class: 'send-block__send-button',
            label: '➔',
            type: 'submit',
            events: {
                click: () => FormDatatoConsole(this, 'send_message_form')
            },
        });
        super('div', {
            ...props,
            send_message_button,
            aside,
            message_menu_button,
            attach_file_button
        });
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



