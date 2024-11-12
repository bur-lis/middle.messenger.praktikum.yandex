
import './linck.scss'

import { Block } from '../../core/block.ts';
import { Props } from '../../core/type.ts';
import mu_linck from "./linck.hbs";

export class Linck extends Block {
    constructor(props: Props) {
        super('div', props);
    }
    render() {
        return this.compile(mu_linck, {
            text_linck: this.props.text_linck,
            class:this.props.class
        });
    }
}

