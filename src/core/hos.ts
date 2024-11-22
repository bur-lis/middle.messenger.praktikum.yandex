import { Block } from "./block";
import { Props, Indexed } from "./type";
import store, {StoreEvents} from "./store"

// export function connect(Component: typeof Block, mapStateToProps: (state: Indexed) => Indexed) {
  // используем class expression
// return class extends Component {
//   constructor(props:Props) {
//     super({...props, ...mapStateToProps(store.getState())});

//     // подписываемся на событие
//       store.on(StoreEvents.Updated, () => {
//         // вызываем обновление компонента, передав данные из хранилища
//         this.setProps({...mapStateToProps.call(this,store.getState())});
//           });
//   }
// } 
// }


export function connect(tag:string, Component: typeof Block, mapStateToProps: (state: Indexed) => Indexed) {
  // используем class expression
return class extends Component {
  constructor(props:Props) {
    super(tag,{...props, ...mapStateToProps(store.getState())});

    // подписываемся на событие
      store.on(StoreEvents.Updated, () => {
        // вызываем обновление компонента, передав данные из хранилища
        this.setProps({...mapStateToProps.call(this,store.getState())});
          });
  }
} 
}