import {
    Box,
    Button,
    Collapse,
    hexToRgb,
    makeStyles, Slider,
    Table,
    TableCell,
    TableHead,
    TableRow
} from "@material-ui/core";
import {IconButton} from "@material-ui/core";
import Map, {getFirebaseMap} from '../components/Map';
import '../styles/style.css'
import {useHistory} from "react-router-dom";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {db} from '.././firebaseConfig';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { useLocation } from "react-router-dom";

import saveImage from '../assets/saveIcon.png'

import React, {DragEventHandler, MouseEventHandler, useEffect, useState} from 'react';


import {Grid} from "@material-ui/core";
import MapGen from '../utility/MapGen';
import MapData from "../interfaces/MapData";
import {View} from "react-native";
import ParseURLData from "../utility/ParseURLData";
import Typography from "@material-ui/core/Typography";
import PlayerView from "./PlayerView";
import {InsertInvitation} from "@material-ui/icons";

let mapDataInitial: MapData = {
    map: [], monsters: [], roomCols: 0, roomRows: 0, roomSize: 0, visibility: [], roomNum: 1
};

let lastMap: MapData
let curMap: number;

function DmView() {

    const location = useLocation();
    const history = useHistory();

    console.log(ParseURLData(history.location.pathname));
    let gamecode: string = ParseURLData(history.location.pathname);
    console.log(gamecode);


    const dbRefObject = db.database().ref().child(gamecode); //Reference to map from Firebase Realtime Database
    const [open, setOpen] = React.useState(false);


    // Fog Controls
    const [showFog, setShowFog] = React.useState(true);
    const [adjustingFog, setAdjustingFog] = React.useState(true);
    const [addingFog, setAddingFog] = React.useState(true);
    const [fogAdjustSize, setFogAdjustSize] = React.useState(1);

    let levels: MapData[] = getFirebaseMap()


    // Map Data
    const [mapData, setMapData] = useState(mapDataInitial);
    const [level, setLevel] = useState(1);


    /*useEffect(() => {
        dbRefObject.child("/map/levels/" + (levels.length - 1)).get().then(value => setMapData(value.val()))
    }, [])*/

    const generateMap = () => {
        MapGen(location.state.theme).then(
            value => {
                console.log(value);
                setMapData(value);
                //PlayerView.update(mapData) // Update the player view
                db.database().ref().child('/map/levels/' + (levels.length - 1)).set(value).catch(e => console.log(e))
            }
        ).catch(e => console.log(e))
    };

    console.log(dbRefObject);
    console.log("map data: " + mapData)

    const clickVisibilityHandler: MouseEventHandler<HTMLImageElement> = (event: React.MouseEvent<HTMLImageElement>) => {
        console.log(event.currentTarget.id);
    }

    const clickMapTileHandler: MouseEventHandler<HTMLImageElement> = (event: React.MouseEvent<HTMLImageElement>) => {
        if (!adjustingFog) return;
        const arr = event.currentTarget.id.split(",");
        const row = Number.parseInt(arr[0]);
        const col = Number.parseInt(arr[1]);

        //todo this is horribly inefficient and could probably be improved.

        const newVisibility = mapData.visibility.slice();

        if (fogAdjustSize == 1) {
            newVisibility[row][col] = addingFog ? 1 : 0;
        } else {
            const half = Math.round(fogAdjustSize / 2);

            for (let i = Math.max(0, row - half); i < Math.min(row + half, newVisibility.length); i++) {
                for (let j = Math.max(0, col - half); j < Math.min(col + half, newVisibility[i].length); j++) {
                    newVisibility[i][j] = addingFog ? 1 : 0;
                }
            }
        }

        const newMapData = {
            ...mapData,
            visibility: newVisibility
        };

        const visRef = db.database().ref().child(gamecode).child('visibility');
        visRef.set(newVisibility)
        setMapData(newMapData);
    }

    const handleAddingFogChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddingFog(event.currentTarget.value === 'true');
    };

    const handleAdjustingFogChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAdjustingFog(event.target.checked);
    };

    const handleShowingFogChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setShowFog(event.target.checked);
    };

    const fogAdjustmentValue = () => {
        return `${fogAdjustSize} x ${fogAdjustSize}`
    }

    levels = getFirebaseMap()
    if (mapData == null) {
        return (
            <Grid>
                <Button onClick={generateMap}>Update Map</Button>
            </Grid>
        )
    } else {
        return (
            <div id='dmView' style={{backgroundColor: hexToRgb("#8b5f8c"), height: "100%"}}>
                <div id="topBar">
                    <Button id="topButton" style={{width: '40px', top: 10}} onClick={() => {
                        history.push('/home')
                    }}>X</Button>
                    <Button id="topButton" style={{width: '200px', top: 10}}><img src={saveImage} style={{
                        width: '17px',
                        marginRight: '10px'
                    }}/>Save</Button>

                    <Button id="topButton" style={{width: '200px', top: 10}} onClick={() => {

                        // Generate new map
                        let newLevels = levels
                        if (levels.length > 0) {
                            setMapData(levels[levels.length - 1])
                        }
                        generateMap()
                        newLevels.push(mapData)
                        levels = getFirebaseMap()
                        lastMap = mapData
                        curMap = levels.length - 1
                        setMapData(levels[levels.length - 1])
                    }}>New Level</Button>

                    <Button id="topButton" style={{width: '100px', top: '10px'}} onClick={() => {
                        curMap = curMap - 1
                        if (levels.indexOf(mapData) == 0) {
                            setMapData(levels[curMap])
                        }
                        if (levels.length > 1 && curMap > 0) {
                            setMapData(levels[curMap])
                        } else {
                            alert("This is the first level")
                        }
                    }}>Previous Map</Button>
                    <Button id="topButton" style={{width: '100px', top: '10px'}} onClick={() => {
                        curMap = curMap + 1
                        if (curMap == levels.length || levels.length == 0) {
                            alert("This is the last level, click \"NEW LEVEL\"")
                            curMap = curMap - 1
                        } else {
                            setMapData(levels[curMap])
                        }
                    }}>Next Map</Button>

                    <div id="topButton" style={{position: "absolute", left: "900px", top: 10}}>
                        <p>FOG Controls</p>
                        <FormControlLabel
                            control={<Switch checked={showFog} onChange={handleShowingFogChange} name={'showFog'}/>}
                            label={'Show Fog'}/>
                        <FormControlLabel control={<Switch checked={adjustingFog} onChange={handleAdjustingFogChange}
                                                           name={'adjustFog'}/>} label={'Add/Remove Fog'}/>
                    </div>
                    <div id="topButton" style={{position: "absolute", left: "1000px", top: 10}}>
                        <RadioGroup row={true} aria-label="fog" name="fog controls" value={addingFog}
                                    onChange={handleAddingFogChange}>
                            <FormControlLabel value={true} control={<Radio/>} label="add"/>
                            <FormControlLabel value={false} control={<Radio/>} label="remove"/>
                        </RadioGroup>
                        <div id='route' style={{
                            backgroundColor: hexToRgb("#AAAABB"),
                            position: "absolute",
                            top: 100,
                            alignSelf: "center",
                            right: "35%"
                        }}>
                        </div>
                        <div id="topButton" style={{position: "absolute", left: "1200px", top: 10}}>
                            <Typography id="discrete-slider" gutterBottom>
                                Adjustment Size
                            </Typography>
                            <Slider
                                defaultValue={1}
                                getAriaValueText={fogAdjustmentValue}
                                aria-labelledby="discrete-slider"
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={1}
                                max={10}
                                onChange={(event: any, newValue: number | number[]) => setFogAdjustSize(newValue as number)}
                            />
                        </div>
                        <div>

                        </div>
                        <div id='route' style={{
                            backgroundColor: hexToRgb("#AAAABB"),
                            position: "absolute",
                            top: 100,
                            alignSelf: "center",
                            right: "35%",
                        }}>
                            <Map mapData={mapData} imagePressFunction={clickMapTileHandler} showFog={showFog}
                                 mapTheme={location.state.theme}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DmView;
