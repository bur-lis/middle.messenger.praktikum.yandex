import {AuthorizationAPI} from "../api/authorization-api"
import { Router } from "../core/my_router";
const authorization_api = new AuthorizationAPI();
// const userLoginValidator = validateLoginFields(validateRules);
interface LoginFormModel {
    email: string;
    password: string;
  }
const router = new Router('#app');

export class AuthorizationController{

     public async login(data: LoginFormModel) {
        try {
            // Запускаем крутилку            

            // const validateData = userLoginValidator(data);

            // if (!validateData.isCorrect) {
            //     throw new Error(validateData);
            // }
        
            // const userID = authorization_api.request(prepareDataToRequest(data));
            const userID = authorization_api.create(data)
            console.log(userID)
            router.go('/chats');

            // Останавливаем крутилку
        } catch (error) {
            // Логика обработки ошибок
    }
  }
}
// class UserLoginController {
//  
// }


// class UserController {
//     public getUser() {
//       UserAPI.getUser()
//                .then(data => store.set('user', data);
//     }
//   } 