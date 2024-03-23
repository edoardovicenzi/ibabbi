import { Timestamp } from "firebase/firestore"

export default class List{
    constructor(combinations = [], names = []){
        this.combinations = combinations
        this.names = names
        this.timestamp = Timestamp.now()
    }
}


export const listConverter = {
    toFirestore: (list) => {
        return {
            combinations: list.combinations,
            names: list.names,
            timestamp: list.timestamp
        }
    },
    fromFirestore: (snapshot,options) => {
        const data = snapshot.data(options)
        return new List(data.combinations, data.names)
    }
}
