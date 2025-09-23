import React, { useEffect, useReducer, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";


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


  const handleSubmit = (e)=>{
    e.preventDefault()
    cambiarDatosStore()
  }

  const cambiarDatosStore = ()=>{

    let data = {
      name: nombre,
      phone: telefono,
      email: email,
      address: direccion,
    }
     fetch(`https://playground.4geeks.com/contact/agendas/agendaSergio/contacts/${idContact}`,{
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),

    })
    .then((response)=>{
     return console.log(response.status) || []
    })
    .then((data)=>{
     return navigate("/") || []
    })
    .catch((err)=>{console.log(err)})
  }


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

  // const editarContacto = () =>{
  //   cambiarDatosStore().then(()=>{
  //     return navigate("/")
  //   })

  // }

  return (

    <div className="container  ">
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
        <form onSubmit={handleSubmit}>
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
            type="tel"
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
            onClick={handleSubmit}
            
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
