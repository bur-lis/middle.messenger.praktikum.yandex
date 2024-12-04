import './style.scss'
import { Router } from "./src/core/my_router"
import { Register } from "./src/pages/register/register"
import { Authorization } from "./src/pages/authorization/authorization"
import Chats from "./src/pages/chats/chats"
import Profile from "./src/pages/profile/profile"
import { ChangePassword } from "./src/pages/change_password/change_password"
import auth_controller from './src/controllers/auth_controller'
import { ErrorTemplate } from './src/components/error_template/error_template'
const router = new Router('#app')
auth_controller.user_info()
.then(
    () => {
        router.use('/sign-up', Register);
        router.use('/', Authorization);
        router.use('/messenger', Chats);
        router.use('/settings', Profile);
        router.use('/change_password', ChangePassword);
        router.use('/error', ErrorTemplate);
        router.start();
    }
);

