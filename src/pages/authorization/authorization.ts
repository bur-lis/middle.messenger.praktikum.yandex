import './authorization.scss'
import '/style.scss'

import { renderDom, Validate } from '../../utils'
import { InputBlock } from '../../components/input_block/input_block';
import { Button } from '../../components/button/button';
import { Input } from '../../components/input/input';
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
    regtext: '2222',
    display_error_label: 'none',
    input: new Input({
        name: 'login',
        events: {
            blur: () => { Validate(login_input, 'fdhgdirfhg') }
        }
    })

});

const password_input = new InputBlock({
    label: 'Пароль',
    regtext: '2222',
    display_error_label: 'none',
    input: new Input({
        name: 'password',
        type: 'password',
        events: {
            blur: () => { Validate(password_input, 'dsgsdg') }
        }
    })
});

const button = new Button({
    label: 'Войти',
    class: 'middle-panel__button',
    type: 'submit',
    events: {
        click: () => {
            const form = document.getElementsByTagName('form')[0];
            const formData = new FormData(form);
            console.log(formData);
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

