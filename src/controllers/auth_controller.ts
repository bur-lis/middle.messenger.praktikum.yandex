import auth_api from "../api/auth-api"
import store from "../core/store";
import { Router } from "../core/my_router";
import { Block } from "../core/block";
import { Response } from "../core/type";
import loading from "../components/loading/loading";
import { ValidateForm, GetJsonDataFromForm, renderDom } from "../core/utils";

const router = new Router('#app');

class AuthController {
  public async user_info() {
    try {
      await auth_api.info().then((response: Response) => {
        if (response.status === 200) {
          const user = JSON.parse(response.response);
          store.set('user', user)
          if (user.avatar) this.get_avatar_src(user.avatar)
        }
        else router.rederectToError(response.status)
      })

    } catch (error) {
      throw new Error(error);

    }
  }

  async get_avatar_src(src: string) {
    try {
      auth_api.get_avatar(src).then((response: Response) => {
        if (response.status === 200) {
          store.set('avatar_src', response.responseURL)
        }
        else router.rederectToError(response.status)
      })

    } catch (error) {
      throw new Error(error);
    }
  }

  public async registr(login_block: Block) {
    try {
      if (ValidateForm(login_block)) {
        const request_data = GetJsonDataFromForm('register_form');
        auth_api.sign_up(request_data).then((response: Response) => {
          if (response.status === 200) {
            this.user_info().then(() => { router.go('/chats'); });
          }
          else console.log(response.status);
          router.rederectToError(response.status)
        })
      }
      else throw new Error('Форма регистрации не корректно заполнена');
    } catch (error) {
      console.log(error)
      throw new Error(error);
    }
  }

  public async login(login_block: Block) {
    const log = new loading({})
    renderDom("#app", log)


    try {
      log.show()
      if (ValidateForm(login_block)) {
        const request_data = GetJsonDataFromForm('authorization_form');
        auth_api.sign_in(request_data).then((response: Response) => {
          if (response.status === 200) {
            this.user_info().then(() => { router.go('/chats'); log.hide(); });
          }
          else { router.rederectToError(response.status); log.hide(); }
        })

      }
      else throw new Error('Форма авторизации не корректно заполнена');

    } catch (error) {
      throw new Error(error);
    }
  }


  public async logout() {
    try {

      auth_api.sign_out().then((response: Response) => {
        if (response.status === 200) {
          window.location.replace('/')
        }
        else router.rederectToError(response.status)
      })
    } catch (error) {
      throw new Error(error);
    }
  }
}


export default new AuthController(); 