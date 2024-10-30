import './change_password.scss'
import { renderDom , Validate} from '../../utils'
import { InputBlock } from '../../components/input_block/input_block';
import { Button } from '../../components/button/button';
import { Input } from '../../components/input/input';
import { Block, Props } from '../../block';
import { UserLogo } from '../../components/user_logo/user_logo';
import { Aside } from '../../components/aside/aside';
import change_password_template from "./change_password.hbs";

export class ChangePassword extends Block {
    constructor(props: Props) {
        super('div', props);
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

const aside = new Aside({
    display_name: 'Елена',
        second_name: 'Second_name',
        first_name:'first_name',
        chats: '',
        open: false,
})
const user_logo = new UserLogo({
    display_name: 'Елена'
})

const old_password_input = new InputBlock({
    label: 'Старый пароль',
    regtext: '2222',
    display_error_label: 'none',
    input: new Input({
    name: 'old_password',
    type: 'password',
    require: 'require',
    events: {
        blur: () => { Validate(old_password_input, 'fdhgdirfhg') }
    }
})
});

const new_password_input = new InputBlock({
    label: 'Новый пароль',
    regtext: '2222',
    display_error_label: 'none',
    input: new Input({
    name: 'new_password',
    type: 'password',
    require: 'require',
    events: {
        blur: () => { Validate(new_password_input, 'fdhgdirfhg') }
    }
})
});
const confirm_new_password_input = new InputBlock({
    label: 'Новый пароль(ещё раз)',
    regtext: '2222',
    display_error_label: 'none',
    input: new Input({
    name: 'confirm_new_password',
    type: 'password',
    require: 'require',
    events: {
        blur: () => { Validate(confirm_new_password_input, 'fdhgdirfhg') }
    }
})
});

const save_button = new Button({
    label: 'Сохранить',
    class: 'change-password__save-button',
    type: 'submit',
    events: {
        click: (event: Event) => {
            console.log(event);
        },
    },
});

const change_password_page = new ChangePassword({
    aside:aside,
    user_logo: user_logo,
    old_password_input: old_password_input,
    new_password_input: new_password_input,
    confirm_new_password_input: confirm_new_password_input,
    save_button: save_button,
});



renderDom("#app", change_password_page);


