import { useEffect, useState } from "react";
import NavBarNoLog from "../components/NavBarNoLog";
import { GetAllUser } from "../func/getAllUser";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showedLog, setShowedLog] = useState(true);
  const [email_, setEmail_] = useState("");
  const [password_, setPassword_] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const saveLog = (data, emailParam, passParam) => {
    let logged = false;

    data.forEach((user) => {
      if (user.email === emailParam && user.password === passParam) {
        sessionStorage.setItem("id", user.id);
        navigate("/feed");
        logged = true;
      }
    });

    if (emailParam === "admin" && passParam === "123") {
      logged = true;
      navigate("/admin0");
    }

    if (!logged) {
      Swal.fire({
        title: "Erreur",
        icon: "error",
        text: "Erreur lors de l'authentification",
      });
    }
  };

  const handleEmailChange = (e) => {
    setEmail_(e.target.value);
  };

  const handlePassWordChange = (e) => {
    setPassword_(e.target.value);
  };

  const tryLog = () => {
    users.length > 0
      ? saveLog(users, email_, password_)
      : console.log("can Log no users in DB");
  };


  useEffect(() => {
    GetAllUser().then(data => setUsers(data))

}, [])

  return (
    <div className="bg-pink-50 min-h-screen">
      <NavBarNoLog hide={showedLog} />

      <div className="flex justify-center items-center h-[80vh]">
        <div className="bg-white shadow-2xl rounded-2xl px-10 py-12 w-[30%] border border-pink-200">
          <h2 className="text-3xl font-extrabold text-center text-pink-700 mb-10">
            Connexion
          </h2>

          <div className="mb-6">
            <label className="block text-pink-700 text-sm font-semibold mb-2">
              E-mail
            </label>
            <input
              className="shadow-md appearance-none border border-pink-200 rounded w-full py-2.5 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-400"
              id="username"
              type="text"
              autoComplete="off"
              onChange={handleEmailChange}
              placeholder="example@gmail.com"
            />
          </div>

          <div className="mb-8">
            <label className="block text-pink-700 text-sm font-semibold mb-2">
              Mot de passe
            </label>
            <input
              onChange={handlePassWordChange}
              className="shadow-md appearance-none border border-pink-200 rounded w-full py-2.5 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-400"
              id="password"
              type="password"
              autoComplete="off"
              placeholder="************"
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              onClick={tryLog}
              className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2.5 px-8 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-200"
              type="button"
            >
              Se connecter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
