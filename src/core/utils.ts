
import { Block } from './block';

export function renderDom(query: string, block: Block) {
    const root = document.querySelector(query) ? document.querySelector(query) : document.body;
    root?.appendChild(block.getContent());
    return root;
}
export function isEqual(lhs:string, rhs:string) {
    return lhs === rhs;
  }

export function FormDatatoConsole(page_block: Block, form_id:string) {
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
export function ReturnFormData(page_block: Block, form_id:string) {
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
        return form_data;
    }
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

