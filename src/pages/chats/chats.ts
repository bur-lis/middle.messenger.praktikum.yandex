import './chats.scss'
import chat_template from "./chats.hbs";
import { AddUser } from './moduls/add_user/add_user';
import { Button } from '../../components/button/button';
import Aside from '../../components/aside/aside';
import { GetJsonDataFromForm } from '../../core/utils';
import { Block } from '../../core/block/block';
import { Props } from '../../core/type';
import { connect } from '../../core/hos';
import chats_controller from '../../controllers/chats-controller';
import messages_controller from '../../controllers/messages-controller';
import { Textarea } from '../../components/textarea/textarea';

class Chats extends Block {
    constructor(tag: string, props: Props) {
        const delete_chat_button = new Button({
            label:'Удалить чат',
            class: 'message-header__menu-button',
            events: {
                click: () => { chats_controller.delete_chat() }
            }
        })
        const delete_user_button = new Button({
            label:'Удалить собеседника',
            class: 'message-header__menu-button',
            events: {
                click: () => { chats_controller.delete_user() }
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

        const message_textarea = new Textarea({
            class: 'send-block__writing-textarea',
            name: 'message',
            placeholder: 'Сообщение',
            required: 'required'
        })

        const send_message_button = new Button({
            class: 'send-block__send-button',
            label: '➔',
            type: 'submit',
            events: {
                click: () => {
                    messages_controller.send(GetJsonDataFromForm('send_message_form').message);
                    message_textarea.props.value = '';
                }
            },
        });

        super(tag, {
            ...props,
            send_message_button,
            add_user_panel,
            aside,
            delete_chat_button,
            delete_user_button,
            attach_file_button,
            message_textarea
        });
    }

    render() {
        return this.compile(chat_template, {
            aside: this.props.aside,
            selected_chat: this.props.selected_chat,
            message: this.props.message,
            delete_chat_button: this.props.delete_chat_button,
            attach_file_button: this.props.attach_file_button,
            message_textarea: this.props.message_textarea,
            send_message_button: this.props.send_message_button
        });
    };
}

export default connect('div', Chats, MyFunction);

function MyFunction(state: Props) {
    setTimeout(() => {
        const history_list = document.getElementById("history-list");
        if (history_list) {history_list!.scrollTop = history_list!.scrollHeight;
        };
    }, 0.1);


    return { selected_chat: state.selected_chat, message: state.message }
}

