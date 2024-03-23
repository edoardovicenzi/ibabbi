//selects all the secret friends from an array where friends structure is {id: id, name:name}
export default function selectSecretFriends(namesArr = []){
    let mixedNames = namesArr.slice().sort(() => Math.random()- 0.5)
    for (let i = 0; i < mixedNames.length; i++){
        const currentName = namesArr[i]
        let nextIndex = (i+1) % mixedNames.length
        let nextName = mixedNames[nextIndex]
        currentName.secretFriend = {id : nextName.id,name : nextName.name}
    }

    return mixedNames
}

