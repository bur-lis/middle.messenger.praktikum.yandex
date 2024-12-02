import './add_user.scss'
import authorization_template from "./add_user.hbs";

import { Block } from '../../../../core/block';
import { Props } from '../../../../core/type';
// import { Route } from '../../../../core/my_router';
import { Button } from '../../../../components/button/button';

export class AddUser extends Block {
    constructor(props: Props) {

        const button = new Button({
            label: 'Войти',
            class: 'middle-panel__button',
            type: 'submit',
            events: {
                // click: () => { auth_controller.login(this) }
            },
        });

        super('div', {
            ...props,
            button,
        });
    }

    render() {
        return this.compile(authorization_template, {
            button: this.props.button,
            login_input: this.props.login_input,
            password_input: this.props.password_input
        });
    };
}


