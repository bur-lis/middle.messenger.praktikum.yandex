import MyFetch from '../core/fetch/my_fetch';
import { BaseAPI } from './base-api';
import { RequestData } from "../core/type"

class ChstApi extends BaseAPI {
    create_chat(data?: RequestData) {
        return MyFetch.post('/chats', { data: data });
    }

    get_all_chats(data?: RequestData) {
        return MyFetch.get('/chats', { data: data });
    }
    get_token_chat(chat_id?: number) {
        return MyFetch.post('/chats/token/' + chat_id);
    }

    add_user(data?: RequestData) {
        return MyFetch.put('/chats/users', { data: data });
    }

    get_user(chat_id?: number) {
        return MyFetch.get('/chats/' + chat_id + '/users',);
    }
    delete_user(data?: RequestData) {
        return MyFetch.delete('/chats/users',{data:data});
    }

    delete_chat(data?: RequestData) {
        return MyFetch.delete('/chats', { data: data })

    }
}

export default new ChstApi();

