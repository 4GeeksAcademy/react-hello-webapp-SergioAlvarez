import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { usuario, setUsuario } from "./Error";


export const ContactEdit = () => {

    const { idContact } = useParams();
    const navigate = useNavigate();
    const [nombre, setNombre] = useState("")
    const [email, setEmail] = useState("")
    const [telefono, setTelefono] = useState("")
    const [direccion, setDireccion] = useState("")


  useEffect(() => {
    llamadaContactos()
    
}, [])


  const llamadaContactos = () => {
    fetch(`https://playground.4geeks.com/contact/agendas/${usuario}/`, {
      method: "GET",
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        let info = data.contacts
        info.map((i)=>{console.log(i)
            if(i.id == idContact){
                setNombre(i.name)
                setEmail(i.email)
                setTelefono(i.phone)
               return setDireccion(i.address)

            }
        })
       
        return console.log(data);
      })
      .catch();
  };


  return (
    <div  className="container ">
      <div>
        Aqui editaremos el contacto
        <p>contacto: {idContact}</p>
        <form >
          <label htmlFor="nombreUsuario" className="form-label">
            Nombre Completo
          </label>
          <input
            type="text"
            id="nombreUsuario"
            className="form-control"
            placeholder={nombre}
           
            
          ></input>
          <br></br>
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder={email}

          />
          <br />
          <label htmlFor="numeroTelefono" className="form-label">
            Numero de Telefono
          </label>
          <input
            type="text"
            maxLength="9"
            id="numeroTelefono"
            placeholder={telefono}
            className="form-control"

          />
          <br />
          <label htmlFor="direccion" className="form-label">
            Direccion
          </label>
          <input
            type="text"
            id="direccion"
            placeholder={direccion}
            className="form-control"

          />
          <br />
          <button
            type="submit"
            className="btn btn-success container text-center m-2"
          >
            Editar Contacto
          </button>
        </form>
      </div>

      <div className="container text-center m-2">
        <button
          onClick={() => {
            navigate("/");
          }}
          className="btn btn-warning"
        >
          Me he arrepentido, llevame a mis contactos..
        </button>

        <button onClick={()=>{return console.log(email);}} >magia</button>
      </div>
    </div>
  );
};
