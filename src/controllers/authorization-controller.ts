import { AuthorizationAPI } from "../api/authorization-api"
import { Router } from "../core/my_router";
import { Block } from "../core/block";
import { ValidateForm, RederectToError, GetJsonDataFromForm } from "../core/utils";
const authorization_api = new AuthorizationAPI();
interface Response {
  status: number,
}
const router = new Router('#app');

export class AuthorizationController {

  public async login(login_block: Block) {
    try {
      // Запускаем крутилку 

      if (ValidateForm(login_block)) {
        const request_data = GetJsonDataFromForm('authorization_form');
        authorization_api.create(request_data).then((response: Response) => {
          if (response.status === 200) {
            router.go('/chats');
          }
          else RederectToError(response.status)
        })
      }
      else throw new Error('Форма авторизации не корректно заполнена');
      // Останавливаем крутилку
    } catch (error) {
      // Логика обработки ошибок
    }
  }
}
