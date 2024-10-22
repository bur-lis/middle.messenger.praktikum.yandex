  //  "eslint": "^9.13.0",
//   import { Block } from './src/block';
// const button = new Block("button",{
//     label: 'Click me',
//     class: 'abc',
//     onclick: '()=>console.log("Click me")'
    
// });


import './style.scss'
import {Button} from "./src/components/button/button"
const button = new Button({
    label: 'Click me',
    class: 'abc',
    onclick: "()=>console.log(123)"
    
});

function render(query, block) {
    console.log(block.getContent())
    const root = document.querySelector(query);
    root.appendChild(block.getContent().children[0]);
    return root;
  }
  

  render("#app", button);
  