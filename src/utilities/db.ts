import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  Timestamp,
  addDoc,
} from "firebase/firestore";
import type {
  FirebaseConfig,
  PersonSecretFriend,
  Person,
  PersonInfo,
} from "../types";

const firebaseConfig: FirebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,

  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,

  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,

  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,

  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,

  messagingSenderId: import.meta.env.VITE_FIREBASE_MES_SENDER_ID,

  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
export default db;

export async function getNames(
  id: string,
): Promise<PersonSecretFriend[] | null> {
  if (!id) return null;
  const ref = doc(db, "lists", id);
  const docSnap = await getDoc(ref);

  if (!docSnap.exists()) {
    console.error("An error occured: no such document exists!");
    return null;
  }
  const data = docSnap.data();
  return data.names as PersonSecretFriend[];
}

export async function addList(list: PersonSecretFriend[]): Promise<string> {
  try {
    const personsInfo: PersonInfo[] = list;
    const collectionRef = collection(db, "lists");
    const data = {
      timestamp: Timestamp.now(),
      names: personsInfo,
    };
    const ref = await addDoc(collectionRef, data);
    return ref.id;
  } catch {
    return "NotFound";
  }
}
