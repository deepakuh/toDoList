import {initializeApp} from "firebase/app";
import {getfirestore} from "@firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARNF6ujVxWCtRIhU5WiktI0jNNZmElqVQ",
  authDomain: "to-do-list-7dbe9.firebaseapp.com",
  databaseURL: "https://to-do-list-7dbe9-default-rtdb.firebaseio.com",
  projectId: "to-do-list-7dbe9",
  storageBucket: "to-do-list-7dbe9.appspot.com",
  messagingSenderId: "488361281837",
  appId: "1:488361281837:web:1772d043a7426078c3eba4",
  measurementId: "G-SBBKKYY773"
};

  const app =initializeApp(firebaseConfig);
  export const firestore = getfirestore(app);