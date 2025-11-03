import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBarLogged from "../components/NavBarLogged";
import { getUserFromId, GetAllUser } from "../func/getAllUser";

const MatchesPage = () => {
    const [matches, setMatches] = useState([]);
    const navigate = useNavigate();
    const currentUserId = parseInt(sessionStorage.getItem("id"));

    useEffect(() => {
        const fetchMatches = async () => {
            const user = await getUserFromId(currentUserId);
            const allUsers = await GetAllUser();
            if (user?.matchs) {
                const matchedUsers = allUsers.filter(u => user.matchs.includes(u.id));
                setMatches(matchedUsers);
            }
        };
        fetchMatches();
    }, [currentUserId]);

    const goToProfile = (id) => {
        navigate(`/profile/${id}`);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <NavBarLogged />

            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-pink-600 mb-6">Vos Matches</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {matches.length > 0 ? (
                        matches.map(user => (
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
                                        className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${user.sexe === "H" ? "bg-blue-400" : "bg-pink-400"}`}
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
                        <p className="col-span-full text-center text-gray-500 mt-6">
                            Aucun match pour le moment.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MatchesPage;
