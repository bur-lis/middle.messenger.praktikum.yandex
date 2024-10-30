import './user_logo.scss'
import { Block, Props } from '../../block.ts';
import {  default as user_logo_template} from "./user_logo.hbs";

export class UserLogo extends Block {
  constructor(props: Props) {
    super('div', props);
  }

  render() {
    return this.compile(user_logo_template,{
        display_name: this.props.display_name
    });
  }
}