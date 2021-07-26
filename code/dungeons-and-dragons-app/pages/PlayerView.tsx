import React, {ChangeEvent, useEffect, useState} from 'react';
import { View } from 'react-native';
import { db } from "../firebaseConfig";
import firebase from 'firebase';


const PlayerView = () => {

    const[map, setMap] = useState([]);
    const[size, setSize] = useState(25); // set the tile size?

    //todo figure out a better way to init firebase
    const database = db;


    // Get map from firebase.

    useEffect(() => {
        //Connect to Real Time Database
        const playerViewDatabase = firebase.database().ref().child('playerView');
        const tileSize = firebase.database().ref().child('tileSize');

        // Update view
        playerViewDatabase.on('value', map => console.log(map.val()));
        tileSize.on('value', size => console.log(size.val()));

    }, []);


    //todo return based on map.. return loading screen if map empty, otherwise display map.

    return (
        <View>
        <h1>
            This is the player view
        </h1>
        </View>
    );
}
export default PlayerView
