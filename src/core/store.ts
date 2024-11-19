type Indexed<T = any> = {
    [key in string]: T;
};

import { EventBus } from "./event_bus";

export enum StoreEvents {
    Updated = 'updated',
  }  

export class Store extends EventBus {
    private state: Indexed = {};

    public getState() {
        return this.state;
    }

    public set(path: string, value: unknown) {
        console.log(set(this.state, path, value))
        set(this.state, path, value);
        
        console.log('this.emit')
        this.emit(StoreEvents.Updated);
    };


}

function merge(lhs: Indexed, rhs: Indexed): Indexed {
    for (let p in rhs) {
        if (!rhs.hasOwnProperty(p)) {
            continue;
        }

        try {
            if (rhs[p].constructor === Object) {
                rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
            } else {
                lhs[p] = rhs[p];
            }
        } catch (e) {
            lhs[p] = rhs[p];
        }
    }

    return lhs;
}

function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
    if (typeof object !== 'object' || object === null) {
        return object;
    }

    if (typeof path !== 'string') {
        throw new Error('path must be string');
    }

    const result = path.split('.').reduceRight<Indexed>((acc, key) => ({
        [key]: acc,
    }), value as any);
    return merge(object as Indexed, result);
}

export default new Store(); 