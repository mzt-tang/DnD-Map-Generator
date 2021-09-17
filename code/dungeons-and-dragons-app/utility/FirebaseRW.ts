import {db} from '.././firebaseConfig';
import firebase from "firebase/app";

export const writeToFirebase = (path: string, object: Object) => {
    db.database().ref().child('testing' + path).set(object).catch(e => console.log(e));
}

export const readFromFirebase = (path: string): Promise<firebase.database.DataSnapshot> => {
    return db.database().ref().child('testing' + path).get();

}
