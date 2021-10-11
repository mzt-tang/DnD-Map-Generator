import React, {useEffect, useState, MouseEventHandler, useMemo, useRef} from 'react';
import {View, Text} from 'react-native';
import { useHistory } from "react-router-dom";
import {db} from "../firebaseConfig";
import firebase from 'firebase';

import '../styles/style.css'

import Map from "../components/Map";
import MapData from "../interfaces/MapData";
import {Button, hexToRgb} from '@material-ui/core';
import {readFromFirebase} from "../utility/FirebaseRW";
import ParseURLData from "../utility/ParseURLData";

import { useFonts } from 'expo-font';

import TitleFont from "../assets/Fonts/DraconisBold-qZxd6.tff";
import { Title } from '@material-ui/icons';

let mapDataInitial: MapData = {
    map: [], monsters: [], roomCols: 0, roomRows: 0, roomSize: 0, visibility: [], roomNum: 1, theme: "Caves"
};

//style={{ width: '200px', top: 10, fontSize:16,textAlign:"center",textAlignVertical:"center", padding:'5px'}
const Hidden = () => {
    let [fontsLoaded] = useFonts({
        'Title': require('../assets/Fonts/DraconisBold-qZxd6.ttf'),
      });
    return (
        <div className="backgroundImage_with_message">
            <Text style={{color:'#FFFFFF', width:'1000px', fontSize:75, textAlign:"center", textAlignVertical:"center", fontFamily:'Title'}}>
                Map is hidden by DM
            </Text>
        </div>
    );
}

const PlayerView = () => {
    const history = useHistory();

    let gamecode: string = ParseURLData(history.location.pathname) as string;

    const [map, setMap] = useState<MapData>(mapDataInitial);
    const [size, setSize] = useState(25); //todo set the tile size?
    const [mapIsHidden, setMapIsHidden] = useState(true);
    // const [currentMap, setCurrentMap] = useState(1);
    const currentMap = useRef({level: 1})

    useEffect(() => {
        db.database().ref(gamecode + '/currentMap').on('value',mapNum => {
            const path = gamecode + '/levels/' + mapNum.val();
            currentMap.current.level = mapNum.val();
            readFromFirebase(path).then(value => setMap(value.val())).catch(e => console.log(e));
        });

        db.database().ref( gamecode + '/levels').on('value',() => {
            const path = gamecode + '/levels/' + currentMap.current.level;
            readFromFirebase(path).then(value => setMap(value.val())).catch(e => console.log(e));
        });

        db.database().ref( gamecode + '/isHidden').on('value',isHidden => {
            setMapIsHidden(isHidden.val());
        });
    },[]);

    let [fontsLoaded] = useFonts({
        'Title': require('../assets/Fonts/DraconisBold-qZxd6.ttf'),
      });

    if (map == null || map.roomSize == 0 || map.map == undefined) {
        return (
            <div className="backgroundImage_with_message">
                <Text style={{color:'#FFFFFF', width:'1000px', fontSize:75, textAlign:"center", textAlignVertical:"center", fontFamily:'Title'}}>
                    Waiting for map to generate
                </Text>
            </div>
        );
    }

    if (mapIsHidden) {
        return <Hidden/>
    }

    return (
        <div className="backgroundImage" style={{flexDirection:'row'}}>
            <Button id="topButton"
                    style={{backgroundColor:'white', width: '40px', height:'40px', top: 10, borderRadius:10, position: "fixed" }}
                    onClick={() => {
                history.push('/home')
            }}>X</Button>
            <View style={{position:'relative',justifyContent:"center"}}>
                <Map mapData={map} showFog={true} mapTheme={''} maxWidth={window.innerWidth/45} maxHeight={window.innerHeight/30.2} overlay={false}/>
            </View>
        </div>
    );
}

export default PlayerView
