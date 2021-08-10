import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {db} from "../firebaseConfig";
import firebase from 'firebase';

import '../styles/style.css'

import Map from "../components/Map";
import MapData from "../interfaces/MapData";

let mapDataInitial: MapData = {
    map: [], monsters: [], roomCols: 0, roomRows: 0, roomSize: 0, visibility: []
};

// firebase
const playerViewDatabase = async () => await db.database().ref().child('adamtest');
const tileSize = firebase.database().ref().child('tileSize');

const PlayerView = () => {

    const [map, setMap] = useState(mapDataInitial);
    const [size, setSize] = useState(25); //todo set the tile size?

    useEffect(() => {
        playerViewDatabase().then(connection => {
            connection.on('value', update => setMap(update.val()))
        });
    },[]);

    if (map == null || map.roomSize == 0 || map.map == undefined) {
        return (
            <View>
                <h1>
                    Waiting for map to generate
                </h1>
            </View>
        );
    }

    return (
        <View>
            <Map mapData={map}/>
        </View>
    );
}
export default PlayerView
