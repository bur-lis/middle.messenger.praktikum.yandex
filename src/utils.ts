export function renderDom(query:string, block:Block) {
    const root: HTMLElement = document.querySelector(query) ? document.querySelector(query) : document.body;
    root.appendChild(block.getContent());
    return root;
}