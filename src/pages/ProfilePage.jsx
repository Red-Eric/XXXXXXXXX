import { useEffect, useState } from "react";
import { getUserFromId } from "../func/getAllUser";
import { useParams } from "react-router-dom";
import NavBarLogged from "../components/NavBarLogged";
import Profile from "../components/Profile";

const ProfilePage = () => {
      const { id } = useParams();
      const [user, setUser] = useState(null);

      useEffect(() => {
        getUserFromId(parseInt(id)).then((data) =>
          setUser(data)
        );

      }, []);


    return (
        <div className="bg-pink-50 min-h-screen">
            <NavBarLogged />
            <div className="max-w-5xl mx-auto py-10">
                <Profile user={user} />
            </div>
        </div>
    );
};

export default ProfilePage;
