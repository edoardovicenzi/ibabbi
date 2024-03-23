import { useEffect, useState } from "react"
import { getNames } from "../utilities/api"
import { useLoaderData, useParams } from "react-router-dom"
import writeToClipboard from "../utilities/clipboard"
import {isMobile} from "react-device-detect"


const ACTIONS = {
    copy: "code",
    share: "share",
    link: "link"
}

export async function loader({params}){
    const path = window.location.href
    if (path.match("christmas")) return getNames("christmas",params.id)
    else if (path.match("easter")) return getNames("easter",params.id)
}
export default function SecretFriend({festivity = "christmas"}){
    const data = useLoaderData()
    const [secretFriend, setSecretFriend] = useState("")
    const [myName, setMyName] = useState("")
    const { id } = useParams()
    const [actionsState, setActionsState] = useState("")

    useEffect(() =>{
        //se esiste un local storage prendi e parsa l'oggetto al suo interno
        try{
            const storage = JSON.parse(localStorage.getItem("ibabbi"))
            setSecretFriend(storage[id].secretFriend.name)
        }
        catch{
            console.log("No secret friend found in storage")
        }
    }, [])




    function handleShare(action){
        const shareData = {
            title: "La banda dei Babbi",
            text: "Scopri il tuo babbo natale segreto!",
            url: document.location.href,
        };
        switch(action){
            case ACTIONS.copy:
                try{
                    writeToClipboard(id)
                    setActionsState("Copiato!")
                }
                catch{
                    console.log("Unable to write on clipboard")
                }
                break
            case ACTIONS.link:
                try{
                    writeToClipboard(shareData.url)
                    setActionsState("Link copiato!")
                }
                catch{
                    console.log("Unable to write on clipboard")
                }
                break
            case ACTIONS.share:
                console.log(isMobile)
                try{
                    navigator.share(shareData)
                    setActionsState("Fatto!")
                }
                catch (err){
                    console.log("Share unavailable, error: ",err)
                }
                break
            default: console.log("Action not permitted!")

        }
    }
    function handleClick(nameId){
        if (!secretFriend){
            const friendData = data.filter(el => el.id === nameId)[0]
            const personalName = friendData.name
            setMyName(personalName)
            setSecretFriend(friendData.secretFriend.name) 
            localStorage.setItem("ibabbi",JSON.stringify({...JSON.parse(localStorage.getItem("ibabbi")), [id]: friendData}))
        }
    }



    return (
        <div className="secret-friend-view-wrapper">
            <div className="secret-friend-view">
                <h2>{!secretFriend ? "Seleziona il tuo nome" :  "Il tuo ".concat( festivity === "christmas" ? "babbo segreto": "coniglio segreto").concat(" è...")}</h2>
                {secretFriend && <p>{secretFriend}</p>}
                {!secretFriend && <ul>
                    {data.map((el) => <li key={el.id} onClick={() => handleClick(el.id)}>{el.name}</li>)}
                </ul>}
            </div>
            <div className="secret-friend-share">
                <h3>Copia il codice o condividi link per invitare altre persone!</h3>
                <p>{id}</p>
                {actionsState && <p className="p-actions-confirmation">{actionsState}</p>}
                <div className="share-url">
                    <button className="btn bx bx-copy" onClick={() => handleShare(ACTIONS.copy)}></button>
                    {isMobile && <button className="btn bx bx-share-alt" onClick={() => handleShare(ACTIONS.share)}></button>}
                    <button className="btn bx bx-link" onClick={() => handleShare(ACTIONS.link)}></button>
                </div>
            </div>
        </div>
    ) 
}
