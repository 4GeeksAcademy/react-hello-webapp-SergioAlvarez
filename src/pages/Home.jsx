import { useEffect, useReducer, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";


export const Home = () => {
  const { store, dispatch } = useGlobalReducer()
  const [contactos, setContactos] = useState([]);
  const navigate = useNavigate();
  const { idUsuarioCreado } = useParams();


  // store y dispatch son como un useState
  // en un useState tendriamos => const [hola, setHola] = useState
  // store seria hola, funciona como una variable que tiene un array de objetos, donde podemos acceder a ella para retornar cualquier info que guardemos.
  // dispatch seria setHola, aqui, a traves de "case" que definimos en nuestro archivo store, podriamos decidir que guardamos en hola, por medio de funciones.

  useEffect(() => {
    
    llamadaContactos()
    .then((response)=>{
      dispatch({
        type: 'almacenarDatos',
        payload: [...store.contactList,
          ...response]
          
        })
      })
      console.log(store.contactList[0]);
    }, []);
    
    const llamadaContactos = () => {
      return fetch(`https://playground.4geeks.com/contact/agendas/agendaSergio`, {
        method: "GET",
      })
        .then((response) => {
          console.log(response);
          if(!response.ok){
            return []
          } 
          return response.json();
        })
        .then((data) => {
          console.log(data)
         return data.contacts || []
        })
        .catch((err) => {
          console.log(err);
          return [];
        });
      };
    
    
    // const manejarDatos = ()=>{
    //   llamadaContactos()
    // }

  const eliminarContacto = (id) => {
    fetch(
      `https://playground.4geeks.com/contact/agendas/agendaSergio/contacts/${id}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        console.log(response);
        return null;
      })
      .then((data) => {
        navigate("/");
        return llamadaContactos();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container m-5">
      <h1>Contact List</h1>
      <div className="container m-2">
        {contactos.map((value) => {
          return (
            <div key={value.id} className="container m-2 card">
              <div>
                <p>{value.name}</p>
                <p>{value.phone}</p>
                <p>{value.address}</p>
                <p>{value.id}</p>
              </div>

              <div className="d-flex gap-2">
                <div>
                  <button
                    className="btn btn-warning"
                    onClick={() => {
                      navigate(`/contact-edit/${value.id}`);
                    }}
                  >
                    <i className="fa-solid fa-pencil"></i>
                  </button>
                </div>

                <div>
                  <button type="button" className="btn btn-danger">
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Mejor no, este me cae bien
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          return eliminarContacto(value.id);
                        }}
                        type="button"
                        className="btn btn-danger"
                      >
                        Bye Bye
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <button
                onClick={() => {
                  console.log(value);
                }}
              >
                prueba
              </button>
            </div>
          );
        })}
      </div>
      <div className="container text-center m-2">
        <button
          className="btn btn-success container"
          onClick={() => {
            return navigate("/add-contact");
          }}
        >
          Agregar Nuevo contacto
        </button>
      </div>
    </div>
  );
};
