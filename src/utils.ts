export function renderDom(query:string, block:Block) {
    const root: HTMLElement = document.querySelector(query) ? document.querySelector(query) : document.body;
    root.appendChild(block.getContent());
    return root;
}

export function Validate(input_block: Block, regexp: string) {
    console.log(input_block, input_block.children.input)
    input_block.setProps({ display_error_label: 'block' });
    input_block.children.input.setProps({ class: 'error' })

}