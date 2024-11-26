import { Block } from "./block";
import { Props } from "./type";
import store from "./store";
import { renderDom, isEqual } from "./utils";

type Constructor<C = unknown, P = Props> = new (...args: P[]) => C

export class Route<C extends Block, P extends Props = Props> {
    _pathname: string;
    _blockClass: Constructor;
    _block: C | null;
    _props: P;
    constructor(pathname: string, view: Constructor, props: P) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname: string) {
        return isEqual(pathname, this._pathname);
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass(this._props) as C;
            renderDom(this._props.rootQuery as string, this._block);
            return;
        }

        this._block.show();
    }
}

export class Router {
    routes: Route<Block, Props>[];
    history: History;
    _currentRoute: Route<Block, Props> | null;
    _rootQuery: string;
    __instance: Router;

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname: string, block: Constructor, props: Props = {}) {
        props.rootQuery = this._rootQuery;
        const route = new Route(pathname, block, props);

        this.routes.push(route);

        return this;
    }

    start() {
        window.onpopstate = (() => { this.isLogin() }).bind(this);
        this.isLogin();
    }
    rederectToError(status: number) {
        if (status != 401) {
            this._onRoute('/error')
            let props = {
                code: status,
                title: 'Что-то пошло не так((',
                message: ''
            };
            switch (status) {
                case 404:
                    props.title = 'Страница не найдена';
                    break;
                case 500:
                    props.title = 'Ошибка обращения к сереверу';
                    props.message = 'Мы уже устраняем неисправность, попробуйте перезагрузить страницу через время.';
                    break;
            }
            this._currentRoute?._block?.setProps(props)
        }
    }

    _onRoute(pathname: string) {
        let route = this.getRoute(pathname);
        if (!route) {
            this.rederectToError(404);
            return;
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route as Route<Block, Props>;
        route!.render();
    }

    go(pathname: string) {
        this.history.pushState({}, '', pathname);
        this.isLogin()
        // this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname));
    }
    isLogin() {
        if (!store.getState().user.login && !['/register', '/authorization', '/'].includes(window.location.pathname)) {
            this.go('/')
        }
        else { this._onRoute(window.location.pathname); }
    }
}

