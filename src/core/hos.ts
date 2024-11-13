import { Block } from "./block";
import {Store, StoreEvents} from "./store"
const store = new Store();

export function connect(Component: typeof Block) {
    // используем class expression
  return class extends Component {
    constructor(...args) {
            // не забываем передать все аргументы конструктора
      super(...args);

      // подписываемся на событие
        store.on(StoreEvents.Updated, () => {
          // вызываем обновление компонента, передав данные из хранилища
          this.setProps({...store.getState()});
            });
    }
  } 
} 