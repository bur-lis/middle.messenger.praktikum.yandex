import {renderDom} from '../../core/utils'
import { ErrorTemplate } from '../../components/error_template/error_template';

const server_errors = new ErrorTemplate({
    code: '500',
    title: 'Ошибка обращения к сереверу',
    message: 'Мы уже устраняем неисправность, попробуйте перезагрузить страницу через время.'
});

// renderDom("#app", server_errors);

