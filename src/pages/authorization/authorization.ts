import './authorization.scss'
import '/style.scss'

import { Block, Props } from '../../block';
import Handlebars from 'handlebars';
import { default as authorization_template } from "./authorization.hbs?raw";
import { Button } from "../../components/button/button"


const button = new Button({
    label: 'Click me',
    class: 'abc',
    events: {
        click: event => {
            console.log(event);
        },
    }

});

export class Authorization extends Block {
    constructor(props:Props) {
        super('div', props);
      }
    render() {
        const template = Handlebars.compile(authorization_template);
        return template({
            button: this.props.button,
        });
    }
}

const authorization = new Authorization({
    button: button.getContent().outerHTML,
}); 
// function render(query: string, block: Block) {
//     console.log(block)
//     const root = document.querySelector(query);
//     if (root) root.appendChild(block.getContent());
//     return root;
// }

// render(".middle-panel", authorization);
