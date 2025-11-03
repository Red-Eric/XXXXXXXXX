import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBarLogged from "../components/NavBarLogged";
import { getUsersWithoutId } from "../func/getAllUser";

const Feed = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [filterSexe, setFilterSexe] = useState(""); // "H" ou "F" ou ""
    const [filterHobbies, setFilterHobbies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const id = parseInt(sessionStorage.getItem("id"));
        getUsersWithoutId(id).then((data) => {
            setUsers(data);
            setFilteredUsers(data);
        });
    }, []);

    // Filtrage automatique
    useEffect(() => {
        let temp = [...users];

        // Filtre par sexe
        if (filterSexe) {
            temp = temp.filter((u) => u.sexe === filterSexe);
        }

        // Filtre par hobbies
        if (filterHobbies.length > 0) {
            temp = temp.filter((u) =>
                filterHobbies.every((hobby) => u.hobby.includes(hobby))
            );
        }

        setFilteredUsers(temp);
    }, [filterSexe, filterHobbies, users]);

    const goToProfile = (id) => {
        navigate(`/profile/${id}`);
    };

    const hobbiesList = ["✈️ Voyager", "🏕️ Camping", "🎭 Théâtre", "🎨 dessin", "🎬 Cinéma", "📸 Photographie", "🎧 Musique", "🎸 Jouer d'un instrument", "💃 Danser", "🏋️ Musculation", "⚽ Football", "🍳 Cuisiner", "🕹️ Jeux vidéo", "💻 Programmation", "🧠 Méditation",]

    const toggleHobby = (hobby) => {
        setFilterHobbies((prev) =>
            prev.includes(hobby)
                ? prev.filter((h) => h !== hobby)
                : [...prev, hobby]
        );
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <NavBarLogged />

            {/* Section filtres */}
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                {/* Sexe */}
                <div className="flex items-center gap-3 bg-white p-2 rounded-full shadow-sm">
                    {[
                        { label: "Tous", value: "" },
                        { label: "Homme", value: "H" },
                        { label: "Femme", value: "F" },
                    ].map((option) => (
                        <button
                            key={option.value}
                            onClick={() => setFilterSexe(option.value)}
                            className={`px-4 py-2 rounded-full font-medium transition-all duration-200 transform
          ${filterSexe === option.value
                                    ? "bg-pink-500 text-white shadow-md scale-105"
                                    : "bg-gray-100 text-gray-700 hover:bg-pink-100 hover:scale-105"
                                }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>

                {/* Hobbies */}
                <div className="flex gap-2 overflow-x-auto py-1 no-scrollbar">
                    {hobbiesList.map((hobby) => (
                        <button
                            key={hobby}
                            onClick={() => toggleHobby(hobby)}
                            className={`flex-shrink-0 px-3 py-1 rounded-full text-sm font-medium border transition-all duration-200 transform
          ${filterHobbies.includes(hobby)
                                    ? "bg-pink-500 text-white border-pink-500 scale-105 shadow-md"
                                    : "bg-white text-gray-700 border-gray-300 hover:bg-pink-100 hover:scale-105"
                                }`}
                        >
                            {hobby}
                        </button>
                    ))}
                </div>

            </div>


            {/* Feed */}
            <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                        <div
                            key={user.id}
                            onClick={() => goToProfile(user.id)}
                            className="cursor-pointer bg-white rounded-2xl p-5 flex flex-col items-center text-center shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="relative w-32 h-32 mb-4">
                                <img
                                    src={user.image}
                                    alt={`${user.name} ${user.fname}`}
                                    className="w-32 h-32 rounded-full object-cover border-4 border-pink-100 shadow-lg"
                                />
                                <span
                                    className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${user.sexe === "H" ? "bg-blue-400" : "bg-pink-400"
                                        }`}
                                    title={user.sexe === "H" ? "Homme" : "Femme"}
                                />
                            </div>
                            <h2 className="text-xl font-bold text-gray-800">
                                {user.name} {user.fname}
                            </h2>
                            <p className="text-gray-500 mt-1">
                                {user.age} ans • {user.place}
                            </p>
                            <div className="flex flex-wrap justify-center mt-3 gap-2">
                                {user.hobby.slice(0, 3).map((hobby, i) => (
                                    <span
                                        key={i}
                                        className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full"
                                    >
                                        {hobby}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500">
                        Aucun utilisateur trouvé.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Feed;
