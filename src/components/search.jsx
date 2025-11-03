import { useEffect, useState } from "react";
import { GetAllUser, getUsersWithoutId } from "../func/getAllUser";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [finder, setFinder] = useState("");

  useEffect(() => {
    getUsersWithoutId(parseInt(sessionStorage.getItem("id"))).then((data) =>
      setAllUsers(data)
    );
  }, []);

  const filteredUsers = allUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(finder.toLowerCase()) ||
      user.fname.toLowerCase().includes(finder.toLowerCase())
  );

  const navigate = useNavigate();
  const goTo = (id) => {
    navigate(`../profile/${id}`);
  };

  return (
    <div className="max-w-md mx-auto relative">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-pink-600 sr-only"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-pink-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          value={finder}
          onChange={(e) => setFinder(e.target.value)}
          className="block w-full p-2 ps-10 text-sm text-pink-900 border border-pink-200 rounded-lg bg-white focus:ring-pink-500 focus:border-pink-500"
          placeholder="Recherche..."
        />
      </div>

      {finder && filteredUsers.length > 0 && (
        <ul className="mt-2 border border-pink-200 rounded-lg bg-white absolute z-10 max-h-60 overflow-auto w-full">
          {filteredUsers.map((user) => (
            <li
              key={user.id}
              onClick={() => goTo(user.id)}
              className="flex items-center p-2 hover:bg-pink-50 cursor-pointer"
            >
              <img
                src={user.image}
                alt={`${user.name} ${user.fname}`}
                className="w-10 h-10 rounded-full mr-4"
              />
              <div>
                <p className="text-sm font-semibold text-pink-600">
                  {user.name} {user.fname}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
