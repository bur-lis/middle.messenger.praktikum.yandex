import './register.scss'
import register_template from "./register.hbs";
import auth_controller from "../../controllers/auth_controller"

import { Block } from '../../core/block';
import { Props } from '../../core/type';
import { Router } from '../../core/my_router';

import { Button } from '../../components/button/button';
import { Linck } from '../../components/linck/linck';
import { InputBlock } from '../../components/input_block/input_block';
import { Input } from '../../components/input/input';
import { Validate } from '../../core/utils';

const router = new Router('#app');

export class Register extends Block {
    constructor(props: Props) {

        const mail_input = new InputBlock({
            label: 'Почта',
            type:'email',
            regtext: 'латиница, цифры, дефис, подчёркивания, обязательно "@.", но перед точкой должны быть буквы',
            regexp: '^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$', // eslint-disable-line
            display_error_label: 'none',
            input: new Input({
                name: 'email',
                required: 'required',
                events: {
                    blur: () => { Validate(mail_input) }
                }
            })
        });
        
        const login_input = new InputBlock({
            label: 'Логин',
            regtext: '3-20 символов, латиница и цифры, без пробелов, без спецсимволов (только - или _ )',
            regexp: '(?:\s|^)[0-9A-Za-z\-\_]{3,20}(?:\s|$)',// eslint-disable-line
            display_error_label: 'none',
            input: new Input({
                name: 'login',
                required: 'required',
                events: {
                    blur: () => { Validate(login_input) }
                }
            })
        });
        
        const first_name_input = new InputBlock({
            label: 'Фамилия',
            regtext: 'латиница или кириллица, первая буква заглавная, без пробелов, цифр, спецсимволов',
            regexp: '(?:\s|^)[A-ZА-Я]{1}[a-zа-я]+(?:\s|$)',// eslint-disable-line
            display_error_label: 'none',
            input: new Input({
                name: 'first_name',
                required: 'required',
                events: {
                    blur: () => { Validate(first_name_input) }
                }
            })
        });
        const phone_input = new InputBlock({
            label: 'Телефон',
            regtext: '10-15 символов, состоит из цифр, может начинается с +',
            regexp: '^[+]?[0-9]{10,15}$',
            display_error_label: 'none',
            input: new Input({
                name: 'phone',
                type: 'phone',
                required: 'required',
                events: {
                    blur: () => { Validate(phone_input) }
                }
            })
        });
        
        const second_name_input = new InputBlock({
            label: 'Имя',
            regtext: 'латиница или кириллица, первая буква заглавная, без пробелов, цифр, спецсимволов',
            regexp: '(?:\s|^)[A-ZА-Я]{1}[a-zа-я]+(?:\s|$)', // eslint-disable-line
            display_error_label: 'none',
            input: new Input({
                name: 'second_name',
                required: 'required',
                events: {
                    blur: () => { Validate(second_name_input) }
                }
            })
        });
        
        const password_input = new InputBlock({
            label: 'Пароль',
            regtext: '8-40 символов, обязательно хотя бы одна заглавная буква и цифра',
            regexp: '^(?=.*[0-9])(?=.*[A-ZА-Я])[0-9a-zA-ZА-Яа-я]{8,40}$',
            display_error_label: 'none',
            input: new Input({
                name: 'password',
                type: 'password',
                required: 'required',
                events: {
                    blur: () => { Validate(password_input) }
                }
            })
        });
        const confirm_password_input = new InputBlock({
            label: 'Пароль(ещё раз)',
            regtext: 'Пароль не соответсвует требованием',
            regexp: '^(?=.*[0-9])(?=.*[A-ZА-Я])[0-9a-zA-ZА-Яа-я]{8,40}$',
            display_error_label: 'none',
            input: new Input({
                name: 'confirm_password',
                type: 'password',
                required: 'required',
                events: {
                    blur: () => { Validate(confirm_password_input) }
                }
            })
        });

        const authorization_lick = new Linck({
            text_linck: 'Войти',
            class: 'middle-panel__linck',
            events: {
                click: () => router.go('/authorization')
            },
        });

        const button = new Button({
            label: 'Зарегистрироваться',
            class: 'middle-panel__button',
            type: 'submit',
            events: {
                click: () => auth_controller.registr(this),
            },
        });
        
        super('div', {
            ...props,
            authorization_lick,
            button,
            mail_input,
            login_input,
            first_name_input,
            phone_input,
            second_name_input,
            password_input,
            confirm_password_input
        });
    }

    render() {
        return this.compile(register_template, {
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
