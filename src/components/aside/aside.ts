import './aside.scss'
import aside from "./aside.hbs";

import { Block } from '../../core/block.ts';
import { Props } from '../../core/type.ts';
import { Router } from '../../core/my_router';
import { Button } from '../../components/button/button';
import { PersonalPhoto } from '../personal_photo/personal_photo.ts';
import store, { StoreEvents } from '../../core/store';

const router = new Router('#app');

export class Aside extends Block {
  constructor(props: Props) {
    const personal_photo = new PersonalPhoto({
      class: 'personal__photo',
      events: {
        click: () => {
          router.go('/profile')
        },
      }
    })

    store.on(StoreEvents.Updated, () => {
      // вызываем обновление компонента, передав данные из хранилища
      this.setProps(store.getState());
        });


    const add_chat_button = new Button({
      label: '+',
      class: 'add_chat_button',
      events: {
        click: () => {
          console.log('jafgsak')
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
    super('div', { ...props, collapse_button, expand_button, personal_photo , add_chat_button});
  }


  render() {
    return this.compile(aside, {
      user:this.props.user,
      chats: this.props.chats,
      open: this.props.open

    });
  }
}

