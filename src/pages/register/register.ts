import './register.scss'
import { renderDom } from '../../utils'
import { InputBlock } from '../../components/input_block/input_block';
import { Button } from '../../components/button/button';
import { Block, Props } from '../../block';
import register_template from "./register.hbs";

export class Register extends Block {
    constructor(props: Props) {
        super('div', props);
    }

    render() {
        return this.compile(register_template, {
            button: this.props.button,
            mail_input: this.props.mail_input,
            login_input: this.props.login_input,
            first_name_input: this.props.first_name_input,
            second_name_input: this.props.second_name_input,
            phone_input: this.props.phone_input,
            password_input: this.props.password_input,
            confirm_password_input: this.props.confirm_password_input,
        });
    };
}

const mail_input = new InputBlock({
    label: 'Почта',
    name: 'email',
    require: 'require',
    events: {
        click: (event: Event) => {
            console.log(event);
        },
    },
});

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

const first_name_input = new InputBlock({
    label: 'Фамилия',
    name: 'first_name',
    require: 'require',
    events: {
        click: (event: Event) => {
            console.log(event);
        },
    },
});
const phone_input = new InputBlock({
    label: 'Телефон',
    name: 'phone_name',
    tupe: 'phone',
    require: 'require',
    events: {
        click: (event: Event) => {
            console.log(event);
        },
    },
});

const second_name_input = new InputBlock({
    label: 'Имя',
    name: 'second_name',
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
const confirm_password_input = new InputBlock({
    label: 'Пароль(ещё раз)',
    name: 'confirm_password',
    type: 'password',
    events: {
        click: (event: Event) => {
            console.log(event);
        },
    },
});

const button = new Button({
    label: 'Зарегистрироваться',
    class: 'middle-panel__button',
    type: 'submit',
    events: {
        click: (event: Event) => {
            console.log(event);
            location.href = '../autorisation/autorisation.html';
        },
    },
});

const register_page = new Register({
    mail_input: mail_input,
    login_input: login_input,
    first_name_input: first_name_input,
    second_name_input: second_name_input,
    phone_input: phone_input,
    password_input: password_input,
    confirm_password_input: confirm_password_input,
    button: button,
});



renderDom("#app", register_page);


