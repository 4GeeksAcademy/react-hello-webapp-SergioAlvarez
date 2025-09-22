import React, { useEffect, useReducer, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { createLogger } from "vite";

export const ContactEdit = () => {
  const { idContact } = useParams();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");

  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    recuperarInfo()
  }, [])
  
  const recuperarInfo = ()=>{
    return store.contactList.map((i)=>{
      console.log(i)
      
      if(i.id == idContact){
        
        setNombre(i.name)
        setEmail(i.email)
        setTelefono(i.phone)
        setDireccion(i.address)

      }
    })
  }

  const cambiarDatosStore = ()=>{
    let data = {
      name: nombre,
      phone: telefono,
      email: email,
      address: direccion,
    }
     return fetch(`https://playground.4geeks.com/contact/agendas/agendaSergio/contacts/${idContact}`,{
      method: "PUT",
      headers: 'Content-Type: application/json',
      body: JSON.stringify(data)

    })
    .then((response)=>{
     return console.log(response) || []
    })
    .then((data)=>{
     return console.log(data) || []
    })
    .catch((err)=>{console.log(err)})
    
    
  }
    // dispatch({
    //   type: 'cambiarDatosStore',
    //   payload: [...store.contactList,
    //     ...data
    //   ]
    // })

  const recogerNombre = (e) =>{
    console.log(e.target.value)
   return setNombre(e.target.value)
  }
  const recogerEmail = (e) =>{
   return setEmail(e.target.value)
  }
  const recogerTelefono = (e) =>{
   return setTelefono(e.target.value)
  }

  const recogerDireccion = (e) =>{
   return setDireccion(e.target.value)
  }

  const editarContacto = () =>{
    cambiarDatosStore()
    navigate("/")
  }

  return (

    <div className="container ">
      <button
        onClick={() => {
          return cambiarDatosStore()
        }}
      >
        magia
      </button>
      <button
        onClick={() => {
          return console.log(recogerNombre())
        }}
      >
        MasMagia
      </button>
      <div>
        Aqui editaremos el contacto
        <p>contacto: {}</p>
        <form onSubmit={editarContacto}>
          <label htmlFor="nombreUsuario" className="form-label">
            Nombre Completo
          </label>
          <input
            type="text"
            id="nombreUsuario"
            className="form-control"
          
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
            className="form-control"
            onChange={recogerEmail}
            value={email}
          />
          <br />
          <label htmlFor="numeroTelefono" className="form-label">
            Numero de Telefono
          </label>
          <input
            type="text"
            maxLength="9"
            id="numeroTelefono"
            value={telefono}
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
            value={direccion}
            className="form-control"
            onChange={recogerDireccion}
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
          className="btn btn-secondary"
        >
          Me he arrepentido, llevame a mis contactos..
        </button>
      </div>
      <button
        onClick={() => {
          return console.log(store);
        }}
      >
        magia
      </button>
    </div>
  );
};
