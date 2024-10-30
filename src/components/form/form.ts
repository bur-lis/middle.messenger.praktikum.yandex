
import './form.scss'
import { Block, Props } from '../../block.ts';
import form_template from "./form.hbs";

export class Form extends Block {
  constructor(props:Props) {
    super('div', props);
  }

  render() {
    return this.compile(form_template,{
      metod: this.props.metod,
      class: this.props.class,
      inputs:this.props.inputs,
      button:this.props.button
    });
  }
}