import './input_block.scss'
import { Block, Props } from '../../block.ts';
import {  default as input_block} from "./input_block.hbs";

export class InputBlock extends Block {
  constructor(props: Props) {
    super('div', props);
  }

  render() {
    return this.compile(input_block,{
      label: this.props.label,
      name: this.props.name,
      value:this.props.value,
      required: this.props.required,

    });
  }
}