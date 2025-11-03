import { Link } from "react-router-dom";
import NavBarNoLog from "../components/NavBarNoLog";

const Home = () => {
  return (
    <div className="bg-pink-50 min-h-screen">
      <NavBarNoLog />

      <div className="bg-white shadow-2xl w-[40%] mt-24 ml-16 rounded-3xl p-10 border border-pink-200">
        <div className="flex flex-col justify-center space-y-6">
          <h1 className="text-4xl font-extrabold text-pink-700 leading-tight text-left">
            Trouvez la personne qui rendra vos jours plus beaux.
          </h1>
          <p className="text-base font-light text-gray-700 text-left">
            Inscrivez-vous dès aujourd'hui et explorez des milliers de profils
            qui partagent vos passions, vos envies et votre vision de l'amour.
            Chaque rencontre est une opportunité de créer une belle histoire,
            unique comme vous.
          </p>
          <Link
            to={"/Sign"}
            className="text-center w-[40%] bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg text-sm px-6 py-3 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            S'inscrire
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
