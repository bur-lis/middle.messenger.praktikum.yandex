import { Block } from "./block";
import { Props, Indexed } from "./type";
import store, { StoreEvents } from "./store"

export function connect(tag: string, Component: typeof Block, mapStateToProps: (state: Indexed) => Indexed) {
  return class extends Component {
    constructor(props: Props) {
      store.on(StoreEvents.Updated, () => {
        this.setProps({ ...mapStateToProps.call(this, store.getState()) });
      });
      super(tag, { ...props, ...mapStateToProps(store.getState()) });

    }
  }
}

