import auth_api from "../api/auth-api"
import store from "../core/store";
import { Router } from "../core/my_router";
import { Block } from "../core/block";
import { Response, HttpStatus } from "../core/type";
import loading from "../components/loading/loading";
import { ValidateForm, GetJsonDataFromForm, renderDom } from "../core/utils";

const router = new Router('#app');
const log = new loading({});
renderDom("#app", log);
log.hide();

class AuthController {
  public async user_info() {
    try {
      await auth_api.info().then((response: Response) => {
        if (response.status === HttpStatus.OK) {
          const user = JSON.parse(response.response);
          if (user.avatar) this.get_avatar_src(user.avatar)
          store.set('user', user)
        }
        else router.rederectToError(response.status)
      })

    } catch (error) {
      console.log(error)
    }
  }

  async get_avatar_src(src: string) {
    try {
      console.log(src)
      auth_api.get_avatar(src).then((response: Response) => {
        if (response.status === HttpStatus.OK) {
          store.set('avatar_src', response.responseURL)
        }
        else router.rederectToError(response.status)
      })

    } catch (error) {
      console.log(error)
    }
  }

  public async registr(login_block: Block) {
    try {
      if (ValidateForm(login_block)) {
        log.show()
        const request_data = GetJsonDataFromForm('register_form');
        auth_api.sign_up(request_data).then((response: Response) => {
          if (response.status === HttpStatus.OK) {
            this.user_info().then(() => { router.go('/messenger'); log.hide(); });
          }
          else { router.rederectToError(response.status); log.hide(); }
        })
      }
      else throw new Error('Форма регистрации не корректно заполнена');
    } catch (error) {
      console.log(error)
    }
  }

  public async login(login_block: Block) {


    try {
      if (ValidateForm(login_block)) {
        log.show()
        const request_data = GetJsonDataFromForm('authorization_form');
        auth_api.sign_in(request_data).then((response: Response) => {
          if (response.status === HttpStatus.OK) {
            this.user_info().then(() => { router.go('/messenger'); log.hide(); });
          }
          else { router.rederectToError(response.status); log.hide(); }
        })

      }
      else throw new Error('Форма авторизации не корректно заполнена');

    } catch (error) {
      console.log(error)
    }
  }


  public async logout() {
    try {

      auth_api.sign_out().then((response: Response) => {
        if (response.status === HttpStatus.OK) {
          window.location.replace('/')
        }
        else router.rederectToError(response.status)
      })
    } catch (error) {
      console.log(error)
    }
  }
}


export default new AuthController();

