import './input_block.scss'

import { Block } from '../../core/block/block.ts';
import { Props } from '../../core/type.ts';
import input_block_template from "./input_block.hbs";



export class InputBlock extends Block {
  constructor(props: Props) {

    super('div', props);
  }

  render() {
    return this.compile(input_block_template, {
      input: this.props.input,
      label: this.props.label,
      regtext: this.props.regtext,
      display_error_label: this.props.display_error_label,

    });
  }
}

