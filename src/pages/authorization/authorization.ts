import './authorization.scss'
import '/style.scss'

import { Block, Props } from '../../block';
import Handlebars from 'handlebars';
import { default as authorization_template } from "./authorization.hbs?raw";

const profileTemplate = `
    <div>
    {{ userName }}
        {{ button }}
    </div>
`;
export class Authorization extends Block {
    constructor(props:Props) {
        super('div', props);
      }

    render() { return this.compile(profileTemplate, {
        button: this.props.button,
    });
    }
   ;
}

// const authorization = new Authorization({
//     button: button.getContent().outerHTML,
// }); 
// function render(query: string, block: Block) {
//     console.log(block)
//     const root = document.querySelector(query);
//     if (root) root.appendChild(block.getContent());
//     return root;
// }

// render(".middle-panel", authorization);
