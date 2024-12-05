
import './personal_photo.scss'

import { Block } from '../../core/block.ts';
import { Props } from '../../core/type.ts';
import { connect } from '../../core/hos.ts';
import personal_photo from "./personal_photo.hbs";

class PersonalPhoto extends Block {
    constructor(tag: string, props: Props) {
        super(tag, props);
    }

    render() {
        return this.compile(personal_photo, {
            class: this.props.class,
            img: this.props.img,
        });
    }
}

export default connect('div', PersonalPhoto,
    (state) => (
        {
            img: {
                src: state.avatar_src,
                class: 'mini',
                alt: 'Аватар пользователя. Переход к редактированию профиля.'
            }
        }));

