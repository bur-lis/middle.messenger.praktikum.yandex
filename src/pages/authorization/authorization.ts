import './authorization.scss'
import authorization_template from "./authorization.hbs";
import auth_controller from "../../controllers/auth_controller"

import { Block } from '../../core/block';
import { Props } from '../../core/type';
import { Router } from '../../core/my_router';

import { InputBlock } from '../../components/input_block/input_block';
import { Input } from '../../components/input/input';
import { Button } from '../../components/button/button';
import { Linck } from '../../components/linck/linck';
import { Validate } from '../../core/utils';

const router = new Router('#app');

export class Authorization extends Block {
    constructor(props: Props) {
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
        const register_linck = new Linck({
            text_linck: 'Нет аккаунта?',
            class: 'middle-panel__linck',
            events: {
                click: () => router.go('/register')
            },
        });

        const button = new Button({
            label: 'Войти',
            class: 'middle-panel__button',
            type: 'submit',
            events: {
                click: () => { auth_controller.login(this) }
            },
        });

        super('div', {
            ...props,
            button,
            login_input,
            password_input,
            register_linck
        });
    }

    render() {
        return this.compile(authorization_template, {
            button: this.props.button,
            login_input: this.props.login_input,
            password_input: this.props.password_input
        });
    };
}


