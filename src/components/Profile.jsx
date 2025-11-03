import { useNavigate } from "react-router-dom";

const Profile = ({ user }) => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-16 px-4">
      <div className="bg-pink-50 rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden animate-fade-in">
        <div className="flex flex-col md:flex-row">
          {/* Image + Infos rapides */}
          <div className="md:w-1/3 flex flex-col items-center justify-center bg-gradient-to-b from-pink-600 to-pink-900 p-6">
            <img
              src={user?.image}
              alt="Profile"
              className="rounded-full w-40 h-40 object-cover border-4 border-white shadow-md mb-4 transition-transform duration-300 hover:scale-105"
            />
            <h1 className="text-2xl font-bold text-white">
              {user?.name} {user?.fname}
            </h1>
            <p className="text-pink-200 mt-1">
              {user?.sexe === "H" ? "Homme" : "Femme"}
            </p>
            <button
              onClick={goBack}
              className="mt-6 bg-white text-pink-900 font-semibold px-4 py-2 rounded-lg hover:bg-pink-100 transition"
            >
              Retour
            </button>
          </div>

          {/* Détails */}
          <div className="md:w-2/3 p-8">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-pink-800 mb-3">Bio</h2>
              <p className="text-pink-900 leading-relaxed">
                {user?.bio || "Aucune bio renseignée."}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-pink-800 mb-3">
                Centres d'intérêt
              </h2>
              <div className="flex flex-wrap gap-2">
                {user?.hobby?.length > 0 ? (
                  user.hobby.map((e) => (
                    <span
                      key={e}
                      className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm"
                    >
                      {e}
                    </span>
                  ))
                ) : (
                  <p className="text-pink-700">Aucun centre d'intérêt indiqué.</p>
                )}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-pink-800 mb-3">
                Informations de contact
              </h2>
              <ul className="space-y-3 text-pink-900">
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-pink-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  {user?.email || "Non renseigné"}
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-pink-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  {user?.tel || "Non renseigné"}
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-pink-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {user?.place || "Non renseigné"}
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
