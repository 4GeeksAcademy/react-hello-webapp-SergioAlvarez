import { Link } from "react-router-dom";

export const Navbar = () => {
  return (

		<>
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <i class="fa-solid fa-burger"></i>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <div className="container">
        <div className="ml-auto">
          <Link to="/add-contact">
             <p className="btn btn-success mb-0">Agregar Nuevo contacto</p> 
          </Link>
        </div>
      </div>
    </div>
  </div>
</nav>






    {/* <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">React Boilerplate</span>
        </Link>
        <div className="ml-auto">
          <Link to="/add-contact">

             <p className="btn btn-success mb-0">Agregar Nuevo contacto</p> 

          </Link>
        </div>
      </div>
    </nav> */}
		</>
  );
};
