import './register.scss'

import register_template from "./register.hbs";
import { Block } from '../../core/block';
import { Props } from '../../core/type';
import { Button } from '../../components/button/button';
import { renderDom, FormDatatoConsole } from '../../core/utils'
import { mail_input, login_input, first_name_input, phone_input } from '../../core/repeating_blocks';
import { second_name_input, password_input, confirm_password_input } from '../../core/repeating_blocks';

export class Register extends Block {
    constructor(props: Props) {

        const button = new Button({
            label: 'Зарегистрироваться',
            class: 'middle-panel__button',
            type: 'submit',
            events: {
                click: () => FormDatatoConsole(this, 'register_form'),
            },
        });
        super('div', {...props,button});
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


const register_page = new Register({
    mail_input: mail_input,
    login_input: login_input,
    first_name_input: first_name_input,
    second_name_input: second_name_input,
    phone_input: phone_input,
    password_input: password_input,
    confirm_password_input: confirm_password_input,
});



renderDom("#app", register_page);

