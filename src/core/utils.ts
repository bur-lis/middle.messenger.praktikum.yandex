
import { Block } from './block/block';
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
    const reader = new FileReader();
    reader.onload = function (e) {
        store.set('avatar_src', e.target!.result)
        if (new_flag) { store.set('avatar_file', file_input) }
    }

    reader.readAsDataURL(file_input);
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
    const object: Record<string, string> = {};
    form_data.forEach(function (value, key) {
        object[key] = value as string;
    });
    return object;
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

export function NotificationMassage(massege: string) {
    alert(massege)
}

