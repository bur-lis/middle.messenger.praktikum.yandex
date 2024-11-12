import './start_page.scss'

import { Block } from '../../core/block';
import { Props } from '../../core/type';
import { Linck } from '../../components/linck/linck';
import { Router } from '../../core/my_router';
import start_page from "./start_page.hbs";
const router = new Router('#app');
export class Start_Page extends Block {
    constructor(props: Props) {
        const authorization_lick = new Linck({
            text_linck: 'войдите в систему',
            events: {
                click: () => router.go('/authorization')
            },
        });
        const register_linck = new Linck({
            text_linck: 'зарегистрируйтесь',
            events: {
                click: () => router.go('/register')
            },
        });
        super('div', { ...props, authorization_lick, register_linck });

    }

    render() {
        return this.compile(start_page, {});
    };
}


