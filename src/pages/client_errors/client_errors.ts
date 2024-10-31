import { renderDom } from '../../core/utils'
import { ErrorTemplate } from '../../components/error_template/error_template';

const client_errors = new ErrorTemplate({
    code: '400',
    title: 'Страница не найдена',
    message: ''
});

renderDom("#app", client_errors);