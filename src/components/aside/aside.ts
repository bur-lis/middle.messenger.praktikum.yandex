
import './aside.scss'
import { Block, Props } from '../../block.ts';
import { Button } from '../button/button.ts';
import aside from "./aside.hbs";



export class Aside extends Block {
  constructor(props:Props) {
    
    const collapse_button = new Button({
    label:' ❮ Свернуть',
    class:'collapse-button',
    events: {
      click: () => {this.setProps({open:false})
      },
  }
})
const expand_button = new Button({
  label:'➔',
  class:'aside-closed__expand-button',
  events: {
    click: () => {this.setProps({open:true})
    },
}
})
    super('div',{ ...props, collapse_button, expand_button});
  }

 
  render() {
    return this.compile(aside,{
        display_name: this.props.display_name,
        second_name: this.props.second_name,
        first_name:this.props.first_name,
        chats:this.props.chats,
        open:this.props.open,

    });
  }
}

