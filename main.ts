  //  "eslint": "^9.13.0",
  import { Block } from './src/block';
  import Handlebars from 'handlebars';
// const button = new Block("button",{
//     label: 'Click me',
//     class: 'abc',
//     onclick: '()=>console.log("Click me")'
    
// });


import './style.scss'
import {Button} from "./src/components/button/button"
// import {Authorization} from "./src/pages/authorization/authorization"
const profileTemplate = `
    <div>
    {{ userName }}
        {{ button }}
    </div>
`;

class UserProfile extends Block {
  render() {
    return this.compile(profileTemplate, { userName: this.props.userName });
    }}

const profile = new UserProfile('',{
    button: new Button({ text: 'Change name' }),
});


function render(query, block) {
    console.log(block.getContent())
    const root = document.querySelector(query);
    root.appendChild(block.getContent());
    return root;
  }
  

  render("#app", profile);
  