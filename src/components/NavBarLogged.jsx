import love from "../assets/love.svg";
import Search from "./search";
import Notif from "./notif";
import { getUserFromId } from "../func/getAllUser";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, MessageCircle, Heart, LogOut, Users } from "lucide-react";

const NavBarLogged = () => {
  const [notifNumber, setNotifNumber] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getUserFromId(parseInt(sessionStorage.getItem("id"))).then((data) =>
      setNotifNumber(data?.notif.length || 0)
    );
  }, []);

  const goTo = (path) => navigate(path);
  const logout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <header className="bg-white shadow-md border-b border-pink-200 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-10 flex justify-between items-center h-16">
        {/* Logo + Recherche */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => goTo("/feed")}
            className="flex items-center gap-2 hover:opacity-80 transition"
          >
            <img src={love} alt="logo" className="h-8 w-auto" />
            <span className="font-extrabold text-pink-600 text-lg">
              LoveFinder
            </span>
          </button>
          <div className="flex-grow">
            <Search />
          </div>
        </div>

        {/* Navigation principale */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => goTo("/matches")}
            className="flex items-center gap-2 text-pink-600 hover:text-pink-700 transition"
          >
            <Users className="h-5 w-5" />
            <span>Matches</span>
          </button>

          <button
            onClick={() => goTo("/likes")}
            className="flex items-center gap-2 text-pink-600 hover:text-pink-700 transition"
          >
            <Heart className="h-5 w-5" />
            <span>J’aimes</span>
          </button>


          <div className="relative text-pink-600 hover:text-pink-700">
            <Bell className="h-5 w-5" />
          </div>



          <MessageCircle className="h-5 w-5 text-pink-600 hover:text-pink-700" />


          <button
            onClick={logout}
            className="flex items-center gap-2 text-pink-600 hover:text-pink-700 transition"
          >
            <LogOut className="h-5 w-5" />
            <span>Déconnexion</span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default NavBarLogged;
