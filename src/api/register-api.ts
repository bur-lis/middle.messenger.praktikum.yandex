
import {MyFetch} from '../core/my_fetch';
import {BaseAPI} from './base-api';
import {RequestData} from "../core/type"

const registerFetch = new MyFetch();

export class RegisterAPI extends BaseAPI {
    create(data?:RequestData) {
        return registerFetch.post('/auth/signup', {data:data});
    }
   
}