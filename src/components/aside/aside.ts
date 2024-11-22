import './aside.scss'
import aside from "./aside.hbs";

import { Block } from '../../core/block.ts';
import { Props } from '../../core/type.ts';
import { Router } from '../../core/my_router';
import { Button } from '../../components/button/button';
import { PersonalPhoto } from '../personal_photo/personal_photo.ts';
import { connect } from '../../core/hos.ts';

const router = new Router('#app');

class Aside extends Block {
  constructor(tag: string, props: Props) {
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
    super(tag, { ...props, collapse_button, expand_button, personal_photo, add_chat_button });
  }


  render() {
    console.log(this)
    return this.compile(aside, {
      user: this.props.user,
      chats: this.props.chats,
      open: this.props.open

    });
  }
}

export default connect('div', Aside, (state: Props) => ({ user: state.user })); 