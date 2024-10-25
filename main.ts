import './style.scss'
import {Button} from "./src/components/button/button"
import {Authorization} from "./src/pages/authorization/authorization"

const button = new Button({
  label: 'Click me',
  class: 'abc',
  events: {
      click: event => {
          console.log(event);
      },
  settings: {withInternalID: true},
  }
});
console.log( button._id )

const page = new Authorization({ userName: 'John Doe', button:button,})

function render(query, block) {
    console.log(block.getContent())
    const root = document.querySelector(query);
    root.appendChild(block.getContent());
    return root;
  }
  

  render("#app", page);
  