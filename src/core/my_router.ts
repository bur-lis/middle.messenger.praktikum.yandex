import { Block } from "./block";
import { Props } from "./type";
import { renderDom, isEqual } from "./utils";

type Constructor<C = unknown, P = Props> = new ( ...args: P[]) => C

export class Route <C extends Block, P extends Props = Props> {
    _pathname:string;
    _blockClass:Constructor;
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

    match(pathname:string) {
        return isEqual(pathname, this._pathname);
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass(this._props);
            console.log(this._block);
            renderDom(this._props.rootQuery as string, this._block);
            return;
        }

        this._block.show();
    }
}

export class Router {
    routes:Route[];
    history:History;
    _currentRoute:Route | null;
    _rootQuery:string;

    constructor(rootQuery:string) {
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
        window.onpopstate = (event => {
            this._onRoute(event.currentTarget.location.pathname);
        }).bind(this);

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname:string) {
        const route = this.getRoute(pathname);
        if (!route) {
            return;
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
         route.render(route, pathname);
    }

    go(pathname:string) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname:string) {
        return this.routes.find(route => route.match(pathname));
    }
}



  
