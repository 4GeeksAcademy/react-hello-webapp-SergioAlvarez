import { useEffect, useState } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AddContact } from "./AddContact.jsx";
import { ContactEdit } from "./ContactEdit.jsx";
import { llamadoApi } from "./Error.jsx";
import { usuario, setUsuario } from "./Error.jsx";


export const Home = () => {
  
  const [contactos, setContactos] = useState([]);
  const navigate = useNavigate();
  

  useEffect(() => {
    llamadaContactos();
  }, []);

 const llamadaContactos = () => {
    fetch(`https://playground.4geeks.com/contact/agendas/${usuario}`, {
      method: "GET",
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data.contacts);
        return setContactos(data.contacts);
      })
      .catch((err)=>{return console.log(err);});
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

              <div>
                <button
                  onClick={() => {

                    navigate(`/contact-edit/${value.id}`);
                  }}
                >
                  Aqui va un lapiz
                </button>
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
        <Link to="/add-contact">
          <button className="btn btn-primary">Agregar Contacto</button>
        </Link>
      </div>
    </div>
  );
};
