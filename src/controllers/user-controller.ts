import { UserAPI } from "../api/user-api";
import { Router } from "../core/my_router";
import { Block } from "../core/block";
import { Response } from "../core/type";
import store from '../core/store';
import { ValidateForm, RederectToError, GetJsonDataFromForm, NotificationMassage } from "../core/utils";

const user_api = new UserAPI();
// const store = new Store();

const router = new Router('#app');

export class CurrentUser {
    public async info() {
        try {
            // Запускаем крутилку  
            user_api.request().then((response: Response) => {
                if (response.status === 200) {
                    console.log(response)
                    const user = response.response;
                    // 
                    console.log('fbg')
                    store.set('user', JSON.parse(user))
                    store.set('mail_input', JSON.parse(user).email)

                    console.log(user)
                    // Останавливаем крутилку
                }
                else RederectToError(response.status)
            })

        } catch (error) {
            // Логика обработки ошибок
        }
    }

    public async edit_user(profile_block: Block) {
        try {
            // Запускаем крутилку  

            if (ValidateForm(profile_block)) {
                const request_data = GetJsonDataFromForm('profile_form');
                user_api.update_user(request_data).then((response: Response) => {
                    if (response.status === 200) {

                        NotificationMassage('Данные пользователя успешно изменены!')
                        const user = response.response;
                        store.set('user', JSON.parse(user))
                    }
                    else RederectToError(response.status)
                })
            }
            else throw new Error('Форма редактирования пользователя не корректно заполнена');
            // Останавливаем крутилку

        } catch (error) {
            // Логика обработки ошибок
        }
    }
    public async edit_password(change_password_block: Block) {
        try {
            // Запускаем крутилку  

            if (ValidateForm(change_password_block)) {
                const request_data = GetJsonDataFromForm('change_password_form');
                user_api.update_password(request_data).then((response: Response) => {
                    if (response.status === 200) {
                        NotificationMassage('Пароль успешно изменен!')
                        router.go('/profile');
                    }
                    else RederectToError(response.status)
                })
            }
            else throw new Error('Форма смены пароля не корректно заполнена');
            // Останавливаем крутилку

        } catch (error) {
            // Логика обработки ошибок
        }
    }
}

