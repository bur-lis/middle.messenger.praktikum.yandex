
import './aside.scss'

import { Block } from '../../core/block.ts';
import { Props } from '../../core/type.ts';
import { Router } from '../../core/my_router';
import { Button } from '../../components/button/button';
import { PersonalPhoto } from '../personal_photo/personal_photo.ts';
import aside from "./aside.hbs";

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
    super('div', { ...props, collapse_button, expand_button, personal_photo });
  }


  render() {
    return this.compile(aside, {
      display_name: this.props.display_name,
      second_name: this.props.second_name,
      first_name: this.props.first_name,
      chats: this.props.chats,
      open: this.props.open,

    });
  }
}

