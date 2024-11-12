
import './personal_photo.scss'

import { Block } from '../../core/block.ts';
import { Props } from '../../core/type.ts';
import personal_photo from "./personal_photo.hbs";

export class PersonalPhoto extends Block {
    constructor(props: Props) {
        super('div', props);
    }

    render() {
        return this.compile(personal_photo, {
            class: this.props.class,
            img: this.props.img,
        });
    }
}

