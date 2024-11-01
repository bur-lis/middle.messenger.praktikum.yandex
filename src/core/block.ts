import { Props, PropsValue, Children} from './type.js';
import { EventBus } from './event_bus.js';
import { v4 as makeUUID } from 'uuid';

export class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };

  readonly eventBus: () => EventBus;
  _element: HTMLElement;
  props: Props;
  children: Children;
  _meta: {
    tagName: string;
    props: Props;
  };
  _id: string;

  /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */

  constructor(tagName = "div", propsAndChildren = {}) {

    this._id = makeUUID();
    const { children, props } = this._getChildren(propsAndChildren);
    if (children) {
      this.children = children;
    }
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props
    };
    this.props = this._makePropsProxy({ ...props, __id: this._id });

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _getChildren(propsAndChildren: Record<string, Props>) {
    const children: Children = {};
    const props: Props = {};
    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value as PropsValue;
      }
    });
    return { children, props };
  }


  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }
  _addEvents() {
    const events = this.props.events as Record<string, () => void>;
    if (events) {
      Object.keys(events).forEach((eventName: string) => {
        this._element.children[0].addEventListener(eventName, events[eventName]);
      });
    }

  }

  private _removeEvents() {
    const events = this.props.events as Record<string, () => void>;;

    if (events) {
      Object.keys(events).forEach((eventName: string) => {
        this._element.removeEventListener(eventName, events[eventName]);
      });
    }
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    this._createResources();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() { }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: Props, newProps: Props) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(oldProps: Props, newProps: Props) {
    console.log(oldProps, newProps)
    return true;
  }

  setProps = (nextProps: Props) => {
    if (!nextProps) {
      return;
    }
    
    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    const block: DocumentFragment = this.render();
    this._removeEvents();
    this._element.innerHTML = '';
    this._element.appendChild(block);
    this._addEvents();
  }

  render(): DocumentFragment {
    return document.createElement('template').content
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: Props) {
    return new Proxy(props, {
      get: (target: Props, prop: keyof Props) => {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set: (target: Props, prop: keyof Props, value) => {
        target[prop] = value;
        this.eventBus().emit(Block.EVENTS.FLOW_CDU, target);
        return true;
      },
      deleteProperty: () => {
        throw new Error("Нет доступа");
      }
    });
  }
 
  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }


  compile(template: unknown, props: Props) {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {

      propsAndStubs[key] = `<div data-id="${child._id}"></div>`
    });

    const fragment: HTMLTemplateElement = this._createDocumentElement('template') as HTMLTemplateElement;

    fragment.innerHTML = MYcompile(template, propsAndStubs);


    Object.values(this.children).forEach(child => {
      const stub: HTMLElement | null = fragment.content.querySelector(`[data-id="${child._id}"]`);
      if (stub) stub.replaceWith(child.getContent());
    });

    return fragment.content;
  }

  show() {
    this.getContent().style.display = "block";
  }

  hide() {
    this.getContent().style.display = "none";
  }
}

export function MYcompile<T>(file_hbs: unknown, options?: Record<string, T>): string {
  if (typeof file_hbs === 'function') {
    return file_hbs(options);
  }
  if (typeof file_hbs === 'string') {
    console.log('file_hbs typeof string')
  }
  return '';
}

