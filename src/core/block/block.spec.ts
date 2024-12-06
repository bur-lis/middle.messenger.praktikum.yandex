import { Block } from './block';
import { Props } from '../type';
import { renderDom } from '../utils';

describe('Block', () => {

    const body = document.querySelector('body');
    if (body)  body.innerHTML = "<div id='app'></div>";
    
    class TestComponent extends Block {
        constructor(props: Props) {
            super('div', props);
        }
    }

    const component = new TestComponent({});

    it('Добавление блока на страницу', () => {
        renderDom('#app', component);
        const comp = document.querySelector('#app')?.firstChild;
        expect(comp).not.toBeNull();
    });
});

