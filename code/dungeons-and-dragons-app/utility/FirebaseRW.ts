import {db} from '../firebaseConfig';





export const writeToFirebase = (path: string, object: Object) => {
    console.log(object)
    db.database().ref().child(path).set(object).catch(e => console.log(e));
}

export const readFromFirebase = (path: string) => {
    return db.database().ref().child(path).get();
}
