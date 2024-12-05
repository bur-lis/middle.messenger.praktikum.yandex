import './loading.scss'

import { Block } from '../../core/block.ts';
import { Props } from '../../core/type.ts';
import loading_template from "./loading.hbs";

export class Loading extends Block {
    constructor(props: Props) {
        super('div',props);
    }

    render() {
        return this.compile(loading_template,{});
    }
}

export default Loading;

