import { useEffect, useState } from "react"
import { getUsersWithoutId, getUserFromId, GetAllUser } from "../func/getAllUser"
import ProfileCard2 from "./ProfileCard2";

const showAll = (data1, data2) => {
    const filterUser = data2.filter(el => data1.includes(el.id));

    return (
        <div>
            <div className="bg-white ml-7 rounded-2xl pl-4 h-10 w-[35%] flex justify-around mb-5">
                <h1 className="font-medium text-2xl">Vos Matches</h1>
            </div>

            <div className="grid grid-cols-4 gap-5">
                {filterUser.map((e, index) => (
                    <ProfileCard2 key={e.id || index} user={e} />
                ))}
            </div>
        </div>
    )
}


const MatchesPage = () => {

    const [visitorList, setVisitorList] = useState([])
    const [all, setAll] = useState([])
    useEffect(() => {
        GetAllUser().then(data => setAll(data))
        getUserFromId(parseInt(sessionStorage.getItem("id")))
            .then(data => setVisitorList(data.matchs))
    }, [])


    return (
        <div className="mt-4 ml-5 mr-5">
            {
                visitorList.length > 0 && all.length > 0 ? showAll(visitorList, all) : <h1 className="font-medium text-2xl">Vous avez 0 Matches(s)</h1>
            }
        </div>
    )
}

export default MatchesPage