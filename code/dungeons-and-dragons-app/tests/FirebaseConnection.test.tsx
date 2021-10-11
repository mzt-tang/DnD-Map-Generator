// This is template code for testing using jest for the CI part of CI/CD
// The guide im following is: https://docs.expo.io/guides/testing-with-jest/

// To install the jest test library: "yarn add jest-expo" or "npm install jest-expo"
// To run all tests: "npx jest --ci"

import React from 'react';
import {db} from "../firebaseConfig";


describe('<FirebaseConnection />', () => {
//     /**
//      * FIREBASE CONNECTION TESTS
//      */
    // test('Can connect to RTDB', () => {
    //     try {
    //         const dbRefObject = db.database().ref().child("abcde");
    //         console.log(dbRefObject);
    //         console.assert(dbRefObject != null);
    //     } catch (error) {
    //         console.error("Couldn't connect to RTDB");
    //     }
    // });

    test('Can connect to Firestore', () => {
        try {
            const ref = db.firestore()
            console.assert(ref != null);
        } catch (error) {
            console.error("Couldn't connect to Firestore");
        }
    });

    test('Retrieves monster collection', () => {
        try {
            let monsterlist: any[] = [];
            const ref = db.firestore().collection("monsters");

            async function fetchData() {
                ref.onSnapshot((querySnapshot) => {
                    const monsters: any[] = [];
                    querySnapshot.forEach((doc) => {
                        monsters.push(doc.data());
                    });
                    monsterlist = monsters
                })
            }

            fetchData();
            expect(monsterlist.length == 0);
        } catch (error) {
            console.error("Couldn't fetch monster collection");
        }
    });

    // test('Retrieves collection of games', () => {
    //     try {
    //         const dbRefObject = db.database().ref();
    //         const [mapData, setMapData] = useState([]);
    //         dbRefObject.get().then(value => setMapData(value.val()))
    //         console.assert(mapData != null);
    //     } catch (error) {
    //         console.error("Couldn't retrieve game collections");
    //     }
    // });

    test('can filter data', () => {
        let monsterlist: any[] = [];
        const ref = db.firestore().collection("monsters").where('faction', '==', 'Fiend');

        async function fetchData() {
            ref.onSnapshot((querySnapshot) => {
                const monsters: any[] = [];
                querySnapshot.forEach((doc) => {
                    monsters.push(doc.data());
                });
                monsterlist = monsters
            })
        }

        fetchData();
        expect(monsterlist.includes('Barbed Devil') && !monsterlist.includes('Aboleth'))
    })
});
