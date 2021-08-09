import React, {ChangeEvent, useEffect, useState} from 'react';
import {View} from 'react-native';
import {db} from "../firebaseConfig";
import firebase from 'firebase';

import '../styles/style.css'

import Map from "../components/Map";
import MapData from "../interfaces/MapData";

let mapDataInitial: MapData = {
    map: [], monsters: [], roomCols: 0, roomRows: 0, roomSize: 0, visibility: []
};

//todo figure out a better way to init firebase
const database = db;
const playerViewDatabase = firebase.database().ref().child('adamtest');
const tileSize = firebase.database().ref().child('tileSize');

const PlayerView = () => {

    const [map, setMap] = useState(mapDataInitial);
    const [size, setSize] = useState(25); //todo set the tile size?

    useEffect(() => {
        playerViewDatabase.on('value', mapData => {
            console.log('new map data');
            console.log(mapData.val());
            setMap(mapData.val().mapData);
        })
    }, [])

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
