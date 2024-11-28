import chats_api from "../api/chats-api"
import { Router} from "../core/my_router";
import { Response } from "../core/type";
import store from "../core/store";
import { Block } from "../core/block";
import { ValidateForm, GetJsonDataFromForm } from "../core/utils";

const router = new Router('#app');

export class ChatsController {

    public async get_chats() {
        try {
                chats_api.request({offset:0}).then((response: Response) => {
                    if (response.status === 200) {
                        const chats = response.response;
                        store.set('chats', JSON.parse(chats))
                    }
                    else router.rederectToError(response.status)
                })

        } catch (error) {
            // Логика обработки ошибок
        }
    }

    public async create(title:string) {
        try {
            await  chats_api.create({title:title}).then((response: Response) => {
                    if (response.status === 200) {
                        this.get_chats();
                    }
                    else router.rederectToError(response.status)
                })

        } catch (error) {
            // Логика обработки ошибок
        }
    }

    // public async get_chats(login_block: Block) {
    //     try {
    //         // Запускаем крутилку  

    //         if (ValidateForm(login_block)) {
    //             const request_data = GetJsonDataFromForm('register_form');
    //             chats_api.create(request_data).then((response: Response) => {
    //                 if (response.status === 200) {
    //                     router.go('/chats');
    //                 }
    //                 else router.rederectToError(response.status)
    //             })
    //         }
    //         else throw new Error('Форма регистрации не корректно заполнена');
    //         // Останавливаем крутилку

    //     } catch (error) {
    //         // Логика обработки ошибок
    //     }
    // }
}


export default new ChatsController(); 