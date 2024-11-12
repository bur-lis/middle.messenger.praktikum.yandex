import './register.scss'

import register_template from "./register.hbs";
import { Block } from '../../core/block';
import { Props } from '../../core/type';
import { Router } from '../../core/my_router';
import { Button } from '../../components/button/button';
import { Linck } from '../../components/linck/linck';
import { FormDatatoConsole } from '../../core/utils'
import { mail_input, login_input, first_name_input, phone_input } from '../../core/repeating_blocks';
import { second_name_input, password_input, confirm_password_input } from '../../core/repeating_blocks';

const router = new Router('#app');

export class Register extends Block {
    constructor(props: Props) {
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
                click: () => FormDatatoConsole(this, 'register_form'),
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
