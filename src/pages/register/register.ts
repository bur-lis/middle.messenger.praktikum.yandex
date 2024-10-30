import './register.scss'
import { renderDom, Validate } from '../../utils'
// import { InputBlock } from '../../components/input_block/input_block';
import { Button } from '../../components/button/button';
// import { Input } from '../../components/input/input';
import { mail_input, login_input, first_name_input, phone_input, second_name_input, password_input, confirm_password_input } from '../../main_input';
import { Block, Props } from '../../block';
import register_template from "./register.hbs";

export class Register extends Block {
    constructor(props: Props) {
        super('div', props);
    }

    render() {
        return this.compile(register_template, {
            button: this.props.button,
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

// const mail_input = new InputBlock({
//     label: 'Почта',
//     regtext: '2222',
//     display_error_label: 'none',
//     input: new Input({
//         name: 'email',
//         events: {
//             blur: () => { Validate(mail_input, 'fdhgdirfhg') }
//         }
//     })
// });

// const login_input = new InputBlock({
//     label: 'Логин',
//     regtext: '2222',
//     display_error_label: 'none',
//     input: new Input({
//         name: 'login',
//         events: {
//             blur: () => { Validate(login_input, 'fdhgdirfhg') }
//         }
//     })
// });

// const first_name_input = new InputBlock({
//     label: 'Фамилия',
//     regtext: '2222',
//     display_error_label: 'none',
//     input: new Input({
//         name: 'first_name',
//         events: {
//             blur: () => { Validate(first_name_input, 'fdhgdirfhg') }
//         }
//     })
// });
// const phone_input = new InputBlock({
//     label: 'Телефон',
//     regtext: '2222',
//     display_error_label: 'none',
//     input: new Input({
//         name: 'phone_name',
//         type: 'phone',
//         events: {
//             blur: () => { Validate(phone_input, 'fdhgdirfhg') }
//         }
//     })
// });

// const second_name_input = new InputBlock({
//     label: 'Имя',
//     regtext: '2222',
//     display_error_label: 'none',
//     input: new Input({
//         name: 'second_name',
//         require: 'require',
//         events: {
//             blur: () => { Validate(second_name_input, 'fdhgdirfhg') }
//         }
//     })
// });

// const password_input = new InputBlock({
//     label: 'Пароль',
//     regtext: '2222',
//     display_error_label: 'none',
//     input: new Input({
//         name: 'password',
//         type: 'password',
//         events: {
//             blur: () => { Validate(second_name_input, 'fdhgdirfhg') }
//         }
//     })
// });
// const confirm_password_input = new InputBlock({
//     label: 'Пароль(ещё раз)',
//     regtext: '2222',
//     display_error_label: 'none',
//     input: new Input({
//         name: 'confirm_password',
//         type: 'password',
//         events: {
//             blur: () => { Validate(second_name_input, 'fdhgdirfhg') }
//         }
//     })
// });

const button = new Button({
    label: 'Зарегистрироваться',
    class: 'middle-panel__button',
    type: 'submit',
    events: {
        click: (event: Event) => {
            console.log(event);
            location.href = '../autorisation/autorisation.html';
        },
    },
});

const register_page = new Register({
    mail_input: mail_input,
    login_input: login_input,
    first_name_input: first_name_input,
    second_name_input: second_name_input,
    phone_input: phone_input,
    password_input: password_input,
    confirm_password_input: confirm_password_input,
    button: button,
});



renderDom("#app", register_page);


