import React, {useEffect, useState} from 'react';

import {Button, makeStyles} from "@material-ui/core";
import {Grid} from "@material-ui/core";
import Map from '../components/Map';
import MapGen from '../utility/MapGen';
import MapData from "../interfaces/MapData";
import {db} from '.././firebaseConfig';
import firebase from 'firebase';
import {View} from "react-native";

//Firebase
//todo this is needed to init the firebase database connection. We need to change this in future.
const reference = db;
const dbRefObject = firebase.database().ref().child('adamtest');

let mapDataInitial: MapData = {
    map: [], monsters: [], roomCols: 0, roomRows: 0, roomSize: 0, visibility: []
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

const DmView = () => {
    const classes = useStyles();
    const [mapData, setMapData] = useState(mapDataInitial);

    useEffect(() => {
        dbRefObject.get().then(value => setMapData(value.val()))
    },[])

    const generateMap = () => {
        MapGen().then(
            value => {
                setMapData(value);
                dbRefObject.set(value)
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

    return (
        <Grid container spacing={2} className={classes.grid}>
            <View>
                <Button onClick={generateMap}>Update Map</Button>
            </View>
            <div id='route'>
                <Map mapData={mapData}/>
            </div>
        </Grid>
    )
}

export default DmView
