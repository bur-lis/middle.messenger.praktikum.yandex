import './profile.scss'

import { renderDom, FormDatatoConsole } from '../../core/utils'
import { aside, user_logo, mail_input, login_input } from '../../core/repeating_blocks';
import { first_name_input, second_name_input, phone_input } from '../../core/repeating_blocks';
import { InputBlock } from '../../components/input_block/input_block';
import { Button } from '../../components/button/button';
import { Input } from '../../components/input/input';
import { Block, Props } from '../../core/block';
import profile_template from "./profile.hbs";

export class Profile extends Block {
    constructor(props: Props) {
        const save_button = new Button({
            label: 'Сохранить',
            class: 'user-profile__settings-form__button',
            type: 'submit',
            events: {
                click: () => FormDatatoConsole(this)
            },
        });

        super('div', { ...props, save_button });
        aside.setProps({ open: false })
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
            save_button: this.props.save_button,
            change_password_button: this.props.change_password_button,
            sign_out_button: this.props.sign_out_button
        });
    };
}

const display_name = new InputBlock({
    label: 'Имя в чате',
    display_error_label: 'none',
    input: new Input({
        name: 'display_name',
    })
});



const change_password_button = new Button({
    label: 'Изменить пароль',
    class: 'user-profile__button-block__button',
    events: {
        click: () => {
            location.href = '../change_password/change_password.html'
        },
    },
});
const sign_out_button = new Button({
    label: 'Выйти',
    class: 'user-profile__button-block__button-red',
    events: {
        click: () => {
            location.href = '../../../index.html'
        },
    },
});

const profile_page = new Profile({
    aside: aside,
    user_logo: user_logo,
    mail_input: mail_input,
    login_input: login_input,
    first_name_input: first_name_input,
    second_name_input: second_name_input,
    display_name: display_name,
    phone_input: phone_input,
    change_password_button: change_password_button,
    sign_out_button: sign_out_button
});



renderDom("#app", profile_page);


