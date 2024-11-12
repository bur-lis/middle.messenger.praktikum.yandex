import './authorization.scss'

import { FormDatatoConsole } from '../../core/utils'
import { Router } from '../../core/my_router';
import { Button } from '../../components/button/button';
import { Linck } from '../../components/linck/linck';
import { password_input, login_input } from '../../core/repeating_blocks';

import { Block } from '../../core/block';
import { Props } from '../../core/type';
import authorization_template from "./authorization.hbs";
const router = new Router('#app');
 export class Authorization extends Block {
  
    constructor(props: Props) {
        const register_linck = new Linck({
            text_linck: 'Нет аккаунта?',
            class:'middle-panel__linck',
            events: {
                click: () => router.go('/register')
            },
        });
        const button = new Button({
            label: 'Войти',
            class: 'middle-panel__button',
            type: 'submit',
            events: {
                click: () => FormDatatoConsole(this,'authorization_form')
            },
        });
        super('div', { ...props, 
            button,
            login_input,
            password_input,
            register_linck });
    }

    render() {
        return this.compile(authorization_template, {
            button: this.props.button,
            login_input: this.props.login_input,
            password_input: this.props.password_input
        });
    };
}


