import { Link } from "react-router-dom";
import love from "../assets/love.svg";

const NavBarNoLog = (props) => {
  return (
    <nav className="bg-white shadow-md border-b border-pink-200">
      <div className="flex items-center justify-between px-10 h-16">
        {/* Logo et titre */}
        <div className="flex items-center space-x-3">
          <img className="h-8 w-auto" src={love} alt="logo" />
          <span className="text-pink-600 font-extrabold text-lg tracking-tight">
            LoveFinder
          </span>
        </div>

        {/* Liens horizontaux */}
        <div className="flex space-x-8">
          <Link
            to="/"
            className="text-pink-600 hover:text-pink-700 font-medium text-sm transition"
          >
            Accueil
          </Link>
          <a
            href="#"
            className="text-gray-600 hover:text-pink-700 font-medium text-sm transition"
          >
            Profil
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-pink-700 font-medium text-sm transition"
          >
            Match
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-pink-700 font-medium text-sm transition"
          >
            Statistiques
          </a>
        </div>

        {/* Bouton de connexion */}
        <div>
          <Link
            hidden={props.hide}
            to={"/Login"}
            className="bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Se connecter
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBarNoLog;
