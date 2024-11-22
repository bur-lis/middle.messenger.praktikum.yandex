import { RegisterAPI } from "../api/register-api"
import { Router } from "../core/my_router";
import { Block } from "../core/block";
import { ValidateForm, RederectToError, GetJsonDataFromForm } from "../core/utils";
const authorization_api = new RegisterAPI();

const router = new Router('#app');

export class RegisterController {

    public async registr(login_block: Block) {
        try {
            // Запускаем крутилку  

            if (ValidateForm(login_block)) {
                const request_data = GetJsonDataFromForm('register_form');
                authorization_api.create(request_data).then((response: Response) => {
                    if (response.status === 200) {
                        router.go('/chats');
                    }
                    else RederectToError(response.status)
                })
            }
            else throw new Error('Форма регистрации не корректно заполнена');
            // Останавливаем крутилку

        } catch (error) {
            // Логика обработки ошибок
        }
    }
}
