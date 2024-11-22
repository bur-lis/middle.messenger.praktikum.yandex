import './user_logo.scss'
import { Block } from '../../core/block.ts';
import { Props } from '../../core/type.ts';
import { default as user_logo_template } from "./user_logo.hbs";
import { connect } from '../../core/hos.ts';
import { Input } from '../input/input.ts';
import { Img } from '../img/img.ts';
import { AddAvatarInStore } from '../../core/utils.ts';

const avatar_input = new Input({
  name: 'avatar',
  type: 'file',
  class: 'avatar_input',
  events: {
    change: (event: InputEvent) => {
      const file_input = (event?.target as HTMLInputElement).files![0];
      if (file_input) { AddAvatarInStore(file_input,true) }
    }

  }
});

const avatar_img = new Img({
  class: 'avatar_img',
  events: {
    click: () => { document.getElementsByName('avatar')[0].click() }
  }
});

class UserLogo extends Block {
  constructor(tag: string,props: Props) {


    super(tag, { ...props, avatar_input, avatar_img })
  }



  render() {
    return this.compile(user_logo_template, {
      display_name: this.props.display_name
    });
  }
}

export default connect('div', UserLogo, (state: Record<string, Props>) => (
  avatar_img.setProps({ 'src': state.avatar_src}),
   { display_name: state.user.display_name }));


