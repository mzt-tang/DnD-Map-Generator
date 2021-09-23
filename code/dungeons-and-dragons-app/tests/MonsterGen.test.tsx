import React, {useEffect, useState} from 'react';
import firebase from 'firebase';
import 'firebase/firestore';

import {roomGen} from "../utility/roomGen";
import monsterGeneration from "../utility/MonsterGen";
import {db} from "../firebaseConfig";
import {roomRows} from "../components/Map";

interface mapProps {
    images: JSX.Element[]
}

describe('<MonsterGeneration />', () => {

    const data = db.firestore();
    // if (location.hostname === "localhost") {
    //
    // }
    data.useEmulator("localhost", 4400);

    console.log("TEST");
    /**
     * ROOM GENERATION TESTS
     */
    test('Initial firebase connection check', () => {
        try {
            console.log("test")
            const [rowr, setRowr] = useState<roomRows[]>([]);
            useEffect(() => {
                monsterGeneration("level1", rowr, setRowr);
            });
            console.log("yep: ", rowr);
        } catch (error) {
            console.log("firebase connection failed");
            console.assert(false);
        }
    });
});
