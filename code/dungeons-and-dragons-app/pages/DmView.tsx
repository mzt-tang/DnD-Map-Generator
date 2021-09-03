import { Box, Button, Collapse, hexToRgb, makeStyles, Slider, Table, TableCell, TableHead, TableRow } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import Map, { getFirebaseMap } from '../components/Map';
import '../styles/style.css'
import { useHistory } from "react-router-dom";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import firebase from 'firebase'
import { db } from '.././firebaseConfig';

import saveImage from '../assets/saveIcon.png'

import React, { useEffect, useState } from 'react';

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

const DmView = () => {
    const history = useHistory();
    const [open, setOpen] = React.useState(false);

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

    if (levels.length == 0) {
        levels = getFirebaseMap()
    }

    if (!levels.includes(mapDataInitial)) {
        levels.push(mapDataInitial)
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
                    levels = getFirebaseMap()
                    generateMap()
                    levels.push(mapData)
                    lastMap = mapData
                    console.log(levels.length)
                }}>New Level</Button>
                <React.Fragment>
                    <TableRow>
                        <TableCell>
                            <IconButton aria-label="expand row" size="small" onClick={() => { setOpen(!open) }}>
                                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                            Level
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <Box margin={1}>
                                    <Table size="small" aria-label="purchases">
                                        <TableHead>
                                            <TableRow style={{ position: "relative", top: 0, width: '100%', display: "flex", flexDirection: "column", zIndex:10 }}>
                                                {levels.map((l => (
                                                    // Get the levels from the firebase, loop through all of them, adding a button per level and attaching a link to load that level to the button
                                                    <Button id="topButton" style={{ width: '100px' }} onClick={() => {
                                                        levels = getFirebaseMap()
                                                        //load the levels
                                                        if (levels.indexOf(l) == levels.length-1) {
                                                            levels = getFirebaseMap()
                                                            console.log("last MAP IN ARRAY " + levels.length)
                                                            console.log("ENTERING LEVEL " + (levels.length-1))
                                                            levels.push(lastMap) // push a random map
                                                            setMapData(levels[levels.indexOf(l)+1]) // safely access the correct map
                                                            levels.pop() // remove previosly added map
                                                            levels = getFirebaseMap()
                                                        }
                                                        else {
                                                            console.log("ENTERING LEVEL " + (levels.indexOf(l)+1))
                                                            levels = getFirebaseMap()
                                                            setMapData(levels[levels.indexOf(l) + 1]) // works fine for all but last index
                                                            levels = getFirebaseMap()
                                                        }
                                                    }}>Level {levels.indexOf(l)+1}</Button> // Retrieve each level, and display the level
                                                )))}
                                            </TableRow>
                                        </TableHead>
                                    </Table>
                                </Box>
                            </Collapse>
                        </TableCell>
                    </TableRow>
                </React.Fragment>
                
                <div id="topButton" style={{ position: "absolute", left: "900px", top: 10 }}>
                    FOG ON/OFF
                    <Button>Toggle Fog</Button>
                    <Button>add fog</Button>
                </div>
                <div id='route' style={{ backgroundColor: hexToRgb("#AAAABB"), position: "absolute", top: 100, alignSelf: "center", right: "35%" }}>
                    <Map mapData={mapData} />
                </div>
            </div>
        </div>
    )
}

export default DmView
