import './change_password.scss'

import { FormDatatoConsole } from '../../core/utils'
import { InputBlock } from '../../components/input_block/input_block';
import { Button } from '../../components/button/button';
import { Input } from '../../components/input/input';

import { Block } from '../../core/block';
import { Props } from '../../core/type';
import { password_input, confirm_password_input, aside, user_logo } from '../../core/repeating_blocks';
import change_password_template from "./change_password.hbs";
import { Router } from '../../core/my_router';
const router = new Router('#app');

export class ChangePassword extends Block {
    constructor(props: Props) {
        const old_password_input = new InputBlock({
            label: 'Старый пароль',
            display_error_label: 'none',
            input: new Input({
                name: 'old_password',
                type: 'password',
                required: 'required',
            })
        });
        const save_button = new Button({
            label: 'Сохранить',
            class: 'change-password__save-button',
            type: 'submit',
            events: {
                click: () => FormDatatoConsole(this, 'change_password_form'),
            },
        });
        super('div', {
            ...props,
            save_button,
            old_password_input,
            password_input,
            confirm_password_input,
            user_logo
        });
        aside.setProps({ open: false })
    }

    render() {
        return this.compile(change_password_template, {
            aside: this.props.aside,
            user_logo: this.props.user_logo,
            old_password_input: this.props.old_password_input,
            new_password_input: this.props.new_password_input,
            confirm_new_password_input: this.props.confirm_new_password_input,
            save_button: this.props.save_button,
        });
    };
}





