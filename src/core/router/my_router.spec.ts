import { Router } from "./my_router";
import { Block } from "../block/block";
import { Props } from '../type';

const router = new Router('#app')

describe('Router', () => {
    class TestComponent extends Block {
        constructor(props: Props) {
            super('div', props);
        }
    }
    global.window = Object.create(window);
    router.use('/', TestComponent)
    router.start();
    it('Переход на новую страницу', () => {
        router.go('/')
        expect(window.location.href).toBe('http://localhost/');
    });

    it('Проверка повторного создания роутера', () => {
        const double_router = new Router('#app');
        expect(router === double_router).toBe(true);
    });
});

