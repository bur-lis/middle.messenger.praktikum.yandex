
import {MyFetch} from '../core/my_fetch';
import {BaseAPI} from './base-api';
import {RequestData} from "../core/type"

const chatAPIInstance = new MyFetch();

export class AuthorizationAPI extends BaseAPI {
    create(data:RequestData) {
        // Здесь уже не нужно писать полный путь /api/v1/chats/
        return chatAPIInstance.post('/auth/signin', {data:data});
    }

    // request(data) {
    //     // Здесь уже не нужно писать полный путь /api/v1/chats/
    //     return chatAPIInstance.post('/auth/signin');
    // }

    
}

// class LoginAPI extends BaseAPI {
//         public request(user: LoginRequest) {
//           return authAPIInstance.post<LoginRequest, LoginResponse>('/login', user)
//             .then(({user_id}) => user_id); // Обрабатываем получение данных из сервиса далее
//         }
//       } 