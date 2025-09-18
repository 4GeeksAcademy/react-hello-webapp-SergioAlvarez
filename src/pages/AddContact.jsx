import { useReducer, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { usuario, setUsuario } from "./Error";
export const AddContact = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    agregarContacto();
  };

  const agregarContacto = () => {
    let data = {
      name: nombre,
      phone: telefono,
      email: email,
      address: direccion,
    };

    fetch(
      `https://playground.4geeks.com/contact/agendas/${usuario}/contacts`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => {
        console.log(response);
        return null;
      })
      .then((data) => {
         alert("Has Agregado a un contacto con exito!");
         return navigate("/")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const recogerNombre = (e) => {
    setNombre(e.target.value);
  };
  const recogerTelefono = (e) => {
    setTelefono(e.target.value);
  };
  const recogerEmail = (e) => {
    setEmail(e.target.value);
  };
  const recogerDireccion = (e) => {
    setDireccion(e.target.value);
  };
  console.log("hola desde addcontact");
  return (
    <>
      <div className="container card m-2">
        <form onSubmit={handleSubmit}>
          <label htmlFor="nombreUsuario" className="form-label">
            Nombre Completo
          </label>
          <input
            type="text"
            id="nombreUsuario"
            className="form-control"
            placeholder="pepito los palotes"
            onChange={recogerNombre}
            value={nombre}
          ></input>
          <br></br>
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="pepito@gmail.com"
            className="form-control"
            onChange={recogerEmail}
          />
          <br />
          <label htmlFor="numeroTelefono" className="form-label">
            Numero de Telefono
          </label>
          <input
            type="text"
            maxLength="9"
            id="numeroTelefono"
            placeholder="664123456"
            className="form-control"
            onChange={recogerTelefono}
          />
          <br />
          <label htmlFor="direccion" className="form-label">
            Direccion
          </label>
          <input
            type="text"
            id="direccion"
            placeholder="Calle Andromeda 45"
            className="form-control"
            onChange={recogerDireccion}
          />
          <br />
          <button
            type="submit"
            className="btn btn-success container text-center m-2"
          >
            Agregar Contacto
          </button>
        </form>
      </div>
      <div className="container text-center m-2">
        <Link to="/">
          <button className="btn btn-warning">
            Me he arrepentido, llevame a mis contactos..
          </button>
        </Link>
      </div>

      <button
        onClick={() => {
          console.log(nombre);
        }}
      >
        Magia
      </button>
    </>
  );
};
