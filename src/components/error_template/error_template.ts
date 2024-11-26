import './error_template.scss'

import { Block } from '../../core/block.ts';
import { Props } from '../../core/type.ts';
import { Linck } from '../linck/linck.ts';
import { Router } from '../../core/my_router.ts';
import error_template from "./error_template.hbs";

export class ErrorTemplate extends Block {
  constructor(props: Props) {
    const router = new Router('#app');
    const back_linck = new Linck({
      text_linck: 'Назад к чатам',
      events: {
          click: () => router.go('/chats')
      },
  });
    super('div', {...props, back_linck});
  }

  render() {
    return this.compile(error_template, {
      code: this.props.code,
      title: this.props.title,
      message: this.props.message,
    });
  }
}


