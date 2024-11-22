
import { Block } from './block';
import { Router } from './my_router';
import { ErrorTemplate } from '../components/error_template/error_template';
import store from './store';

export function renderDom(query: string, block: Block) {
    const root = document.querySelector(query) ? document.querySelector(query) : document.body;
    root?.appendChild(block.getContent());
    return root;
}

export function isEqual(lhs: string, rhs: string) {
    return lhs === rhs;
}
export function AddAvatarInStore(file_input: File, new_flag = false) {
    var reader = new FileReader();
    reader.onload = function (e) {
        store.set('avatar_src', e.target!.result)
        if (new_flag) { store.set('avatar_file', file_input) }
    }

    reader.readAsDataURL(file_input);
}
export function FormDatatoConsole(page_block: Block, form_id: string) {
    const page_children = page_block.children;
    let form_valid = true;
    Object.keys(page_children).forEach((input_block_name: string) => {
        const child = page_children[input_block_name];
        if (child.props.regexp) {
            form_valid = form_valid && Validate(child);
        }
    })



    if (form_valid) {
        const form = document.getElementById(form_id) as HTMLFormElement;
        console.log(form)
        const form_data = form ? new FormData(form) : 'Форма не найдена ';
        console.log(form_data);
    }
}
export function ValidateForm(page_block: Block): boolean {
    const page_children = page_block.children;
    let form_valid = true;
    Object.keys(page_children).forEach((input_block_name: string) => {
        const child = page_children[input_block_name];
        if (child.props.regexp) {
            form_valid = form_valid && Validate(child);
        }
    })

    return form_valid;
}
export function GetJsonDataFromForm(form_name: string) {
    const form = document.getElementById(form_name) as HTMLFormElement;
    const form_data = new FormData(form);
    var object: Record<string, string> = {};
    form_data.forEach(function (value, key) {
        object[key] = value as string;
    });
    return object // Object.fromEntries(form_data) as Record<string, string>;
}
export function RederectToError(status: number) {
    // const router = new Router('#app')
    let props = {
        code: status,
        title: 'Что-то пошло не так((',
        message: ''
    };
    switch (status) {
        case 400:
            props.title = 'Страница не найдена';
            break;
        case 500:
            props.title = 'Ошибка обращения к сереверу';
            props.message = 'Мы уже устраняем неисправность, попробуйте перезагрузить страницу через время.';
            break;
    }
    const client_errors = new ErrorTemplate(props);

    renderDom("#app", client_errors);
}

export function NotificationMassage(massege: string) {
    alert(massege)
}

export function Validate(input_block: Block) {

    const input: HTMLInputElement = input_block.children.input.element.firstElementChild as HTMLInputElement;
    const regexp = new RegExp(typeof input_block.props.regexp === 'string' ? input_block.props.regexp : '');

    if (regexp.test(input.value)) {
        if (input_block.props.display_error_label !== 'none') {
            input_block.setProps({ display_error_label: 'none' });
            input?.classList.remove('error')
        }
        return true;
    }
    else {
        if (input_block.props.display_error_label !== 'block') {
            input_block.setProps({ display_error_label: 'block' });
            input?.classList.add('error')
        }
        return false;
    }

}

