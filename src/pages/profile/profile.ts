import './profile.scss'
import { renderDom , Validate} from '../../utils'
import { InputBlock } from '../../components/input_block/input_block';
import { Button } from '../../components/button/button';
import { Input } from '../../components/input/input';
import { UserLogo } from '../../components/user_logo/user_logo';
import { Aside } from '../../components/aside/aside';
import { Block, Props } from '../../block';
import profile_template from "./profile.hbs";
export class Profile extends Block {
    constructor(props: Props) {
        super('div', props);
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
const user_logo = new UserLogo({
    display_name: 'Елена'
})
const aside = new Aside({
    display_name: 'Елена',
        second_name: 'Second_name',
        first_name:'First_name',
        chats: '',
        open: false,
})
const mail_input = new InputBlock({
    label: 'Почта',
    regtext: '2222',
    display_error_label: 'none',
    input: new Input({
        name: 'email',
        events: {
            blur: () => { Validate(mail_input, 'fdhgdirfhg') }
        }
    })
});

const login_input = new InputBlock({
    label: 'Логин',
    regtext: '2222',
    display_error_label: 'none',
    input: new Input({
        name: 'login',
        events: {
            blur: () => { Validate(login_input, 'fdhgdirfhg') }
        }
    })
});

const first_name_input = new InputBlock({
    label: 'Фамилия',
    regtext: '2222',
    display_error_label: 'none',
    input: new Input({
        name: 'first_name',
        events: {
            blur: () => { Validate(first_name_input, 'fdhgdirfhg') }
        }
    })
});
const phone_input = new InputBlock({
    label: 'Телефон',
    regtext: '2222',
    display_error_label: 'none',
    input: new Input({
        name: 'phone_name',
        type: 'phone',
        events: {
            blur: () => { Validate(phone_input, 'fdhgdirfhg') }
        }
    })
});

const second_name_input = new InputBlock({
    label: 'Имя',
    regtext: '2222',
    display_error_label: 'none',
    input: new Input({
        name: 'second_name',
        require: 'require',
        events: {
            blur: () => { Validate(second_name_input, 'fdhgdirfhg') }
        }
    })
});

const display_name = new InputBlock({
    label: 'Имя в чате',
    regtext: '2222',
    display_error_label: 'none',
    input: new Input({
    name: 'display_name',
    events: {
        blur: () => { Validate(second_name_input, 'fdhgdirfhg') }
    }
})
});


const save_button = new Button({
    label: 'Сохранить',
    class: 'user-profile__settings-form__button',
    type: 'submit',
    events: {
        click: (event: Event) => {
            console.log(event);
        },
    },
});
const change_password_button = new Button({
    label: 'Изменить пароль',
    class: 'user-profile__button-block__button',
    events: {
        click: (event: Event) => {
            location.href = '../change_password/change_password.html'
        },
    },
});
const sign_out_button = new Button({
    label: 'Выйти',
    class: 'user-profile__button-block__button-red',
    events: {
        click: (event: Event) => {
            location.href = '../../../index.html'
        },
    },
});

const profile_page = new Profile({
    aside:aside,
    user_logo: user_logo,
    mail_input: mail_input,
    login_input: login_input,
    first_name_input: first_name_input,
    second_name_input: second_name_input,
    display_name: display_name,
    phone_input: phone_input,
    save_button: save_button,
    change_password_button: change_password_button,
    sign_out_button: sign_out_button
});



renderDom("#app", profile_page);


