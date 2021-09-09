import { Box, Button, Collapse, hexToRgb, makeStyles, Slider, Table, TableCell, TableHead, TableRow } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import Map, { getFirebaseMap } from '../components/Map';
import '../styles/style.css'
import { useHistory } from "react-router-dom";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { db } from '.././firebaseConfig';

import saveImage from '../assets/saveIcon.png'

import React, {MouseEventHandler, useEffect, useState} from 'react';

import { Grid } from "@material-ui/core";
import MapGen from '../utility/MapGen';
import MapData from "../interfaces/MapData";
import { View } from "react-native";
import PlayerView from "./PlayerView";
import { InsertInvitation } from "@material-ui/icons";

//Firebase
const dbRefObject = db.database().ref().child('adamtest');

let mapDataInitial: MapData = {
    map: [], monsters: [], roomCols: 0, roomRows: 0, roomSize: 0, visibility: [], roomNum: 1
};

const useStyles = makeStyles((theme) => ({
    grid: {
        width: '100%',
        margin: '0px'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        background: theme.palette.success.light,
    }
}));

let lastMap: MapData
var curMap:number
const DmView = () => {
    
    const history = useHistory();
    const [open, setOpen] = React.useState(false);
    const [adjustingVisibility, setAdjustingVisibility] = React.useState(false);

    let levels: MapData[] = getFirebaseMap()


    const classes = useStyles();
    const [mapData, setMapData] = useState(mapDataInitial);

    useEffect(() => {
        dbRefObject.get().then(value => setMapData(value.val()))
    }, [])

    const generateMap = () => {
        MapGen().then(
            value => {
                setMapData(value);
                //PlayerView.update(mapData) // Update the player view
                db.database().ref().child('games/code/map/levels/' + levels.length).set(value)
            }
        )
    };

    if (mapData.map.length == 0) {
        return (
            <Grid>
                <Button onClick={generateMap}>Update Map</Button>
            </Grid>
        )
    }

    const clickVisibilityHandler : MouseEventHandler<HTMLImageElement> = (event : React.MouseEvent<HTMLImageElement>) => {
        console.log(event.currentTarget.id);
    }


    
    levels = getFirebaseMap()
    return (
        <div id='dmView' style={{ backgroundColor: hexToRgb("#8b5f8c"), height: "100%" }}>
            <div id="topBar">
                <Button id="topButton" style={{ width: '40px', top: 10 }} onClick={() => {
                    history.push('/home')
                }}>X</Button>
                <Button id="topButton" style={{ width: '200px', top: 10 }}><img src={saveImage} style={{ width: '17px', marginRight: '10px' }} />Save</Button>
                <Button id="topButton" style={{ width: '200px', top: 10 }} onClick={() => {
                    // Generate new map
                    let newLevels = levels
                    if (levels.length > 0) {
                        setMapData(levels[levels.length-1])
                    }
                    generateMap()
                    newLevels.push(mapData)
                    levels = getFirebaseMap()
                    lastMap = mapData
                    curMap = levels.length-1
                    setMapData(levels[levels.length-1])
                }}>New Level</Button>
                <Button id="topButton" style={{ width: '100px', top: '10px' }} onClick={() => {
                    curMap = curMap-1
                    if (levels.indexOf(mapData) == 0) {
                        setMapData(levels[curMap])
                    }
                    if (levels.length > 1 && curMap > 0) {
                        setMapData(levels[curMap])
                    }
                    else {
                        alert("This is the first level")
                    }
                }}>Previous Map</Button>
                <Button id="topButton" style={{ width: '100px', top: '10px' }} onClick={() => {
                    curMap = curMap + 1
                    if (curMap == levels.length || levels.length == 0) {
                        alert("This is the last level, click \"NEW LEVEL\"")
                        curMap = curMap-1
                    }
                    else {
                        setMapData(levels[curMap])
                    }
                }}>Next Map</Button>
                
                <div id="topButton" style={{ position: "absolute", left: "900px", top: 10 }}>
                    FOG ON/OFF
                    <Button>Toggle Fog</Button>
                    <Button>add fog</Button>
                </div>
                <div id='route' style={{ backgroundColor: hexToRgb("#AAAABB"), position: "absolute", top: 100, alignSelf: "center", right: "35%" }}>
                    <Map mapData={mapData} imagePressFunction={clickVisibilityHandler}/>
                </div>
            </div>
        </div>
    )
}

export default DmView