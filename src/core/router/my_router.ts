import { Block } from "../block/block";
import { Props , User, HttpStatus} from "../type";
import store from "../store";
import { renderDom, isEqual } from "../utils";

type Constructor<C = unknown, P = Props> = new (...args: P[]) => C

export class Route<C extends Block, P extends Props = Props> {
    private _pathname: string;
    private _blockClass: Constructor;
    private _block: C | null;
    private _props: P;
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

    error(props: Props) {
        this._block?.setProps(props)
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
    static __instance: unknown;
    private routes: Route<Block, Props>[];
    private history: History;
    private _currentRoute: Route<Block, Props> | null;
    private _rootQuery: string;

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance as Router;
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
        if (status != HttpStatus.Unauthorized) {
            this._onRoute('/error')
            const props = {
                code: status,
                title: 'Что-то пошло не так((',
                message: ''
            };
            switch (status) {
                case HttpStatus.NotFound:
                    props.title = 'Страница не найдена';
                    break;
                case HttpStatus.ServerError:
                    props.title = 'Ошибка обращения к сереверу';
                    props.message = 'Мы уже устраняем неисправность, попробуйте перезагрузить страницу через время.';
                    break;
            }
            this._currentRoute?.error(props)
        }
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);
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
        const user = store.getState().user as User;
        if (!user.login && !['/sign-up', '/',].includes(window.location.pathname)) {
            this.go('/')
        }
        else if (user.login && ['/sign-up', '/',].includes(window.location.pathname)) {
            this.go('/messenger')
        }
        { this._onRoute(window.location.pathname); }
    }
}

