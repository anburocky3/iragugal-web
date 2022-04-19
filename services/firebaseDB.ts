import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCTkNegj8xw39idXqsIY_25MGmUt0MwgZE",
  authDomain: "iragugal-7935b.firebaseapp.com",
  projectId: "iragugal-7935b",
  storageBucket: "iragugal-7935b.appspot.com",
  messagingSenderId: "538220841613",
  appId: "1:538220841613:web:a8f762554d49a7fc6b30c4",
  measurementId: "G-ES0JXQM52M",
};

const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);

export async function getUsers(db) {
  const citiesCol = collection(db, "users");
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map((doc) => doc.data());
  return cityList;
}

export async function addUsers(data) {
  const docRef = await addDoc(collection(db, "users"), data);
  return docRef;
}
