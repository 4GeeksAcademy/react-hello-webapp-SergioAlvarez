import { useEffect, useReducer, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const { idUsuarioCreado } = useParams();


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

  async function crearAgenda (){

    
    try {
      const response = await fetch(`https://playground.4geeks.com/contact/agendas/agendaSergio`,{
        method: 'POST',
      })
      if(response.ok == false){
        throw new Error("La response.ok dio false")
      }
      const data = await response.json()
      console.log(data.slug);
          dispatch({type: "crearContacto", payload: data.slug})
  
} catch (err) {
  console.log(err);
}

}

  async function eliminarAgenda() {
    try {
      const response = await fetch("https://playground.4geeks.com/contact/agendas/agendaSergio",{
        method: 'DELETE',
      })
      if(response.ok == false){
        throw new Error("La respuesta fue false")
      }
      const data = await response.json()
      console.log(data);
    } catch (err){
      console.log(err);
    }
  }

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
                  <i className="fa-solid fa-location-dot me-1"></i>
                  {i.address}
                </p>

                <p>
                  <i className="fa-solid fa-phone me-1"></i>
                  {i.phone}
                </p>
                <p>
                  <i className="fa-solid fa-envelope me-1"></i>
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

                <div className="dropdown">
                  <button
                    className="btn btn-danger dropdown-toggle m-2 p-2"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                  <ul className="dropdown-menu">
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

        <button className="btn btn-primary container mt-1"
        onClick={()=>{return crearAgenda()}}
        >Crear nueva agenda</button>

        <button
        className="btn btn-danger container mt-1"
        onClick={()=>{return eliminarAgenda()}}>Borrar Agenda</button>
      </div>
    </div>
  );
};
