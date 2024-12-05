
import MyFetch  from '../core/my_fetch';
import {BaseAPI} from './base-api';
import { RequestData } from "../core/type"

class AuthorizationAPI extends BaseAPI {
    info() {
        return MyFetch.get('/auth/user');
    }
    get_avatar(part_path:string) {
        return MyFetch.get('/resources' + part_path);
    }
    sign_in(data?: RequestData) {
        return MyFetch.post('/auth/signin', { data: data });
    }
    sign_up(data?:RequestData) {
        return MyFetch.post('/auth/signup', {data:data});
    }
    sign_out() {
        return MyFetch.post('/auth/logout');
    }
}

export default new AuthorizationAPI(); 

