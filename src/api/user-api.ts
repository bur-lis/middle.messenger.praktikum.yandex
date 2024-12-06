
import MyFetch from '../core/fetch/my_fetch';
import {BaseAPI} from './base-api';
import { RequestData } from "../core/type"

 class UserAPI extends BaseAPI {

    update_user(data?: RequestData) {
        return MyFetch.put('/user/profile', { data: data });
    }

    update_password(data?: RequestData) {
        return MyFetch.put('/user/password', { data: data });
    }

    update_avatar(data?: RequestData) {
        return MyFetch.put('/user/profile/avatar', { data: data });
    }


}


export default new UserAPI(); 

