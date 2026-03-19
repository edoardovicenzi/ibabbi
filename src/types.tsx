import type { Timestamp } from "firebase/firestore";

// DTO
export interface Person {
  id: string;
  isDisabled: boolean;
  name: string;
  email: string;
}

export interface PersonSecretFriend extends Person {
  secretFriend: PersonInfo;
}

export type PersonInfo = Omit<Person, "email">;

// Local Storage
export type BabbiLocalStorageSecretFriendUserInfo = Record<
  string,
  BabbiLocalStorageSecretFriendInfo
>;
export type BabbiLocalStorageSecretFriendInfo = {
  secretFriendName: string;
};
export type BabbiLocalStorage = Record<
  string,
  BabbiLocalStorageSecretFriendUserInfo
>;

// Database
export type FirebaseConfig = {
  apiKey: string;

  authDomain: string;

  databaseURL: string;

  projectId: string;

  storageBucket: string;

  messagingSenderId: string;

  appId: string;
};
export interface DocumentList {
  names: PersonSecretFriend[];
  timestamp: Timestamp;
}
