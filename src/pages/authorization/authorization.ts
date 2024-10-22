import './authorization.scss'
// 

// import './style.scss'
import {Button} from "../../components/button/button"
const button = new Button({
    label: 'Click me',
    class: 'abc',
    onclick: "()=>console.log(123)"
    
});
function render(query, block) {
    console.log('block.getContent()')
    const root = document.querySelector(query);
    root.appendChild(block.getContent().children[0]);
    return root;
  }
  

  render(".middle-panel__form", button);