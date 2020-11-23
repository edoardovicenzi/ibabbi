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


document.body.onload = () =>{
    
    if (document.cookie.length != 0){
        let subString =  document.cookie.split(";", 2)
        let nameValue = ""
        let abbinValue = ""

        abbinValue = subString[1].split("=")[1]
        nameValue = subString[0].split("=")[1]
        document.getElementById("user-input").setAttribute("disabled", "true")
        document.getElementById("user-input").setAttribute("placeholder", nameValue.charAt(0).toUpperCase() + nameValue.slice(1))
        document.getElementById("submit").setAttribute("disabled", "true")
        document.getElementById("submit").className = "submit-button-clicked"
        document.getElementById("submit").style= "background-color: rgba(36, 36, 36, 0.945)"
        document.getElementById("submit").innerHTML = "🎊   " +  abbinValue.charAt(0).toUpperCase() + abbinValue.slice(1) + "   🎉"
    }
}


window.addEventListener("keydown", (event) =>{
    let display = document.getElementById("adminControls").style.display
    window.addEventListener("keydown", (evn) =>{
        if (event.key == "Shift" && evn.key == "P"){
            console.log('ok')
            if (document.getElementById("adminControls").style.display == "none"){
                document.getElementById("adminControls").style.display = "block"
            }
            else {
                document.getElementById("adminControls").style.display = "none"
            }
        }
    })

    
})

function toggleAdminControls () {
    if (document.getElementById("admin-controls").style.display == "none"){
            document.getElementById("admin-controls").style.display = "block"
        }
        else {
            document.getElementById("admin-controls").style.display = "none"
        }
}

function getRandomArbitrary(max) {
    return Math.floor(Math.random() * max)
}

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

async function setNomi(){
    let data =await getAll()
    let setArray = data[0][0].base
    db.collection('asset').doc('remaining').set({
        nomiArray : setArray
    })
}

async function updateFirestore(array, combin){
    db.collection('asset').doc('combinazioni').set(combin, {merge: true})

    db.collection('asset').doc('remaining').set({
        nomiArray : array})
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
        let nome = document.getElementById('user-input').value.toLowerCase()

        if (base.indexOf(nome.toLowerCase()) == -1){
            document.getElementById("answer").innerHTML = "E tu chi saresti? Non sei sulla lista dei buoni!"
        }
        else{
            document.getElementById("answer").innerHTML = ""
            document.getElementById("user-input").setAttribute("disabled", "true")
            document.getElementById("submit").setAttribute("disabled", "true")
            document.getElementById("submit").className = "submit-button-clicked"
            document.getElementById("submit").style= "background-color: rgba(36, 36, 36, 0.945)"


            if (nomiArray.length < 1){
                document.getElementById("submit").innerHTML = "Sono finiti i babbi!"
            }

            if (base.indexOf(nome) > -1){
                let ran = getRandomArbitrary(nomiArray.length)
                while (nomiArray[ran] == nome){

                    ran = getRandomArbitrary(nomiArray.length)

                }

                fieldValue = nomiArray[ran]
                let d = new Date()
                d.setTime(d.getTime +(365*24*60*60*1000))
                let expires = "; expires=" + d.toUTCString()
                document.cookie = "nome=" + nome + expires + "; SameSite=Lax"
                document.cookie = "abbin=" + fieldValue + expires + "; SameSite=Lax"
                document.getElementById("submit").innerHTML = "🎊" + fieldValue.charAt(0).toUpperCase() + fieldValue.slice(1) + "🎉"


                comb[nome] = fieldValue
                nomiArray.splice(ran, 1)
                updateFirestore(nomiArray, comb)
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