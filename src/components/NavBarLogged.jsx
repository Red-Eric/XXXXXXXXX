import love from "../assets/love.svg";
import Search from "./search";
import { getUserFromId } from "../func/getAllUser";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, MessageCircle, Heart, LogOut, Users, Settings } from "lucide-react";
import axios from "axios";

const NavBarLogged = () => {
  const [notifNumber, setNotifNumber] = useState(0);
  const [profilePic, setProfilePic] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const menuRef = useRef();
  const notifRef = useRef();

  const userId = parseInt(sessionStorage.getItem("id"));

  useEffect(() => {
    getUserFromId(userId).then((data) => {
      setNotifNumber(data?.notif.length || 0);
      setNotifications(data?.notif || []);
      setProfilePic(data?.image || "");
    });

    // Fermer menus si clic à l'extérieur
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotif(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const goTo = (path) => navigate(path);

  const logout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const readAllNotifications = async () => {
    try {
      await axios.post("http://localhost:8080/api/user/notify/delete", { id: userId });
      setNotifications([]);
      setNotifNumber(0);
      setShowNotif(false);
    } catch (err) {
      console.error(err);
    }
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
            <span className="font-extrabold text-pink-600 text-lg">LoveFinder</span>
          </button>
          <div className="flex-grow">
            <Search />
          </div>
        </div>

        {/* Navigation principale */}
        <div className="flex items-center gap-6 relative">
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

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <Bell
              className="h-5 w-5 text-pink-600 hover:text-pink-700 cursor-pointer"
              onClick={() => setShowNotif(!showNotif)}
            />
            {notifNumber > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {notifNumber}
              </span>
            )}
            {showNotif && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                <div className="max-h-64 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((n, idx) => (
                      <p key={idx} className="px-4 py-2 text-sm text-pink-700 border-b border-gray-100">
                        {n}
                      </p>
                    ))
                  ) : (
                    <p className="px-4 py-2 text-sm text-gray-500">Aucune notification</p>
                  )}
                </div>
                {notifications.length > 0 && (
                  <button
                    onClick={readAllNotifications}
                    className="w-full text-left px-4 py-2 hover:bg-pink-50 text-pink-600 font-semibold"
                  >
                    Lire tout
                  </button>
                )}
              </div>
            )}
          </div>

          <MessageCircle className="h-5 w-5 text-pink-600 hover:text-pink-700" onClick={()=> navigate("/message")}/>

          {/* Photo de profil + menu */}
          <div className="relative" ref={menuRef}>
            <img
              src={profilePic || "/default-avatar.png"}
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-pink-500"
              onClick={() => setShowMenu(!showMenu)}
            />
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                <button
                  onClick={() => { goTo(`/profile/${userId}`); setShowMenu(false); }}
                  className="w-full text-left px-4 py-2 hover:bg-pink-50 flex items-center gap-2"
                >
                  <Users className="h-4 w-4 text-pink-600" />
                  Mon profil
                </button>
                <button
                  onClick={() => { goTo("/settings"); setShowMenu(false); }}
                  className="w-full text-left px-4 py-2 hover:bg-pink-50 flex items-center gap-2"
                >
                  <Settings className="h-4 w-4 text-pink-600" />
                  Paramètres
                </button>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 hover:bg-pink-50 flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4 text-pink-600" />
                  Déconnexion
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBarLogged;
