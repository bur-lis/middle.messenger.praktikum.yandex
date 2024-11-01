import './error_template.scss'

import { Block } from '../../core/block.ts';
import { Props } from '../../core/type.ts';
import error_template from "./error_template.hbs";

export class ErrorTemplate extends Block {
  constructor(props: Props) {
    super('div', props);
  }

  render() {
    return this.compile(error_template, {
      code: this.props.code,
      title: this.props.title,
      message: this.props.message,
    });
  }
}

