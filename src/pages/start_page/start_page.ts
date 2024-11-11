// import './authorization.scss'
import '/style.scss'

import { Block } from '../../core/block';
import start_page from "./start_page.hbs";

 export class Start_Page extends Block {
    constructor() {
        super('div');
    }

    render() {
        return this.compile(start_page,{});
    };
}


