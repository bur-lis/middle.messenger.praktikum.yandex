import { EventBus } from './event_bus';
export type Props = Record<string, PropsValue>;

import { v4 as makeUUID } from 'uuid';
import Handlebars from 'handlebars';

type PropsValue = string | Callback | Record<string, Callback>//{[key: string]: Callback};
type Callback = (args: string | undefined) => void;

export class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };

  readonly eventBus: () => EventBus;
  _element: HTMLElement;
  _id = null;
  props: Props;
  _meta: {
    tagName: string;
    props: Props;
  };

  constructor(tagName = "div", propsAndChildren = {}) {
    const { children, props } = this._getChildren(propsAndChildren);
    this.children = children;


    const eventBus = new EventBus();
    this._id = makeUUID();
    this.props = this._makePropsProxy({ ...props, __id: this._id });
    this._meta = {
      tagName,
      props
    };
    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _getChildren(propsAndChildren) {
    const children = {};
    const props = {};
  

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      console.log(value)
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });
  console.log('ffff',children, props)
    return { children, props };
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
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

    Object.values(this.children).forEach(child => {
      child.dispatchComponentDidMount();
    });

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
  //  componentDidUpdate(oldProps: Props, newProps: Props) {
  componentDidUpdate(oldProps: Props, newProps: Props) {
    console.log(oldProps, newProps)
    return true;
  }

  setProps: (arg0: Props) => void = nextProps => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }
  render(): string { return '' }
  _render() {
    const block = this.render(); // render теперь возвращает DocumentFragment

    // // this._removeEvents();
    // this._element.innerHTML = ''; // удаляем предыдущее содержимое
    // console.log(block)

    // this._element.appendChild(block);

    // this._addEvents();
    this._element.innerHTML = block;
  }

  _addEvents() {
    const { events = {} } = this.props;
    Object.keys(events).forEach((eventName: string) => {
      this._element.addEventListener(eventName, events[eventName]);
    });
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: Props) {

    return new Proxy(props, {
      get(target: Props, prop: keyof Props) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },

      set(target: Props, prop: keyof Props, value: string) {
        target[prop] = value;

        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      }
    });
  }

  _createDocumentElement(tagName: string): HTMLElement {
    const element = document.createElement(tagName);
    if (this.props.settings) element.setAttribute('data-id', this._id);
    return element;
  }


  compile(template, props) {
    if (typeof props == 'undefined') props = this.props;
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`
    });


    const fragment = this._createDocumentElement('template');

    fragment.innerHTML = Handlebars.compile(template, propsAndStubs);
    Object.values(this.children).forEach(child => {
      console.log('child' ,child)
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      if (stub) stub.replaceWith(child.getContent());
    });

    return fragment.content;
    // return Handlebars.compile(template, propsAndStubs);
  }
  show() {
    this.getContent().style.display = "block";
  }

  hide() {
    this.getContent().style.display = "none";
  }
}