import './chats.scss'
import chat_template from "./chats.hbs";
import chats_controller from '../../controllers/chats-controller';
import meddage_controller from '../../controllers/messages-controller';
import { AddUser } from './moduls/add_user/add_user';
import { Button } from '../../components/button/button';
import Aside from '../../components/aside/aside';

import { Block } from '../../core/block';
import { Props } from '../../core/type';
import { connect } from '../../core/hos';

class Chats extends Block {
    constructor(tag: string, props: Props) {
        const message_menu_button = new Button({
            img: {
                src: '/menu-dots-vertical.svg',
                alt: 'Меню чата'
            },
            class: 'message-header__menu-button'
        })
        const add_user_button = new Button({
            // class: 'message-header__menu-button',
            label: ' выбрать собеседника',
            events: {
                click: () => add_user_panel.show()
            }
        
        })

        const add_user_panel = new AddUser({});
        const aside = new Aside({ open: true })

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
                click: () => console.log(this, 'send_message_form')
            },
        });

        super(tag, {
            ...props,
            send_message_button,
            add_user_panel,
            aside,
            message_menu_button,
            add_user_button,
            attach_file_button
        });
        add_user_panel.hide();
    }

    render() {
        return this.compile(chat_template, {
            aside: this.props.aside,
            user: this.props.user,
            selected_chat: this.props.selected_chat,
            message: this.props.message,
            message_menu_button: this.props.message_menu_button,
            attach_file_button: this.props.attach_file_button,
            send_message_button: this.props.send_message_button
        });
    };
}

export default connect('div', Chats, MyFunction);

function MyFunction(state: Props) {
    const selected_chat = state.selected_chat;
    if (selected_chat && selected_chat.user) meddage_controller.connect()
    return { user: state.user, selected_chat: selected_chat }
}

