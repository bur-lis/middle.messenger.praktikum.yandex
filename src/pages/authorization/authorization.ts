import './authorization.scss'
import '/style.scss'

import { renderDom } from '../../utils'
import { InputBlock } from '../../components/input_block/input_block';
import { Button } from '../../components/button/button';
import { Block, Props } from '../../block';
import authorization_template from "./authorization.hbs";

export class Authorization extends Block {
    constructor(props: Props) {
        super('div', props);
    }

    render() {
        return this.compile(authorization_template, {
            button: this.props.button,
            login_input: this.props.login_input,
            password_input: this.props.password_input
        });
    };
}

const login_input = new InputBlock({
    label: 'Логин',
    name: 'login',
    require: 'require',
    events: {
        click: (event: Event) => {
            console.log(event);
        },
    },
});

const password_input = new InputBlock({
    label: 'Пароль',
    name: 'password',
    type: 'password',
    events: {
        click: (event: Event) => {
            console.log(event);
        },
    },
});

const button = new Button({
    label: 'Войти',
    class: 'middle-panel__button',
    type: 'submit',
    events: {
        click: (event: Event) => {
            console.log(event);            
            console.log(this);
        },
    },
});

const authorization_page = new Authorization({
    button: button,
    login_input: login_input,
    password_input: password_input
});

renderDom("#app", authorization_page);

// Через секунду контент изменится сам, достаточно обновить пропсы
// setTimeout(() => {
//   button.setProps({
//     label: 'Click me, please',
//   });
// }, 1000);

