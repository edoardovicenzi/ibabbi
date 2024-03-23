import { Timestamp, addDoc, collection} from "firebase/firestore"
import { useEffect, useRef, useState } from "react"
import db from "../utilities/api"
import {useNavigate} from "react-router-dom"
import ValidationError from "./ValidationError"
import selectSecretFriends from "../utilities/NamesArray"

export default function CreateList({festivity ="christmas"}){
    const [nuovoNome, setNuovoNome] = useState("")
    const [listaNomi, setListaNomi] = useState([])
    const [validation, setValidation] = useState(true)
    const navigate = useNavigate()
    const code = useRef()


    useEffect(()=> {
        setTimeout(() => {
            setValidation(true)
        }, 3000)
        
    },[validation])
    function addName(){
        setListaNomi(prev => [...prev,{id: crypto.randomUUID(), name: nuovoNome.toLowerCase(), isDisabled:false}])
        setNuovoNome("")
    }
    function removeName(id){
        setListaNomi(prev => prev.filter(el => el.id != id))
    }

    function handleCodeNavigation(){
        return navigate(code.current.value)
    }
    async function handleSubmit(e){
        e.preventDefault()
        if (listaNomi.length < 3) return setValidation(false)
        setValidation(true)
        let colRef;
        switch (festivity){
            case "christmas":
                colRef = "listeNatale"
                break
            case "easter":
                colRef = "listePasqua"
                break
        }
        const collectionRef = collection(db, colRef)
        const data = {
            timestamp: Timestamp.now(),
            names: listaNomi,
            combinations: selectSecretFriends(listaNomi, 5),
        }
        const ref = await addDoc(collectionRef, data)

        return navigate(ref.id)
    }

    return (
        <div className="card-list-wrapper">
            <div className="card-list-enter-code">
                <h2>Un tuo amico ha già fatto la lista?</h2>
                <p>
                    <i>Inserisci il codice per scoprire il tuo {festivity === "christmas" ? "babbo natale segreto" : "coniglio segreto"}</i>
                </p>
                <input ref={code} placeholder="Inserisci qui..."/>
                <button className="btn" onClick={() => handleCodeNavigation()}>
                    Scopri il tuo {festivity === "christmas" ? "babbo natale segreto" : "coniglio segreto"}!
                </button>
            </div>

            <form className="card-list-form" onSubmit={handleSubmit}>
                <h2>Oppure crea la tua lista!</h2>
                <button className="hidden" disabled></button>
                <div className="card-list-add">
                    <input type="text" placeholder={listaNomi.length ? "Inserisci il prossimo nome" : "Inserisci il tuo nome"} value={nuovoNome} onKeyDown={(e) => {if (e.key === "Enter") return addName()}} onChange={(e) => setNuovoNome(e.target.value)}/>
                    <button className="bx bx-plus" type="button" onClick={() => addName()}>
                    </button>
                </div>
                {!validation && <ValidationError msg="Devi aggiungere almeno 3 persone!"/>}
                {listaNomi.length > 0 &&
                <ul className="card-list-ul">
                     {listaNomi.map(el => <li className="card-list-item" key={el.id}>{el.name} <button className="bx bx-trash" type="button" onClick={() => removeName(el.id)}></button></li>)}
                </ul>
                }
                <button className="btn" >Fatto!</button>
            </form> 

        </div>
    )
}
