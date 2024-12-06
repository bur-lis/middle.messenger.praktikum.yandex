import './img.scss'

import { Block } from '../../core/block/block.ts';
import { Props } from '../../core/type.ts';
import img_template from "./img.hbs";

export class Img extends Block {
    constructor(props: Props) {
        super('div', props);
    }

    render() {
        return this.compile(img_template, {
            class: this.props.class,
            src:this.props.src
        });
    }
}

