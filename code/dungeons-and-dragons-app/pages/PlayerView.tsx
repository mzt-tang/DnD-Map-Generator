import React, {useEffect, useState, MouseEventHandler, useMemo, useRef} from 'react';
import {View} from 'react-native';
import { useHistory } from "react-router-dom";
import {db} from "../firebaseConfig";
import firebase from 'firebase';

import '../styles/style.css'

import Map from "../components/Map";
import MapData from "../interfaces/MapData";
import { hexToRgb } from '@material-ui/core';
import {readFromFirebase} from "../utility/FirebaseRW";
import ParseURLData from "../utility/ParseURLData";

import TitleFont from "../assets/Fonts/DraconisBold-qZxd6.tff";
import { Title } from '@material-ui/icons';

let mapDataInitial: MapData = {
    map: [], monsters: [], roomCols: 0, roomRows: 0, roomSize: 0, visibility: [], roomNum: 1, theme: "Caves"
};

function update(map: MapData){
    mapDataInitial = map
}

const PlayerView = () => {
    const history = useHistory();

    // let gamecode : string = history.location.state as string;
    let gamecode: string = ParseURLData(history.location.pathname) as string;
    console.log(gamecode)

    // const playerViewDatabase = async () => db.database().ref().child('testing/' + gamecode + '/currentMap');

    const [map, setMap] = useState<MapData>(mapDataInitial);
    const [size, setSize] = useState(25); //todo set the tile size?
    // const [currentMap, setCurrentMap] = useState(1);
    const currentMap = useRef({level: 1})

    useEffect(() => {
        db.database().ref('testing/' + gamecode + '/currentMap').on('value',mapNum => {
            const path = '/' + gamecode + '/levels/' + mapNum.val();
            currentMap.current.level = mapNum.val();
            readFromFirebase(path).then(value => setMap(value.val())).catch(e => console.log(e));
        });

        db.database().ref('testing/' + gamecode + '/levels').on('value',() => {
            const path = '/' + gamecode + '/levels/' + currentMap.current.level;
            readFromFirebase(path).then(value => setMap(value.val())).catch(e => console.log(e));
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
        <div className="backgroundImage">
            <View style={{position:'relative',justifyContent:"center"}}>
                <Map mapData={map} imagePressFunction={click} showFog={true} mapTheme={''}/>
            </View>
        </div>
    );
}

export default PlayerView


//<p style={{color:'white', position:'relative', left:'40%', fontSize:50, fontFamily:TitleFont}}>HELLO PLAYER</p>