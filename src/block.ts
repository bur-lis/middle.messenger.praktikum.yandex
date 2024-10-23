import { EventBus } from './event_bus';
export type Props = Record<string, PropsValue>;

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
  props: Props;
  _meta: {
    tagName: string;
    props: Props;
  };

  constructor(tagName = "div", propsAndChildren = {}) {
    const { children, props } = this._getChildren(propsAndChildren);
    console.log(tagName)
    console.log(children)
    this.children = children;


    const eventBus = new EventBus();
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
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
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
    const block = this.render();
    // Этот небезопасный метод для упрощения логики
    // Используйте шаблонизатор из npm или напишите свой безопасный
    // Нужно не в строку компилировать (или делать это правильно),
    // либо сразу в DOM-элементы возвращать из compile DOM-ноду
    this._element.innerHTML = block;
    this._addEvents();
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
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    console.log('tagName',tagName)
    console.log('tagName',this)
    if (tagName === '')  console.log('vaaaaaaaa')
    else return document.createElement(tagName);
    }
  //   console.log(tagName)
  //   if (typeof tagName === 'string') {
  //     console.log("sss")
  //     return document.createElement(tagName);
  //   }
  //   else Object.keys(tagName).forEach(function (tag) {
  //     return document.createElement(tag);
  //   });
  // }

  compile(template, props) {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
        propsAndStubs[key] = `<div data-id="${child.id}"></div>`
    });

    const fragment = this._createDocumentElement('template');

    fragment.innerHTML = Handlebars.compile(template, propsAndStubs);

    Object.values(this.children).forEach(child => {
        const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);
        
        stub.replaceWith(child.getContent());
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