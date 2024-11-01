
import './button.scss'

import { Block } from '../../core/block.ts';
import { Props } from '../../core/type.ts';
import mu_button from "./button.hbs";

export class Button extends Block {
  constructor(props: Props) {
    super('div', props);
  }

  render() {
    return this.compile(mu_button, {
      label: this.props.label,
      class: this.props.class,
      type: this.props.type,
      img: this.props.img,
      alt: this.props.alt
    });
  }
}

