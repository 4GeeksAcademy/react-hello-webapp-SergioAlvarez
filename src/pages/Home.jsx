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

  const llamadaContactos = () => {
    return fetch(`https://playground.4geeks.com/contact/agendas/agendaSergio`, {
      method: "GET",
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          return [];
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
  useEffect(() => {
    llamadaContactos().then((response) => {
      console.log(response);
      dispatch({
        type: "almacenarDatos",
        payload: response,
      });
      console.log(response);
    });
  }, []);

  const eliminarContacto = (id, i) => {
    return fetch(
      `https://playground.4geeks.com/contact/agendas/agendaSergio/contacts/${id}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        return console.log(id) || [];
      })
      .then((data) => {
        return (
          dispatch({ type: "actualizar", payload: { indexConcreto: i } }) || []
        );
      })

      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="d-flex text-center justify-content-center align-items-center flex-column m-5">
      <h1>Contact List</h1>
      <h2></h2>

      {store.contactList.map((i, index) => {
        return (
          <div key={i.id} className="container card m-2 p-2">
            <div className="row flex-column flex-md-row g-3">
              <div className="col-12 col-md-4 d-flex align-items-center justify-content-center">
                <img
                  src="https://avatar.iran.liara.run/public/boy"
                  alt="example-profile-picture"
                  height="100px"
                />
              </div>

              <div className="col-12 col-md-4 d-flex text-center flex-column">
                <h5>
                  <strong>{i.name}</strong>
                </h5>
                <p>
                  <i class="fa-solid fa-location-dot me-1"></i>
                  {i.address}
                </p>

                <p>
                  <i class="fa-solid fa-phone me-1"></i>
                  {i.phone}
                </p>
                <p>
                  <i class="fa-solid fa-envelope me-1"></i>
                  {i.email}
                </p>
              </div>
              <div className="col-12 col-md-4 d-flex align-items-center justify-content-center">
                <button
                  className="btn btn-warning m-2"
                  onClick={() => {
                    navigate(`/contact-edit/${i.id}`);
                  }}
                >
                  <i className="fa-solid fa-pencil m-1"></i>
                </button>

                <div class="dropdown">
                  <button
                    class="btn btn-danger dropdown-toggle m-2 p-2"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i class="fa-solid fa-trash-can"></i>
                  </button>
                  <ul class="dropdown-menu">
                    <div className="d-flex justify-content-center align-items-center">

                    <button
                      className="btn btn-danger d-flex "
                      onClick={() => {
                        return eliminarContacto(i.id, index);
                      }}
                      >
                      Estoy seguro.
                    </button>
                      </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      })}

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
