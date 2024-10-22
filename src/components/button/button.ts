
import { Block,Props } from '../../block';
import Handlebars from 'handlebars';
import {  default as mu_button} from "./button.hbs?raw";
const base_template = `
  {{ label }}
`;
export class Button extends Block {
  constructor(props:Props) {
    super('div', props);
  }

  

  render() {
    const template = Handlebars.compile(mu_button);
    return template({
      label: this.props.label,
      class: this.props.class,
      settings:this.props.settings,
      onclick: this.props.onclick,

    });
  }
}