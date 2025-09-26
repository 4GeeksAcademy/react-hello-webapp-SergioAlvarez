export const initialStore=()=>{
  return{
    message: null,
    saludo: "hola",
    contactList: [],
    usuario: ''
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'add_task':

      const { id,  color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };

      case "almacenarDatos":
        return {
          ...store,
          contactList: action.payload
          
        }

        case 'actualizar':
          const {indexConcreto} = action.payload
        return {
          ...store,
          contactList: store.contactList.filter((_,i)=>i !== indexConcreto )
        }

        case 'cambiarStore':
          return {...store,
            ejemplo: action.payload
          }

          case 'crearContacto':
            return {
              ...store,
              usuario: action.payload
            }
    default:
      throw Error('Unknown action.');
  }    
}
