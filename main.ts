import './style.scss'
import { Router } from "./src/core/my_router"
import { Start_Page } from "./src/pages/start_page/start_page"
import { Register } from "./src/pages/register/register"
import { Authorization } from "./src/pages/authorization/authorization"
import Chats from "./src/pages/chats/chats"
import Profile from "./src/pages/profile/profile"
import { ChangePassword } from "./src/pages/change_password/change_password"
import auth_controller from './src/controllers/auth_controller'
const router = new Router('#app')
auth_controller.user_info()
.then(
    () => {
        console.log('dsjgfhblfdhgldfsg')
        router.use('/', Start_Page);
        router.use('/register', Register);
        router.use('/authorization', Authorization);
        router.use('/chats', Chats);
        router.use('/profile', Profile);
        router.use('/change_password', ChangePassword);
        router.start();
    }
);

