import './style.scss'
import {Router} from "./src/core/my_router"
import {Authorization} from "./src/pages/authorization/authorization"
import {Start_Page} from "./src/pages/start_page/start_page"
const router = new Router('#app')
router.use('main1', Authorization );
console.log(window.location.pathname )
router.use('/', Start_Page );
router.start();
router.go(window.location.pathname);
setTimeout(()=>{router.go('main1');},2000)
