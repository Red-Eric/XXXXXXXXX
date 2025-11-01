import { useEffect, useState } from "react";
import { getUsersWithoutId, getMatchingUsersOppositeSex, getMatchingUsersSameSex } from "../func/getAllUser";
import ProfileCard from "./ProfileCard";
import right from "../assets/right.png";
import l from "../assets/l.png";
import r from "../assets/r.png";

const SortBy3 = ({ fetchUsers, index, funcDec, funcInc }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const userId = parseInt(sessionStorage.getItem("id"));
            const data = await fetchUsers(userId);
            setUsers(data);
        };

        fetchData();
    }, [fetchUsers]);

    const dataSliced = users.slice(index, index + 3);

    return (
        <div className="flex gap-4 ml-7 mr-7 items-center">
            {index === 0 ? "" : <img src={l} alt="left" className="w-12 h-20 bg-white" onClick={funcDec} />}
            {dataSliced.length > 0
                ? dataSliced.map((user) => <ProfileCard key={user.id} user={user} />)
                : <p>No users</p>}
            {dataSliced.length < 3 ? "" : <img src={r} alt="right" className="w-12 h-20 bg-white" onClick={funcInc} />}
        </div>
    );
};

const Show = () => {
    const [indexAll, setIndexAll] = useState(0);
    const [indexRec, setIndexRec] = useState(0);
    const [indexOpp, setIndexOpp] = useState(0);

    return (
        <div className="bg-gray-200 pt-5">
            <div className="bg-white ml-7 rounded-2xl pl-4 h-10 w-[20%] flex justify-around mb-5">
                <h1 className="font-medium text-2xl">Tout</h1>
                <img src={right} alt="arrow" />
            </div>
            <SortBy3 fetchUsers={getUsersWithoutId} index={indexAll} funcDec={() => setIndexAll(indexAll - 1)} funcInc={() => setIndexAll(indexAll + 1)} />

            <div className="bg-white ml-7 rounded-2xl pl-4 h-10 w-[30%] flex justify-around mb-5 mt-5">
                <h1 className="font-medium text-2xl">Recommendation</h1>
                <img src={right} alt="arrow" />
            </div>
            <SortBy3 fetchUsers={getMatchingUsersOppositeSex} index={indexRec} funcDec={() => setIndexRec(indexRec - 1)} funcInc={() => setIndexRec(indexRec + 1)} />

            <div className="bg-white ml-7 rounded-2xl pl-4 h-10 w-[30%] flex justify-around mb-5 mt-5">
                <h1 className="font-medium text-2xl">Même Sexe</h1>
                <img src={right} alt="arrow" />
            </div>
            <SortBy3 fetchUsers={getMatchingUsersSameSex} index={indexOpp} funcDec={() => setIndexOpp(indexOpp - 1)} funcInc={() => setIndexOpp(indexOpp + 1)} />
        </div>
    );
};

export default Show;

