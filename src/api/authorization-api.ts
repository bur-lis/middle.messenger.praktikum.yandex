
import {MyFetch} from '../core/my_fetch';
import {BaseAPI} from './base-api';
import {RequestData} from "../core/type"

const authorizationFetch = new MyFetch();

export class AuthorizationAPI extends BaseAPI {
    create(data?:RequestData) {
        return authorizationFetch.post('/auth/signin', {data:data});
    }
}

