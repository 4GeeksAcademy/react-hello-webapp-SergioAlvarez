export const initialStore=()=>{
  return{
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ],
    saludo: "hola",
    contactList: []
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

        case "cambiarDatosStore":
        return {
          ...store,
          
        }
    default:
      throw Error('Unknown action.');
  }    
}
