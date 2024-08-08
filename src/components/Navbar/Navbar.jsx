import { Link, useNavigate } from "react-router-dom";

import { logout } from "../../context/authContext";

import "./Navbar.css";
import { Button } from "@mantine/core";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/home">Home</Link>
        <Link to="/post/user">Ver mis Publicaciones</Link>
        <Link to="/post/create">Crear una Publicación</Link>
        <Link to="/profile">Perfil</Link>
        <Button
        variant="transparent"
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          Cerrar Sesión
        </Button>
      </nav>
    </header>
  );
};

export default Navbar;
