import './textarea.scss'

import { Block } from '../../core/block.ts';
import { Props } from '../../core/type.ts';
import textarea_template from "./textarea.hbs";

export class Textarea extends Block {
    constructor(props: Props) {
        super('div', props);
    }

    render() {
        return this.compile(textarea_template, {
            name: this.props.name,
            placeholder: this.props.placeholder,
            required: this.props.required,
            class: this.props.class,
            value:this.props.value
        });
    }
}

