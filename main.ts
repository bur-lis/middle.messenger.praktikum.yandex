import './style.scss'
import {Button} from "./src/components/button/button"
const button = new Button({
    label: 'Click me',
    class: 'abc',
    onclick: '()=>console.log("Click me")'
    
});

function render(query, block) {
    console.log(block.getContent())
    const root = document.querySelector(query);
    root.appendChild(block.getContent());
    return root;
  }
  

  render("#app", button);
  