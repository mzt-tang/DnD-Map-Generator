import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCDGPan4XvrnkEJ3OtC2j-2U-eWNOsrgUg",
    authDomain: "dungeon-in-a-jiffy-e9931.firebaseapp.com",
    projectId: "dungeon-in-a-jiffy-e9931",
    storageBucket: "dungeon-in-a-jiffy-e9931.appspot.com",
    messagingSenderId: "901300906844",
    appId: "1:901300906844:web:8a79ae0f692e5445afaf99",
    databaseURL: "https://dungeon-in-a-jiffy-e9931-default-rtdb.asia-southeast1.firebasedatabase.app/"
}; //this is where your firebase app values you copied will go

const getFirebase = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }else {
        firebase.app(); // if already initialized, use that one
    }
    return firebase;
}

export const db = getFirebase();
