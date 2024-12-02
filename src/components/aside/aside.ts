import './aside.scss'
import aside from "./aside.hbs";

import { Block } from '../../core/block.ts';
import { Props } from '../../core/type.ts';
import { Router } from '../../core/my_router';
import { Button } from '../../components/button/button';
import { AddChat } from './modules/add_chat.ts';
import { PersonalPhoto } from '../personal_photo/personal_photo.ts';
import chats_controller from '../../controllers/chats-controller';
import { connect } from '../../core/hos.ts';
import { InputBlock } from '../input_block/input_block.ts';
import { Input } from '../input/input.ts';

const router = new Router('#app');
class Aside extends Block {

  constructor(tag: string, props: Props) {
    chats_controller.get_chats();
    const personal_photo = new PersonalPhoto({
      class: 'personal__photo',
      events: {
        click: () => {
          router.go('/profile')
        },
      }
    })

    const add_chat_button = new Button({
      label: '+',
      class: 'add_chat_button',
      events: {
        click: () => {
          console.log('jafgsak');

          add_chat_block.show()
        },
      }
    })
    const collapse_button = new Button({
      label: ' ❮ Свернуть',
      class: 'collapse-button',
      events: {
        click: () => {
          this.setProps({ open: false })
        },
      }
    })

    const expand_button = new Button({
      label: '➔',
      class: 'aside-closed__expand-button',
      events: {
        click: () => {
          this.setProps({ open: true })
        },
      }
    })
    const chat_title = new Input({})
    const add_chat_block = new AddChat({
      input: new InputBlock({
        input: chat_title,
        label: "Название чата:",

      }),
      add_button: new Button({
        label: 'Создать', events: {
          click: () => {
            chats_controller.create((chat_title._element.firstChild! as HTMLInputElement).value).then(() =>
              add_chat_block.hide())
          },
        }
      })
      ,
      close_button: new Button({
        label: 'Отмена',
        events: {
          click: () => {
            add_chat_block.hide()
          },
        }
      })
    })
    super(tag, {
      ...props, collapse_button, add_chat_block, expand_button, personal_photo, add_chat_button, events: {
        click: (event: Event) => {
          const target = event.target as HTMLElement;
          const user = target.closest<HTMLElement>('.chats-list__message');
          const id = user?.dataset?.id || null;

          if (!id) return;
          console.log(id)
         chats_controller.get_selected_chat(id)
          // ChatsControllers.setCurrentChat(+id).then(); 
        },
      }
    });

    add_chat_block.hide()
  }


  render() {
    return this.compile(aside, {
      user: this.props.user,
      chats: this.props.chats,
      open: this.props.open,
    });
  }

}

// type Chat = {
//   "id": string,
//   "title": string,
//   "avatar": string,
//   "created_by": number,
//   "unread_count": number,
//   "last_message": string
// }

export default connect('div', Aside, MyFunction);

function MyFunction(state: Record<string, Props>) {

  return { user: state.user, chats: state.chats }
}