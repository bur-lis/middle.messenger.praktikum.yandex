import './change_password.scss'

import { Validate } from '../../core/utils'
import { InputBlock } from '../../components/input_block/input_block';
import { Button } from '../../components/button/button';
import { Input } from '../../components/input/input';
import { Linck } from '../../components/linck/linck';
import Aside from '../../components/aside/aside';
import UserLogo from '../../components/user_logo/user_logo';

import { Block } from '../../core/block';
import { Props } from '../../core/type';
import change_password_template from "./change_password.hbs";
import { Router } from '../../core/my_router';
import current_user from '../../controllers/user-controller';
const router = new Router('#app');

export class ChangePassword extends Block {
    constructor(props: Props) {
        const user_logo = new UserLogo({});
        const aside = new Aside({ open: false });

        const confirm_new_password_input = new InputBlock({
            label: 'Пароль(ещё раз)',
            regtext: 'Пароль не соответсвует требованием',
            regexp: '^(?=.*[0-9])(?=.*[A-ZА-Я])[0-9a-zA-ZА-Яа-я]{8,40}$',
            display_error_label: 'none',
            input: new Input({
                name: 'confirm_password',
                type: 'password',
                required: 'required',
                events: {
                    blur: () => { Validate(confirm_new_password_input) }
                }
            })
        });

        const new_password_input = new InputBlock({
            label: 'Новый пароль',
            regtext: '8-40 символов, обязательно хотя бы одна заглавная буква и цифра',
            regexp: '^(?=.*[0-9])(?=.*[A-ZА-Я])[0-9a-zA-ZА-Яа-я]{8,40}$',
            display_error_label: 'none',
            input: new Input({
                name: 'newPassword',
                type: 'password',
                required: 'required',
                events: {
                    blur: () => { Validate(new_password_input) }
                }
            })
        });

        const old_password_input = new InputBlock({
            label: 'Старый пароль',
            display_error_label: 'none',
            input: new Input({
                name: 'oldPassword',
                type: 'password',
                required: 'required',
            })
        });

        const save_button = new Button({
            label: 'Сохранить',
            class: 'change-password__save-button',
            type: 'submit',
            events: {
                click: () => current_user.edit_password(this),
            },
        });

        const back_linck = new Linck({
            text_linck: 'Вернуться в профиль',
            class: 'change-password__back-linck',
            events: {
                click: () => router.go('/profile')
            },
        });

        super('div', {
            ...props,
            aside,
            save_button,
            old_password_input,
            new_password_input,
            confirm_new_password_input,
            user_logo,
            back_linck
        });
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





