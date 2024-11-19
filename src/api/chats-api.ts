import { MyFetch } from '../core/my_fetch';
import { BaseAPI } from './base-api';
import { RequestData } from "../core/type"

const chatFetch = new MyFetch();

export class RegisterAPI extends BaseAPI {
    create(data?: RequestData) {
        //создать чат
        return chatFetch.post('/chats', { data: data });
    }

    request(data?: RequestData) {
        // список чатов
        return chatFetch.get('/chats', { data: data });
    }

    update(data?: RequestData) {
        // добавить пользователя в чат
        return chatFetch.get('/chats/users', { data: data });
    }

    delete(data?: string) {
        // удалить чат
        if (typeof data === 'string') {
            return chatFetch.delete('/chats', { data: { 'chatId': data } })
        };
    }


}

// class LoginAPI extends BaseAPI {
//         public request(user: LoginRequest) {
//           return authAPIInstance.post<LoginRequest, LoginResponse>('/login', user)
//             .then(({user_id}) => user_id); // Обрабатываем получение данных из сервиса далее
//         }
//       } 