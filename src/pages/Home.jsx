import { useEffect, useReducer, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const { idUsuarioCreado } = useParams();

  // store y dispatch son como un useState
  // en un useState tendriamos => const [hola, setHola] = useState
  // store seria hola, funciona como una variable que tiene un array de objetos, donde podemos acceder a ella para retornar cualquier info que guardemos.
  // dispatch seria setHola, aqui, a traves de "case" que definimos en nuestro archivo store, podriamos decidir que guardamos en hola, por medio de funciones.

  useEffect(() => {
    const llamadaContactos = () => {
      return fetch(
        `https://playground.4geeks.com/contact/agendas/agendaSergio`,
        {
          method: "GET",
        }
      )
        .then((response) => {
          console.log(response);
          if (!response.ok) {
            return []
          }
          return response.json();
        })
        .then((data) => {
          console.log(data.contacts);
          return data.contacts || [];
        })
        .catch((err) => {
          console.log(err);
          return [];
        });
    };
    llamadaContactos().then((response) => {
      console.log(response);
      dispatch({
        type: "almacenarDatos",
        payload: [...store.contactList, ...response],
      });
      console.log(store.contactList);
    });
  }, []);

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
      <h2></h2>
      <div className="container m-2">
        <button
          onClick={() => {
            return console.log(store.contactList);
          }}
        >
          magia
        </button>
        <ul>
          {store.contactList.map((i) => {
            return (
              <div key={i.id} className="container card m-2">
                <p>{i.name}</p>
                <p>{i.address}</p>
                <p>{i.phone}</p>
                <p>{i.email}</p>
                <div>
                  <button
                    className="btn btn-warning"
                    onClick={() => {
                      navigate(`/contact-edit/${i.id}`);
                    }}
                  >
                    <i className="fa-solid fa-pencil"></i>
                  </button>
                </div>
              </div>
            );
          })}
        </ul>
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
