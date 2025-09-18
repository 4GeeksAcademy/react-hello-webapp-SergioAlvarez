import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';


export const llamadoApi = () => {
   const [nombreAgenda, setNombreAgenda] = useState('')
   let usuario = prompt('Dale un nombre a tu Agenda Personal')
 fetch(`https://playground.4geeks.com/contact/agendas/${usuario}`, {
   method: "POST",
   headers: {
     "Content-type": "application/json",
   },
 })
 .then((response)=>{return console.log(response)})
 .then((data)=>{return console.log(data)})
 .catch((err)=>{return console.log(err)})
};
export const Error = () => {

  // useEffect(() => {
  // }, [])
  



  return (
    <div>
      <h1>Vaya, Parece que no tienes Usuario</h1>

      <button className="btn btn-success" onClick={()=>{return llamadoApi()}}>Crear Usuario</button>

    </div>
  )
}
