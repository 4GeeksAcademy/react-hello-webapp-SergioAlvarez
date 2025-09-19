import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Error = () => {
  const navigate = useNavigate();
  const preguntarNombreAgenda = ()=>{
    let nombreAgenda = prompt('Como quieres llamar a tu agenda?')
    return nombreAgenda
  }
  const llamadoApi = (value) => {

    fetch(`https://playground.4geeks.com/contact/agendas/${value}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        return null;
      })
      .then((data) => {
        console.log(value);
        return navigate(`/home/${value}`);
      })
      .catch((err) => {
        return console.log(err);
      });
  };

  return (
    <div>
      <h1>Vaya, Parece que no tienes Usuario</h1>

      <button
        className="btn btn-success"
        onClick={() => {
          return llamadoApi(preguntarNombreAgenda)
        }}
      >
        Crear Usuario
      </button>

      <button
        className="btn btn-success"
        onClick={() => {
          return navigate("/")
        }}
      >
        Ir a Home
      </button>

      <button
        onClick={() => {
          return console.log();
        }}
      >
        magia
      </button>
    </div>
  );
};
