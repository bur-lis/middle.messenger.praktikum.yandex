import { Indexed } from "../type";
import { EventBus } from "../event_bus";

export enum StoreEvents {
    Updated = 'updated',
  }  

export class Store extends EventBus {
    private state: Indexed = {user:{}};

    public getState() {
        return this.state;
    }

    public set(path: string, value: unknown) {
        console.log(this.state, path, value)
        set(this.state, path, value);
        this.emit(StoreEvents.Updated);
    };


}

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
    for (const p in rhs) {
        if (!Object.prototype.hasOwnProperty.call(rhs, p)) {
            continue;
        }

        try {
            if (rhs[p]?.constructor === Object) {
                rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
            } else {
                lhs[p] = rhs[p];
            }
        } catch (error) {
            // throw new Error(error);
            lhs[p] = rhs[p];
            console.log(error)
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

    const result = path.split('.').reduceRight((acc, key) => ({
        [key]: acc,
    }), value)as Indexed;
    return merge(object as Indexed, result);
}
export default new Store(); 

