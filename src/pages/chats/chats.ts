import './chats.scss'
import chat_template from "./chats.hbs";
import { FormDatatoConsole } from '../../core/utils'
import { CurrentUser } from '../../controllers/user-controller';
// import { aside } from '../../core/repeating_blocks';
import { Button } from '../../components/button/button';
import { Aside } from '../../components/aside/aside';

import { Block } from '../../core/block';
import { Props } from '../../core/type';

import store, { StoreEvents } from '../../core/store';
const user_controller = new CurrentUser();
// const store = new Store();

export class Chats extends Block {
    constructor(props: Props) {
        const message_menu_button = new Button({
            img: {
                src: '/menu-dots-vertical.svg',
                alt: 'Меню чата'
            },
            class: 'message-header__menu-button'
        })
        store.on(StoreEvents.Updated, () => {
            // вызываем обновление компонента, передав данные из хранилища
            this.setProps(store.getState());
              });
              
              user_controller.info();
        // const user = store.getState();
        // console.log(user);
     const aside = new Aside({
            display_name: 'Елена',
            second_name: 'Second_name',
            first_name: 'First_name',
            chats: '',
            open: true,
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

        

    //        // запрашиваем данные у контроллера
    //        UserController.getUser();

    //        // подписываемся на событие
    //    store.on(StoreEvents.Updated, () => {
    //      // вызываем обновление компонента, передав данные из хранилища
    //      this.setProps(store.getState());
    //        });


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



