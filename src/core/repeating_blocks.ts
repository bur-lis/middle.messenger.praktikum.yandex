
import { Validate } from './utils'
import { InputBlock } from '../components/input_block/input_block';
import { Input } from '../components/input/input';
import { Aside } from '../components/aside/aside';
import { UserLogo } from '../components/user_logo/user_logo';

export const user_logo = new UserLogo({
    display_name: 'Елена'
})

export const aside = new Aside({
    display_name: 'Елена',
    second_name: 'Second_name',
    first_name: 'First_name',
    chats: {
        '0': {
            name: 'Андрей',
            message: 'Изображение',
            new_count: 2,
            time: '10:49'
        },
        '1': {
            name: 'Киноклуб',
            message: 'стикер',
            new_count: 4,
            time: '12:00',
            output: true
        },
        '2': {
            name: 'Илья',
            message: 'Друзья, у меня для вас особенный выпуск новостей!...',
            new_count: 0,
            time: '15:12'
        },
        '3': {
            name: 'Вадим',
            message: 'Круто!',
            new_count: 0,
            time: 'Пт',
            output: true
        },
        '4': {
            name: 'тет-а-теты',
            message: 'И Human Interface Guidelines и Material Design рекомендуют...',
            new_count: 0,
            time: 'Ср'
        },
        '5': {
            name: '1,2,3',
            message: 'Миллионы россиян ежедневно проводят десятки часов свое...',
            new_count: 0,
            time: 'Пн'
        },
        '6': {
            name: 'Design Destroyer',
            message: 'В 2008 году художник Jon Rafman  начал собирать...',
            new_count: 0,
            time: 'Пн'
        },
        '7': {
            name: 'Day.',
            message: 'Так увлёкся работой по курсу, что совсем забыл его анонсир...',
            new_count: 0,
            time: '1 Мая 2020'

        }
    },
    open: true,
})


export const mail_input = new InputBlock({
    label: 'Почта',
    type:'email',
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

export const login_input = new InputBlock({
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

export const first_name_input = new InputBlock({
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
export const phone_input = new InputBlock({
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

export const second_name_input = new InputBlock({
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

export const password_input = new InputBlock({
    label: 'Пароль',
    regtext: '8-40 символов, обязательно хотя бы одна заглавная буква и цифра',
    regexp: '^(?=.*[0-9])(?=.*[A-ZА-Я])[0-9a-zA-ZА-Яа-я]{8,40}$',
    display_error_label: 'none',
    input: new Input({
        name: 'password',
        type: 'password',
        required: 'required',
        events: {
            blur: () => { Validate(password_input) }
        }
    })
});
export const confirm_password_input = new InputBlock({
    label: 'Пароль(ещё раз)',
    regtext: 'Пароль не соответсвует требованием',
    regexp: '^(?=.*[0-9])(?=.*[A-ZА-Я])[0-9a-zA-ZА-Яа-я]{8,40}$',
    display_error_label: 'none',
    input: new Input({
        name: 'confirm_password',
        type: 'password',
        required: 'required',
        events: {
            blur: () => { Validate(confirm_password_input) }
        }
    })
});

