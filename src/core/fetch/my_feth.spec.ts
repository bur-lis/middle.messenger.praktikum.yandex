import my_fetch from "./my_fetch";
import { queryStringify } from "./my_fetch";

class FakeXHR {
    status = 200;
    response = '';
    onload: (() => never) | null = null;
    open = jest.fn();
    send = jest.fn(() => {
        this.status = 200;
        this.response = 'OK';
    });
}
describe('Fetch', () => {

    describe('Отправка', () => {


        it('get запроса', async () => {
            const res = await my_fetch.get('/').then(() => {});
            const fake_fetch_send = new FakeXHR().send()
            expect(res).toBe(fake_fetch_send);
        });

        it('post запроса', async () => {
            const res = await my_fetch.post('/').then(() => {});
            const fake_fetch_send = new FakeXHR().send()
            expect(res).toBe(fake_fetch_send);
        });
    });


    describe('Преобразование параметров get запроса', () => {
        it('типа string', () => {
            const res = '?a=b&b=c';
            const params = { a: 'b', b: 'c' };
            expect(queryStringify(params)).toBe(res);
        });
        it('с пустыми строчками', () => {
            const res = '?a=&b=';
            const params = { a: '', b: '' };
            expect(queryStringify(params)).toBe(res);
        });
        it('в которых содержатся специальные символы', () => {
            const res = '?a=hht%206&b=gh%25%26';
            const params = { a: 'hht 6', b: 'gh%&' };
            expect(queryStringify(params)).toBe(res);
        });
    });
});

