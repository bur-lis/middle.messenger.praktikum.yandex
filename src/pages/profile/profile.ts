import './profile.scss'
import profile_template from "./profile.hbs";

import {  Validate } from '../../core/utils'
import { Router } from '../../core/my_router';
// import { aside, user_logo, mail_input, login_input } from '../../core/repeating_blocks';
// import { first_name_input, second_name_input, phone_input } from '../../core/repeating_blocks';
import { InputBlock } from '../../components/input_block/input_block';
import { Button } from '../../components/button/button';
import { Input } from '../../components/input/input';
import { UserLogo } from '../../components/user_logo/user_logo';
import { Aside } from '../../components/aside/aside';

import { Block } from '../../core/block';
import { Props } from '../../core/type';
import store , {StoreEvents} from '../../core/store';
import { CurrentUser } from '../../controllers/user-controller';
import { connect } from '../../core/hos';

const router = new Router('#app');
const user_controller = new CurrentUser();


class Profile extends Block {
    constructor(props: Props) {
        // store.on(StoreEvents.Updated, () => {
        //     // вызываем обновление компонента, передав данные из хранилища
        //     this.setProps(store.getState());
        //       });
        let user;
        if (!store.getState().user.login) { user_controller.info() }
        user = store.getState().user;

        const user_logo = new UserLogo({
            display_name: user.display_name
        });


        const aside = new Aside({ open: false });

        const mail_input = new InputBlock({
            label: 'Почта',
            type: 'email',
            regtext: 'латиница, цифры, дефис, подчёркивания, обязательно "@.", но перед точкой должны быть буквы',
            regexp: '^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$', // eslint-disable-line
            display_error_label: 'none',
            input: new Input({
                name: 'email',
                required: 'required',
                value: user.email,
                events: {
                    blur: () => { Validate(mail_input) }
                }
            })
        });

        // const login_input = new InputBlock({
        //     label: 'Логин',
        //     regtext: '3-20 символов, латиница и цифры, без пробелов, без спецсимволов (только - или _ )',
        //     regexp: '(?:\s|^)[0-9A-Za-z\-\_]{3,20}(?:\s|$)',// eslint-disable-line
        //     display_error_label: 'none',
        //     input: new Input({
        //         name: 'login',
        //         required: 'required',
        //         value: user.login,
        //         events: {
        //             blur: () => { Validate(login_input) }
        //         }
        //     })
        // });

        // const first_name_input = new InputBlock({
        //     label: 'Фамилия',
        //     regtext: 'латиница или кириллица, первая буква заглавная, без пробелов, цифр, спецсимволов',
        //     regexp: '(?:\s|^)[A-ZА-Я]{1}[a-zа-я]+(?:\s|$)',// eslint-disable-line
        //     display_error_label: 'none',
        //     input: new Input({
        //         name: 'first_name',
        //         value: user.first_name,
        //         required: 'required',
        //         events: {
        //             blur: () => { Validate(first_name_input) }
        //         }
        //     })
        // });

        // const phone_input = new InputBlock({
        //     label: 'Телефон',
        //     regtext: '10-15 символов, состоит из цифр, может начинается с +',
        //     regexp: '^[+]?[0-9]{10,15}$',
        //     display_error_label: 'none',
        //     input: new Input({
        //         name: 'phone',
        //         type: 'phone',
        //         value: user.phone,
        //         required: 'required',
        //         events: {
        //             blur: () => { Validate(phone_input) }
        //         }
        //     })
        // });

        // const second_name_input = new InputBlock({
        //     label: 'Имя',
        //     regtext: 'латиница или кириллица, первая буква заглавная, без пробелов, цифр, спецсимволов',
        //     regexp: '(?:\s|^)[A-ZА-Я]{1}[a-zа-я]+(?:\s|$)', // eslint-disable-line
        //     display_error_label: 'none',
        //     input: new Input({
        //         name: 'second_name',
        //         required: 'required',
        //         value: user.second_name,
        //         events: {
        //             blur: () => { Validate(second_name_input) }
        //         }
        //     })
        // });

        // const display_name = new InputBlock({
        //     label: 'Имя в чате',
        //     display_error_label: 'none',
        //     input: new Input({
        //         name: 'display_name',
        //         value: user.email,
        //     })
        // });

        // const change_password_button = new Button({
        //     label: 'Изменить пароль',
        //     class: 'user-profile__button-block__button',
        //     events: {
        //         click: () => router.go('/change_password')
        //     },
        // });
        // const sign_out_button = new Button({
        //     label: 'Выйти',
        //     class: 'user-profile__button-block__button-red',
        //     events: {
        //         click: () => router.go('/')
        //     },
        // });
        // const save_button = new Button({
        //     label: 'Сохранить',
        //     class: 'user-profile__settings-form__button',
        //     type: 'submit',
        //     events: {
        //         click: () => { user_controller.edit_user(this) }
        //     },
        // });

        super('div', {
            ...props,
            aside,
            user,
            // save_button,
            // display_name,
            // change_password_button,
            // sign_out_button,
            user_logo,
            mail_input,
            // login_input,
            // first_name_input,
            // second_name_input,
            // phone_input
        });
        // aside.setProps({ open: false })
    }

    render() {
        return this.compile(profile_template, {
            aside: this.props.aside,
            user_logo: this.props.user_logo,
            mail_input: this.props.mail_input,
            // login_input: this.props.login_input,
            // first_name_input: this.props.first_name_input,
            // second_name_input: this.props.second_name_input,
            // display_name: this.props.display_name,
            // phone_input: this.props.phone_input,
            // save_button: this.props.save_button,
            // change_password_button: this.props.change_password_button,
            // sign_out_button: this.props.sign_out_button
        });
    };
}


export default connect(Profile, (state) => ({ user: state.user })); 