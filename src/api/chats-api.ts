import MyFetch from '../core/my_fetch';
import { BaseAPI } from './base-api';
import { RequestData } from "../core/type"

class ChstApi extends BaseAPI {
    create(data?: RequestData) {
        //создать чат
        return MyFetch.post('/chats', { data: data });
    }

    request(data?: RequestData) {
        // список чатов
        return MyFetch.get('/chats', { data: data });
    }
    get_token_chat(data?: RequestData){
        // выделенный чат
        return MyFetch.post('/chats/token/'+ data.id);// 
    }

    update(data?: RequestData) {
        // добавить пользователя в чат
        return MyFetch.get('/chats/users', { data: data });
    }

    delete(data?: string) {
        // удалить чат
        if (typeof data === 'string') {
            return MyFetch.delete('/chats', { data: { 'chatId': data } })
        };
    }


}


export default new ChstApi(); 