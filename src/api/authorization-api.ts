
import {MyFetch} from '../core/my_fetch';
import {BaseAPI} from './base-api';
import {RequestData} from "../core/type"

const chatAPIInstance = new MyFetch();

export class AuthorizationAPI extends BaseAPI {
    create(data:RequestData) {
        // Здесь уже не нужно писать полный путь /api/v1/chats/
        const response  = chatAPIInstance.post('/api/v2/auth/signin', {data:data}).then(({response, status}) => {return {'response':JSON.parse(response) ,'status': status}});
        console.log(response)
        return response;
    }

    // request(data) {
    //     // Здесь уже не нужно писать полный путь /api/v1/chats/
    //     return chatAPIInstance.post('/auth/signin');
    // }

    
}

// class LoginAPI extends BaseAPI {
//         public request(user: LoginRequest) {
//           return authAPIInstance.post<LoginRequest, LoginResponse>('/login', user)
//              // Обрабатываем получение данных из сервиса далее
//         }
//       } 