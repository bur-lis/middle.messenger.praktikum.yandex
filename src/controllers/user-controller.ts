import { UserAPI } from "../api/user-api";
import { Router } from "../core/my_router";
import { Block } from "../core/block";
import { Response } from "../core/type";
import store, { StoreEvents } from '../core/store';
import { ValidateForm, RederectToError, GetJsonDataFromForm } from "../core/utils";

const user_api = new UserAPI();
// const store = new Store();

const router = new Router('#app');

export class CurrentUser {
    public async info() {
        try {
            // Запускаем крутилку  

            let user;//.then(({user_id}) => user_id);
            user_api.request().then((response: Response) => {
                if (response.status === 200) {
                    console.log(response)
                    user = response.response;
                    // 
                    console.log('fbg')
                    store.set('user', JSON.parse(user))

                    console.log(user)
                    // Останавливаем крутилку
                }
                else RederectToError(response.status)
            })

        } catch (error) {
            // Логика обработки ошибок
        }
    }

    // public async registr(login_block: Block) {
    //     try {
    //         // Запускаем крутилку  

    //         if (ValidateForm(login_block)) {
    //             const request_data = GetJsonDataFromForm('register_form');
    //             user_api.create(request_data).then((response: Response) => {
    //                 if (response.status === 200) {
    //                     router.go('/chats');
    //                 }
    //                 else RederectToError(response.status)
    //             })
    //         }
    //         else throw new Error('Форма регистрации не корректно заполнена');
    //         // Останавливаем крутилку

    //     } catch (error) {
    //         // Логика обработки ошибок
    //     }
    // }
}

