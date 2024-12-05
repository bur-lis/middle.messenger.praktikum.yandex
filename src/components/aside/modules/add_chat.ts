import './add_chat.scss'

import { Block } from '../../../core/block.js';
import { Props } from '../../../core/type.js';
import add_chat_template from "./add_chat.hbs";

export class AddChat extends Block {
  constructor(props: Props) {
    super('div', props);
  }

  render() {
    return this.compile(add_chat_template, {
      input: this.props.input,
      button: this.props.button,

    });
  }
}

