
import {MyFetch} from '../core/my_fetch';
import {BaseAPI} from './base-api';
import {RequestData} from "../core/type"

const UserFetch = new MyFetch();

export class UserAPI extends BaseAPI {
    request() {
        return UserFetch.get('/auth/user');
    }
    update_user(data?:RequestData) {
        return UserFetch.put('/user/profile',{data:data});
    }

    update_password(data?:RequestData) {
        return UserFetch.put('/user/password',{data:data});
    }

    update_avatar(data?:RequestData) {
        return UserFetch.put('/user/profile/avatar',{data:data});
    }

   
}