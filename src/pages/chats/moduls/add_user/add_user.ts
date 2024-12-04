import add_user_template from "./add_user.hbs";

import { Block } from '../../../../core/block';
import { Props } from '../../../../core/type';
import { Button } from '../../../../components/button/button';
import { InputBlock } from '../../../../components/input_block/input_block';
import { Input } from '../../../../components/input/input';
import chats_controller from '../../../../controllers/chats-controller';

export class AddUser extends Block {
    constructor(props: Props) {

        const add_user_button = new Button({
            label: 'Начать диалог',
            type: 'submit',
            events: {
                 click: () => {
                    const id_user = (id_user_input.children.input._element.firstChild as HTMLInputElement).value
                    chats_controller.add_user_in_chat([Number(id_user)]);
                    }
            },
        });

const id_user_input = new InputBlock({
    label:'Введите id собеседника:',
    input: new Input({
        name: 'id_user_input'
      })
})
        super('div', {
            ...props,
            add_user_button,
            id_user_input
        });
    }

    render() {
        return this.compile(add_user_template, {
            button: this.props.button,
            login_input: this.props.login_input,
            password_input: this.props.password_input
        });
    };
}


