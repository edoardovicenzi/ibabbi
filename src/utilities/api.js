import { initializeApp } from "firebase/app";
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import {useLoaderData} from "react-router-dom"


const firebaseConfig = {
    apiKey: "AIzaSyAIS-Hjq3aPlWO1c1dtDWsizC0rq7VJAW8",

    authDomain: "testfirebase-bcqeop.firebaseapp.com",

    databaseURL: "https://testfirebase-bcqeop.firebaseio.com",

    projectId: "testfirebase-bcqeop",

    storageBucket: "testfirebase-bcqeop.appspot.com",

    messagingSenderId: "514838267794",

    appId: "1:514838267794:web:d62daba38d29333659e34b"
}

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)
export default db


export async function getNames(refTag, id){
    const ref = doc(db, selectCollectionByFestivity(refTag), id)
    const docSnap = await getDoc(ref)

    if (docSnap.exists()){
        return docSnap.data().names
    }
    else{
        console.log("An error occured: no such document exists!")
        return false
    }
}

export async function getSecretFriend(refTag, docId, nameId){
    const ref = doc(db, selectCollectionByFestivity(refTag),docId)
    const docSnap = await getDoc(ref)

    if (docSnap.exists()){
        console.log(docSnap.data().combinations.filter(el => el.id === nameId)[0])
        return docSnap.data().combinations.filter(el => el.id === nameId)[0]
    }
    else{
        console.log("An error occured: no such document exists!")
        return false
    }
}
function selectCollectionByFestivity(refTag){
    switch (refTag){
        case "christmas":
            return "listeNatale"
        case "easter":
            return "listePasqua"
        default:
            console.log("Festivity not recognized!")
    }
}
