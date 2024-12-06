import './profile.scss'
import profile_template from "./profile.hbs";

import { Validate } from '../../core/utils'
import { Router } from '../../core/router/my_router';
import { InputBlock } from '../../components/input_block/input_block';
import { Button } from '../../components/button/button';
import { Input } from '../../components/input/input';
import UserLogo from '../../components/user_logo/user_logo';
import Aside from '../../components/aside/aside';

import { Block } from '../../core/block/block';
import { Props } from '../../core/type';
import current_user from '../../controllers/user-controller';
import auth_controller from '../../controllers/auth_controller';
import { connect } from '../../core/hos';

const router = new Router('#app');


const mail_input = new InputBlock({
    label: 'Почта',
    type: 'email',
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

const display_name = new InputBlock({
    label: 'Имя в чате',
    display_error_label: 'none',
    input: new Input({
        name: 'display_name',
    })
});

class Profile extends Block {
    constructor(tag: string,props: Props) {
        const user_logo = new UserLogo({});
        const aside = new Aside({ open: false });
        const change_password_button = new Button({
            label: 'Изменить пароль',
            class: 'user-profile__button-block__button',
            events: {
                click: () => router.go('/change_password')
            },
        });
        const sign_out_button = new Button({
            label: 'Выйти',
            class: 'user-profile__button-block__button-red',
            events: {
                click: () => auth_controller.logout()
            },
        });
        const save_button = new Button({
            label: 'Сохранить',
            class: 'user-profile__settings-form__button',
            type: 'submit',
            events: {
                click: () => { current_user.edit_user(this); current_user.edit_avatar(); }
            },
        });

        super(tag, {
            ...props,
            aside,
            save_button,
            change_password_button,
            sign_out_button,
            user_logo,
            first_name_input,
            mail_input,
            login_input,
            second_name_input,
            phone_input,
            display_name

        });
    }

    render() {
        return this.compile(profile_template, {
            aside: this.props.aside,
            user_logo: this.props.user_logo,
            mail_input: this.props.mail_input,
            login_input: this.props.login_input,
            first_name_input: this.props.first_name_input,
            second_name_input: this.props.second_name_input,
            display_name: this.props.display_name,
            phone_input: this.props.phone_input,
        });
    };
}


export default connect('div', Profile, My_Function);

function My_Function(state: Record<string, Props>) {
    const user = state.user;

    mail_input.children.input.setProps({ value: user.email })
    login_input.children.input.setProps({ value: user.login })
    first_name_input.children.input.setProps({ value: user.first_name })
    second_name_input.children.input.setProps({ value: user.second_name })
    display_name.children.input.setProps({ value: user.display_name })
    phone_input.children.input.setProps({ value: user.phone})
    return {}
}

