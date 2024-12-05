import './input.scss'

import { Block } from '../../core/block.ts';
import { Props } from '../../core/type.ts';
import input_template from "./input.hbs";

export class Input extends Block {
    constructor(props: Props) {
        super('div', props);
    }

    render() {
        return this.compile(input_template, {
            name: this.props.name,
            type: this.props.type,
            required: this.props.required,
            class: this.props.class,
            value:this.props.value
        });
    }
}

