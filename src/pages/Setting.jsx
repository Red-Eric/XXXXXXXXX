import { useEffect, useMemo, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { getUserFromId } from "../func/getAllUser"
import pfp from "../assets/default.jpg"
import { Checkbox } from "@mui/material"
import { FormControlLabel } from "@mui/material"
import Swal from "sweetalert2"
import { getFile } from "../func/pickerF"
import "./SignIn.css"
import axios from "axios"

const PATH_IMAGE = "/src/images/"
// 
const SettingPage = () => {

    const [userDef, setUserDef] = useState(null)



    const [max, setMax] = useState("0/90")
    const [name_, setname_] = useState("")
    const [fName_, setFname_] = useState("")
    const [bio_, setBio_] = useState("")
    const [email_, setEmail_] = useState("")
    const [age_, setAge_] = useState(18)
    const [hobby, setHobby] = useState([])
    const [isMale, setIsMale] = useState(true)
    const [password, setPassWord] = useState("")
    const [home, setHome] = useState(null)
    const [tel, setTel] = useState("")
    const [imgUrl, setImgUrl] = useState("http://localhost:5173/src/assets/default.jpg")
    const [pic, setPic] = useState("/src/assets/default.jpg")


    useEffect(() => {
        getUserFromId(parseInt(sessionStorage.getItem("id")))
            .then(data => {
                pfpRef.current.src = data.image
                setPic(data.image)
                setname_(data.name)
                setFname_(data.fname)
                setAge_(data.age)
                setHome(data.place)
                setBio_(data.bio)
                setUserDef(data)
            })
    }, [])

    const ret = useRef(null)
    const hobbies = ["✈️ Voyager", "🏕️ Camping", "🎭 Théâtre", "🎨 dessin", "🎬 Cinéma", "📸 Photographie", "🎧 Musique", "🎸 Jouer d'un instrument", "💃 Danser", "🏋️ Musculation", "⚽ Football", "🍳 Cuisiner", "🕹️ Jeux vidéo", "💻 Programmation", "🧠 Méditation",];

    const handleBio = (e) => {
        let len = e.target.value.length
        e.target.value = e.target.value.replace(/[^a-zA-Z ]/g, '')
        setBio_(e.target.value)
        setMax(`${len}/90`)
    }
    const handleSelectionH = (e) => {
        let AllCheckBox = document.querySelectorAll("input[datah]")
        let cArray = []


        Array.from(AllCheckBox).forEach((elem) => {
            if (elem.checked) {
                cArray.push(elem.value)

            }
        })
        setHobby(cArray)

    }


    const security = useMemo(() => {
        return getSecurity(password)
    }, [password])

    const pfpRef = useRef(null)
    /*
    */

    const [xxxxx, setxXXXx] = useState(false)
    const GetInfo = () => {
        let champStr = [name_, fName_, email_, password, bio_, home]
        let validate = true

        age_ >= 18 ? validate = true : validate = false

        for (let str of champStr) {
            if (str === "" || str.length < 2 || hobby.length === 0) {
                validate = false
                break
            } else if (hobby.length > 5) {
                Swal.fire({
                    icon: "error",
                    title: "Limite",
                    text: "Centre d interet doit etre moin de 6"
                })
                return false
            }
            else { }
        } // Inputs  = All 1
        // TRUE 
        if (validate) {
            //    /update/user
            axios.post("http://localhost:8080/api/user/update", { // /api/user/update 
                id: parseInt(sessionStorage.getItem("id")),
                age: age_,
                bio: bio_,
                tel: `+ 261 ${tel}`,
                email: `${email_}@gmail.com`,
                fname: fName_,
                place: home,
                hobby: hobby,
                image: pic,
                name: name_,
                password: password,
                sexe: isMale ? "H" : "F"
            }).then(res => {
                Swal.fire({
                    title: "Modifier",
                    text: "modification avec succes",
                    icon: "success"
                })
                window.location.reload()
            })

        } else {
            Swal.fire({
                icon: "error",
                title: "Erreur",
                text: "Verifiez vos Information"
            })
        }

    }

    const handleSex = () => {
        setIsMale(!isMale)
    }

    ////////////////////////////////////
    const handleChangeName = (e) => {
        e.target.value = e.target.value.replace(/[^a-zA-Z]/g, '')
        setname_(e.target.value)
    }
    const handleChangeFName = (e) => {
        e.target.value = e.target.value.replace(/[^a-zA-Z]/g, '')
        setFname_(e.target.value)
    }
    const handleChangeAge = (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '')
        setAge_(parseInt(e.target.value))
    }

    const handleChangeTel = (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '')
        setTel(parseInt(e.target.value))
    }

    const handleChangeEmail = (e) => {
        e.target.value = e.target.value.replace(/[^a-zA-Z0-9]/g, '')
        setEmail_(e.target.value)
    }
    const handlePlace = (e) => {
        e.target.value = e.target.value.replace(/[^a-zA-Z0-9]/g, '')
        setHome(e.target.value)
    }

    const handleChangePassword = (e) => {
        setPassWord(e.target.value)
    }
    ////////////////////////////////////



    const changePfp = () => {
        getFile().then(data => {
            setPic(`${PATH_IMAGE}${data}`)
            setImgUrl(`${PATH_IMAGE}${data}`)
        })

    }
    useEffect(() => {
        pfpRef.current.src = pic
    }, [pic])

    return (
        <div>

            <div className="w-[40%] bg-white mt-6 ml-auto mr-auto rounded-3xl pb-3 max-h-[620px] overflow-y-scroll custom-scrollbar">
                <h1 className="font-medium text-center text-pink-500 text-4xl mb-8">Modification</h1>
                <img id="pfp" onClick={changePfp} ref={pfpRef} className="cursor-pointer w-32 h-32 rounded-full ml-auto mr-auto mb-2 border-2 border-pink-500" src={pfp} alt="pfp" />
                <Link to={"/"} ref={ret}></Link>
                <div className="ml-auto mr-auto w-[75%] mb-5 flex justify-between gap-4">
                    <div>
                        <label className="block text-pink-500 text-sm font-bold mb-2" htmlFor="username">
                            Nom
                        </label>
                        <input
                            className="w-full shadow appearance-none border border-pink-500 text-pink-500 rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-white"
                            type="text"
                            placeholder="Nom..."
                            onChange={handleChangeName}
                            defaultValue={userDef?.name}
                            autoComplete="off"
                        />
                    </div>
                    <div>
                        <label className="block text-pink-500 text-sm font-bold mb-2" htmlFor="username">
                            Prenom
                        </label>
                        <input
                            defaultValue={userDef?.fname}
                            className="w-full shadow appearance-none border border-pink-500 text-pink-500 rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-white"
                            type="text"
                            placeholder="Prenom..."
                            autoComplete="off"
                            onChange={handleChangeFName}
                            id="prenom"
                        />
                    </div>
                    <div className="w-[15%]">
                        <label className="block text-pink-500 text-sm font-bold mb-2" htmlFor="username">
                            Age
                        </label>
                        <input
                            defaultValue={userDef?.age}
                            className="w-full shadow appearance-none border border-pink-500 text-pink-500 rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-white"
                            type="text"
                            placeholder="Age"
                            autoComplete="off"
                            onChange={handleChangeAge}
                            required={true}
                            maxLength={2}
                        />
                    </div>

                </div>
                <div className="ml-auto mr-auto w-[75%] mb-5 flex justify-between gap-4">

                    <div className="w-[60%]">
                        <label className="block text-pink-500 text-sm font-bold mb-2" htmlFor="username">
                            De
                        </label>
                        <input
                            className="w-full shadow appearance-none border border-pink-500 text-pink-500 rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-white"
                            type="text"
                            placeholder="Votre Habitation"
                            autoComplete="off"
                            onChange={handlePlace}
                            defaultValue={userDef?.place}
                            maxLength={50}
                        />
                    </div>

                    <div className="w-[35%]">
                        <label className="block text-pink-500 text-sm font-bold mb-2" htmlFor="username">
                            Tel
                        </label>
                        <input
                            className="w-full shadow appearance-none border border-pink-500 text-pink-500 rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-white"
                            type="text"
                            placeholder="Votre Numero"
                            autoComplete="off"
                            onChange={handleChangeTel}
                            maxLength={10}
                        />
                    </div>

                </div>

                <div className="ml-auto mr-auto w-[75%] mb-5 flex gap-x-16">
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isMale}
                                onChange={handleSex}
                                sx={{ color: "pink", '&.Mui-checked': { color: "pink" } }}
                            />
                        }
                        label="Je suis un Homme"
                        sx={{ color: "pink" }}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={!isMale}
                                onChange={handleSex}
                                sx={{ color: "pink", '&.Mui-checked': { color: "pink" } }}
                            />
                        }
                        label="Je suis une Femme"
                        sx={{ color: "pink" }}
                    />
                </div>

                <div className="ml-auto mr-auto w-[75%] mb-5">
                    <label className="block text-pink-500 text-sm font-bold mb-2" htmlFor="username">
                        Email
                    </label>

                    <div className="flex items-center gap-2">
                        <input
                            className="w-[60%] shadow appearance-none border border-pink-500 text-pink-500 rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-white"
                            type="email"
                            placeholder="Votre Email"
                            required={true}
                            autoComplete="off"
                            onChange={handleChangeEmail}
                            id="email"
                        />
                        <p className="block text-pink-500 text-sm font-extralight mb-2">@gmail.com</p>
                    </div>
                </div>

                <div className="ml-auto mr-auto w-[75%] mb-5">
                    <label className="block text-pink-500 text-sm font-bold mb-2" htmlFor="username">
                        Mots de passes
                    </label>

                    <div className="flex items-center gap-2">
                        <input
                            className="w-[60%] shadow appearance-none border border-pink-500 text-pink-500 rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-white"
                            type="password"
                            placeholder="Votre mots de passe"
                            autoComplete="off"
                            onChange={handleChangePassword}
                        />
                        <p className={`block text-sm font-medium mb-2 ${security.color}`}>{security.sec}</p>
                    </div>
                </div>

                <div className="ml-auto mr-auto w-[75%] mb-5">
                    <label htmlFor="message" className="block text-pink-500 text-sm font-bold mb-2">Bio ({max})</label>
                    <textarea defaultValue={userDef?.bio} id="bio" maxLength={90} autoComplete="off" onChange={handleBio} rows="3" className="resize-none w-full shadow appearance-none border border-pink-500 text-pink-500 rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-white" placeholder="Write your thoughts here..."></textarea>
                </div>

                <div className="ml-auto mr-auto w-[75%] mb-5 ">
                    <label className="block text-pink-500 text-sm font-bold mb-2" htmlFor="username">
                        Centre d'intérêt(s)
                    </label>
                    <div className="flex flex-wrap gap-3">
                        {hobbies.map((value, index) => (
                            <div key={value}>
                                <input type="checkbox" onChange={handleSelectionH} datah="check" id={`checkbox-${value}`} value={value} className="hidden peer" />
                                <label
                                    htmlFor={`checkbox-${value}`}
                                    className="inline-flex items-center justify-between w-full p-1 text-pink-500 bg-white border-2 border-pink-500 rounded-lg cursor-pointer hover:text-white hover:bg-pink-500 peer-checked:border-pink-500 peer-checked:text-white"
                                >
                                    <h1 id={`hobbies-${index}`}>{value}</h1>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-center">
                    <button
                        className="bg-pink-500 hover:bg-white text-white hover:text-pink-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-auto mr-auto"
                        type="button"
                        onClick={GetInfo}
                    >
                        S'inscrire
                    </button>
                </div>

            </div>
        </div>


    )
}

function getSecurity(psswrd) {
    if (psswrd.length <= 5) {
        return {
            color: "text-red-700",
            sec: "Faible"
        }
    } else if (psswrd.length > 5 && psswrd.length <= 10) {
        return {
            color: "text-yellow-400",
            sec: "Moyen"
        }
    } else {
        return {
            color: "text-green-600",
            sec: "Fort"
        }
    }
}

export default SettingPage