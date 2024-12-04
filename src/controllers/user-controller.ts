import UserAPI from "../api/user-api";
import { Router } from "../core/my_router";
import { Block } from "../core/block";
import { Response } from "../core/type";
import store from '../core/store';
import { ValidateForm, GetJsonDataFromForm, NotificationMassage } from "../core/utils";

const router = new Router('#app');

class CurrentUser {

    public async edit_user(profile_block: Block) {
        try {

            if (ValidateForm(profile_block)) {
                const request_data = GetJsonDataFromForm('profile_form');
                UserAPI.update_user(request_data).then((response: Response) => {
                    if (response.status === 200) {

                        NotificationMassage('Данные пользователя успешно изменены!')
                        const user = response.response;
                        store.set('user', JSON.parse(user))
                    }
                    else router.rederectToError(response.status)
                })
            }
            else throw new Error('Форма редактирования пользователя не корректно заполнена');

        } catch (error) {
            throw new Error(error);
        }
    }

    public async edit_avatar() {
        try {
            const file = store.getState().avatar_file as File;
            if (file) {
                const request_data = new FormData();
                request_data.append('avatar', file)
                UserAPI.update_avatar(request_data).then((response: Response) => {
                    if (response.status === 200) {
                        NotificationMassage('Аватар пользователя успешно изменен!')
                    }
                    else router.rederectToError(response.status)
                })
            }

        } catch (error) {
            throw new Error(error);
        }
    }

    public async edit_password(change_password_block: Block) {
        try {
            if (ValidateForm(change_password_block)) {
                const request_data = GetJsonDataFromForm('change_password_form');
                UserAPI.update_password(request_data).then((response: Response) => {
                    if (response.status === 200) {
                        NotificationMassage('Пароль успешно изменен!')
                        router.go('/profile');
                    }
                    else router.rederectToError(response.status)
                })
            }
            else throw new Error('Форма смены пароля не корректно заполнена');

        } catch (error) {
            throw new Error(error);
        }
    }
}

export default new CurrentUser(); 

