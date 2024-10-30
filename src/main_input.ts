
import {  Validate } from './utils'
import { InputBlock } from './components/input_block/input_block';
import { Input } from './components/input/input';

export const mail_input = new InputBlock({
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

export const login_input = new InputBlock({
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

export const first_name_input = new InputBlock({
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
export const phone_input = new InputBlock({
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

export const second_name_input = new InputBlock({
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

export const password_input = new InputBlock({
    label: 'Пароль',
    regtext: '2222',
    display_error_label: 'none',
    input: new Input({
        name: 'password',
        type: 'password',
        events: {
            blur: () => { Validate(password_input, 'fdhgdirfhg') }
        }
    })
});
export const confirm_password_input = new InputBlock({
    label: 'Пароль(ещё раз)',
    regtext: '2222',
    display_error_label: 'none',
    input: new Input({
        name: 'confirm_password',
        type: 'password',
        events: {
            blur: () => { Validate(confirm_password_input, 'fdhgdirfhg') }
        }
    })
});
