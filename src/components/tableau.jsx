import { useEffect, useState } from "react";
import axios from "axios";
import { GetAllUser } from "../func/getAllUser";


export const Tableau = () => {
    const [all, setAll] = useState([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        axios.get("http://localhost:8080/api/user")
            .then(res => setAll(res.data))
    }, [])

    useEffect(()=>{
        axios.get("http://localhost:8080/api/user")
        .then(res => {
            let alltmp = res.data
            const finded = alltmp.filter(user =>
                user.name.toLowerCase().includes(search.toLowerCase()) ||
                user.fname.toLowerCase().includes(search.toLowerCase())
            )

            setAll(finded)
        })
    },[search])

    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto">
                <div className="min-w-full inline-block align-middle">
                    <div className="relative text-gray-500 focus-within:text-gray-900 mb-4">
                        <div className="absolute inset-y-0 left-1 flex items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.5 17.5L15.4167 15.4167M15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333C11.0005 15.8333 12.6614 15.0929 13.8667 13.8947C15.0814 12.6872 15.8333 11.0147 15.8333 9.16667Z" stroke="gray" strokeWidth="1.6" strokeLinecap="round" />
                            </svg>
                        </div>
                        {/*Recherchess*/}
                        <div className="flex items-center justify-between">
                            <input
                            onChange={(e)=> setSearch(e.target.value)}
                                type="text"
                                id="default-search"
                                className="block w-80 h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
                                placeholder="Recherche"
                            />
                        </div>

                    </div>

                    {/* Tableau */}
                    <div className="overflow-hidden">
                        <table className="min-w-full rounded-xl">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th scope="col" className="p-5 text-center text-sm font-semibold text-gray-900 capitalize rounded-t-xl">Photo</th>
                                    <th scope="col" className="p-5 text-center text-sm font-semibold text-gray-900 capitalize rounded-t-xl">Nom</th>
                                    <th scope="col" className="p-5 text-center text-sm font-semibold text-gray-900 capitalize">Prenom</th>
                                    <th scope="col" className="p-5 text-center text-sm font-semibold text-gray-900 capitalize">Age</th>
                                    <th scope="col" className="p-5 text-center text-sm font-semibold text-gray-900 capitalize">Sexe</th>
                                    <th scope="col" className="p-5 text-center text-sm font-semibold text-gray-900 capitalize rounded-t-xl">Email</th>
                                    <th scope="col" className="p-5 text-center text-sm font-semibold text-gray-900 capitalize rounded-t-xl">Localisation</th>
                                    <th scope="col" className="p-5 text-center text-sm font-semibold text-gray-900 capitalize">Telephone</th>
                                    {/* <th scope="col" className="p-5 text-center text-sm font-semibold text-gray-900 capitalize">Action</th> */}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-300">
                                {
                                    // Photo	Nom	Prenom	Age	Sexe	Email	Localisation	Telephone
                                    all.map((e) => (
                                        <tr key={e.id + "xxx"} className="bg-white transition-all duration-500 hover:bg-gray-50">
                                            <td className="p-5 text-center text-sm font-medium text-gray-900 flex justify-center">
                                                <img src={e.image} alt="pfp" className="rounded-full w-16 h-16" />
                                            </td>
                                            <td className="p-5 text-center text-sm font-medium text-gray-900">{e.name}</td>
                                            <td className="p-5 text-center text-sm font-medium text-gray-900">{e.fname}</td>
                                            <td className="p-5 text-center text-sm font-medium text-gray-900">{e.age}</td>
                                            <td className="p-5 text-center text-sm font-medium text-gray-900">{e.sexe == "H" ? "Homme" : "Femme"}</td>
                                            <td className="p-5 text-center text-sm font-medium text-gray-900">{e.email}</td>
                                            <td className="p-5 text-center text-sm font-medium text-gray-900">{e.place}</td>
                                            <td className="p-5 text-center text-sm font-medium text-gray-900">{e.tel}</td>
                                            <td className="p-5 text-center text-sm font-medium text-gray-900">
                                                {/* <h2 className="text-white bg-red-500 text-center p-3 rounded-2xl duration-500 hover:bg-red-700 cursor-pointer" onClick={()=>{
                                                    console.log(e.id)
                                                    axios.post("http://localhost:8080/api/user")
                                                }}>Effacer</h2> */}
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
