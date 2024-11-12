import './style.scss'
import { Router } from "./src/core/my_router"
import { Authorization } from "./src/pages/authorization/authorization"
import { Register } from "./src/pages/register/register"
import { Chat } from "./src/pages/chat/chat"
import { Profile } from "./src/pages/profile/profile"
import { ChangePassword } from "./src/pages/change_password/change_password"

import { Start_Page } from "./src/pages/start_page/start_page"
const router = new Router('#app')

router.use('/', Start_Page);
router.use('/authorization', Authorization);
router.use('/register', Register);
router.use('/chat', Chat, {
    display_name: 'Вадим', message: {
        '14 июня': [{
            output: false,
            message: 'Равным образом постоянный количественный рост и сфера нашей активности  представляет собой интересный эксперимент проверки дальнейших  направлений развития.'
            ,
            time: '12:34'
        }],
        '19 июня': [{
            output: true,
            message: 'Значимость этих проблем настолько очевидна, что постоянное  информационно-пропагандистское обеспечение нашей деятельности  обеспечивает широкому кругу (специалистов) участие в формировании модели развития.        Значимость этих проблем настолько очевидна, что постоянный  количественный рост и сфера нашей активности играет важную роль в  формировании форм развития.'
            ,
            time: '11:09'
        }, {
            output: false,
            message: 'Идейные соображения высшего порядка, а также начало повседневной  работы по формированию позиции позволяет оценить значение дальнейших  направлений развития.        '
            ,
            time: '11:50'
        }, {
            output: true,
            message: 'Разнообразный и богатый опыт консультация с широким активом в  значительной степени обуславливает создание направлений прогрессивного  развития.'
            ,
            time: '11:58'
        }, {
            output: false,
            message: 'Круто!',
            time: '11:59'
        }],
    },
});
router.use('/profile', Profile);
router.use('/change_password', ChangePassword);



router.start();
console.log(window.location.pathname)
router.go(window.location.pathname);
