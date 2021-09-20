import React, {useEffect, useState,MouseEventHandler} from 'react';
import {View} from 'react-native';
import { useHistory } from "react-router-dom";
import {db} from "../firebaseConfig";
import firebase from 'firebase';

import '../styles/style.css'

import Map from "../components/Map";
import MapData from "../interfaces/MapData";
import { hexToRgb } from '@material-ui/core';
import {readFromFirebase} from "../utility/FirebaseRW";

let mapDataInitial: MapData = {
    map: [], monsters: [], roomCols: 0, roomRows: 0, roomSize: 0, visibility: [], roomNum: 1, theme: "Caves"
};

function update(map: MapData){
    mapDataInitial = map
}

const PlayerView = () => {
    const history = useHistory();

    let gamecode : string = history.location.state as string;
    const playerViewDatabase = async () => await db.database().ref().child('testing/' + gamecode + '/currentMap');

    const [map, setMap] = useState(mapDataInitial);
    const [size, setSize] = useState(25); //todo set the tile size?

    useEffect(() => {
        playerViewDatabase().then(connection => {
            connection.on('value', update => {
                const path = '/' + gamecode + '/levels/' + update.val();
                console.log(path)
                readFromFirebase(path).then(value => setMap(value.val() as MapData));
                setMap(update.val())
            })
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
            <Map mapData={map} imagePressFunction={click} showFog={true}/>
        </View>
    );
}
export default PlayerView
