import './chats.scss'
import chat_template from "./chats.hbs";
import { FormDatatoConsole } from '../../core/utils'
import { CurrentUser } from '../../controllers/user-controller';
import { Button } from '../../components/button/button';
import { Aside } from '../../components/aside/aside';

import { Block } from '../../core/block';
import { Props } from '../../core/type';
import { connect } from '../../core/hos';

const user_controller = new CurrentUser();

class Chats extends Block {
    constructor(props: Props) {
        user_controller.info();

        const message_menu_button = new Button({
            img: {
                src: '/menu-dots-vertical.svg',
                alt: 'Меню чата'
            },
            class: 'message-header__menu-button'
        })

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
            user: this.props.user,
            display_name: this.props.display_name,
            message: this.props.message,
            message_menu_button: this.props.message_menu_button,
            attach_file_button: this.props.attach_file_button,
            send_message_button: this.props.send_message_button
        });
    };
}

export default connect(Chats, (state) => ({ user: state.user })); 

