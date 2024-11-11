import './authorization.scss'
import '/style.scss'

import { FormDatatoConsole } from '../../core/utils'
import { Button } from '../../components/button/button';
import { password_input, login_input } from '../../core/repeating_blocks';

import { Block } from '../../core/block';
import { Props } from '../../core/type';
import authorization_template from "./authorization.hbs";

 export class Authorization extends Block {
    constructor(props: Props) {
        const button = new Button({
            label: 'Войти',
            class: 'middle-panel__button',
            type: 'submit',
            events: {
                click: () => FormDatatoConsole(this,'authorization_form')
            },
        });
        super('div', { ...props, button,login_input,password_input });
    }

    render() {
        return this.compile(authorization_template, {
            button: this.props.button,
            login_input: this.props.login_input,
            password_input: this.props.password_input
        });
    };
}


