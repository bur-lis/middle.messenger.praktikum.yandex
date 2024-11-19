
import {MyFetch} from '../core/my_fetch';
import {BaseAPI} from './base-api';
import {RequestData} from "../core/type"

const UserFetch = new MyFetch();

export class UserAPI extends BaseAPI {
    request() {
        return UserFetch.get('/auth/user');
    }
   
}