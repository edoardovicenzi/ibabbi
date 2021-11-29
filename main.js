var firebaseConfig = {
    apiKey: "AIzaSyCqqUalnoFstdylO7nNskSCAEM49sPe3x0",
    authDomain: "progettoswapi.firebaseapp.com",
    databaseURL: "https://progettoswapi.firebaseio.com",
    projectId: "progettoswapi",
    storageBucket: "progettoswapi.appspot.com",
    messagingSenderId: "547442299165",
    appId: "1:547442299165:web:e1e7d4863617f6c88691f4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()

async function getAll(){
var assets = []
    
    const getAll = await db.collection("asset").get().then(
        snap =>{
        let rawData = []
        snap.forEach(
            doc =>{
                rawData.push(doc.data())
            });
        return assets.push(rawData);
    
    }).catch(err => {
        console.log(err.Code)
        console.log(err.message)
    })
    return assets
}

document.body.onload = () =>{
    
    if (document.cookie.length != 0){
        let subString =  document.cookie.split(";", 2)
        let nameValue = ""
        let abbinValue = ""
        document.cookie = ""
        document.cookie = ""
        document.cookie = "nome"+ "=; expires=Thu, 01 Jan 2021 00:00:00 UTC"
        document.cookie = "abbin"+"=; expires=Thu, 01 Jan 2021 00:00:00 UTC"
        nameValue = subString[0].split("=")[subString[0].split("=").indexOf('name')+1]
        console.log(nameValue)
        db.collection('asset').doc('combinazioni').get()
        .then(doc =>{
            abbinValue = doc.data()[nameValue].toString()
            document.getElementById("user-input").setAttribute("disabled", "true")
            document.getElementById("user-input").setAttribute("placeholder", nameValue.charAt(0).toUpperCase() + nameValue.slice(1))
            document.getElementById("submit").setAttribute("disabled", "true")
            document.getElementById("submit").className = "submit-button-clicked"
            document.getElementById("submit").style= "background-color: rgba(36, 36, 36, 0.945)"
            document.getElementById("submit").innerHTML = "🎊   " +  abbinValue.charAt(0).toUpperCase() + abbinValue.slice(1) + "   🎉"
        })
        
        
    }
}


window.addEventListener("keydown", (event) =>{
    let adControl = document.getElementById("adminControls")
    window.addEventListener("keydown", (evn) =>{
        if (event.key == "Shift" && evn.key == "P"){
            if (adControl.style.display == "none"){
                adControl.style.display = "block"
            }
            else {
                adControl.style.display = "none"
            }
        }
    })  
})



function toggleAdminControls () {
    if (document.getElementById("admin-controls").style.display == "none"){
            document.getElementById("adminControls").style.display = "block"
        }
        else {
            document.getElementById("adminControls").style.display = "none"
        }
}

function getRandomArbitrary(max) {
    return Math.floor(Math.random() * max)
}

function setCookie (n, v){
    let d = new Date()
        d.setTime(d.getTime +(31*24*60*60*1000))
        let expires = "; expires=" + d.toUTCString()
        document.cookie = "name=" + n + expires + "; SameSite=Lax"  
}



async function setNomi(){
    let data =await getAll()
    let setArray = data[0][0].base
    db.collection('asset').doc('remaining').set({
        nomiArray : setArray
    })
    db.collection('asset').doc('combinazioni').set({})
}

async function updateFirestore(array, combin){
    db.collection('asset').doc('combinazioni').set(combin, {merge: true})

    db.collection('asset').doc('remaining').set({
        nomiArray : array})
}

function setOutput(result){
    document.getElementById("user-input").setAttribute("disabled", "true")
    document.getElementById("submit").setAttribute("disabled", "true")
    document.getElementById("submit").className = "submit-button-clicked"
    document.getElementById("submit").style= "background-color: rgba(36, 36, 36, 0.945)"
    document.getElementById("submit").innerHTML = "🎊" + result.charAt(0).toUpperCase() + result.slice(1) + "🎉"
}
async function add(){

    if (document.getElementById('user-input').value){

        document.getElementById("user-input").setAttribute("placeholder", "Dimmi il tuo nome prima!")
        document.getElementById("user-input").style.color = "black"
        document.getElementById("user-input").style.border = "none"
        let data = await getAll()
        let base = data[0][0].base
        let nomiArray = data[0][2].nomiArray
        let comb = {}
        let combArray = data[0][1]
        
        let nome = document.getElementById('user-input').value.toLowerCase()

        if (base.indexOf(nome) == -1){
            document.getElementById("answer").innerHTML = "E tu chi saresti? Non sei sulla lista dei buoni!"
        }
        else{
            if (Object.keys(combArray).indexOf(nome) > -1){
                setOutput(combArray[nome])
                setCookie(nome, combArray[nome])
            }
            else{

                document.getElementById("answer").innerHTML = ""


                if (nomiArray.length < 1){
                    document.getElementById("submit").innerHTML = "Sono finiti i babbi!"
                }
                else{
                    let arrayNoCopy = nomiArray.filter(el =>{
                        return !(el == nome)
                        })
                    let ran = getRandomArbitrary(arrayNoCopy.length)
                    if (nomiArray.length > 2){
                        setCookie(nome, nomiArray[ran])
                        setOutput(arrayNoCopy[ran])
                        comb[nome] = arrayNoCopy[ran]
                        nomiArray.splice(nomiArray.indexOf(arrayNoCopy[ran]), 1)
                        updateFirestore(nomiArray, comb)  
                    }
                    else{
                        if (nomiArray.indexOf(nome) > -1){
                            setCookie(nome, nomiArray[ran])
                            setOutput(arrayNoCopy[0])
                            comb[nome] = arrayNoCopy[0]
                            nomiArray.splice(nomiArray.indexOf(arrayNoCopy[0]), 1)
                            updateFirestore(nomiArray, comb) 
                        }
                        else{
                            setCookie(nome, nomiArray[ran])
                            setOutput(nomiArray[0])
                            comb[nome] = nomiArray[0]
                            nomiArray.splice(nomiArray[0], 1)
                            updateFirestore(nomiArray, comb)
                        }
                    }
                    
                }  
            }
        }

        
    }
    else{
        document.getElementById("user-input").setAttribute("placeholder", "Dimmi il tuo nome prima!")
        document.getElementById("user-input").style.color = "red"
        document.getElementById("user-input").style.border = "1px solid red"
        
    }
    
        
    
}

function getColLen() {
    db.collection('asset').doc('combinazioni').get()
    .then(doc =>{
            document.getElementById('combNum').innerHTML = Object.keys(doc.data()).length    
    }).catch( err =>{
        document.getElementById('combNum').innerHTML = err
    })
}

function getColKeys(){
    db.collection('asset').doc('combinazioni').get()
    .then(doc =>{
            document.getElementById('colKeys').innerHTML = Object.keys(doc.data())  
    }).catch( err =>{
        document.getElementById('colKeys').innerHTML = err
    })
}
