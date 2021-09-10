import React, {useEffect, useState,MouseEventHandler} from 'react';
import {View} from 'react-native';
import { useHistory } from "react-router-dom";
import {db} from "../firebaseConfig";
import firebase from 'firebase';

import '../styles/style.css'

import Map from "../components/Map";
import MapData from "../interfaces/MapData";
import { hexToRgb } from '@material-ui/core';

let mapDataInitial: MapData = {
    map: [], monsters: [], roomCols: 0, roomRows: 0, roomSize: 0, visibility: []
};

// firebase
//const playerViewDatabase = async () => await db.database().ref().child('adamtest');
const tileSize = firebase.database().ref().child('tileSize');

const PlayerView = () => {
    const history = useHistory();

    let gamecode : string = history.location.state as string;
    const playerViewDatabase = async () => await db.database().ref().child(gamecode);

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

    const click : MouseEventHandler<HTMLImageElement> = (event : React.MouseEvent<HTMLImageElement>) => {
        console.log(event.currentTarget.id);
    }



    return (
        <View style={{backgroundColor:hexToRgb("#AAAABB"),justifyContent:"center"}}>
            <Map mapData={map} imagePressFunction={click}/>
        </View>
    );
}
export default PlayerView
