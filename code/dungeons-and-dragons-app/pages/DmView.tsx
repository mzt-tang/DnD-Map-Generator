import { Text } from 'react-native';
import { Typography } from "@material-ui/core";

import { readFromFirebase, writeToFirebase } from "../utility/FirebaseRW";
import { useLocation } from "react-router-dom";

import Map, { getFirebaseMap } from '../components/Map';
import '../styles/style.css'
import { useHistory } from "react-router-dom";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import saveImage from '../assets/saveIcon.png'
import {
    Button,
    hexToRgb,
    Slider
} from "@material-ui/core";

import React, { MouseEventHandler, useEffect, useState } from 'react';


import { Grid } from "@material-ui/core";
import MapGen from '../utility/MapGen';
import MapData from "../interfaces/MapData";
import ParseURLData from "../utility/ParseURLData";

let mapDataInitial: MapData = {
    map: [], monsters: [], roomCols: 0, roomRows: 0, roomSize: 0, visibility: [], roomNum: 1, theme: "Caves"
};

let curMap: number;

const DmView = () => {
    const { state: { code,theme } = { code:'code',theme:'theme' } } = useLocation<{ code: string, theme: string }>()
    const history = useHistory();
    let gamecode: string = ParseURLData(history.location.pathname) as string;

    const [open, setOpen] = React.useState(false);

    // Fog Controls
    const [showFog, setShowFog] = React.useState(true);
    const [adjustingFog, setAdjustingFog] = React.useState(true);
    const [addingFog, setAddingFog] = React.useState(true);
    const [fogAdjustSize, setFogAdjustSize] = React.useState(1);

    let levels: MapData[] = getFirebaseMap()

    const [mapData, setMapData] = useState(mapDataInitial);
    const [level, setLevel] = useState(0);
    const [totalLevels, setTotalLevels] = useState(0);

    useEffect(() => {
        const levelData = readFromFirebase('/' + gamecode + '/levels/0');
        if (!isObjectEmpty(levelData)){
            setMapData(levelData as MapData);
            readFromFirebase('/' + gamecode + '/levels').then(value => setTotalLevels(value.val().lenth));
        } else {
            generateMap();
        }
    }, []);

    const isObjectEmpty = (obj : Object) : boolean => {
        return Object.keys(obj).length === 0;
    }

    const generateMap = () => {
        MapGen({theme}).then(
            value => {
                setMapData(value);
                writeToFirebase('/'+ gamecode+'/levels/'+(level+1),value);
                setLevel(value => value+1);
                setTotalLevels(value => value+1);
            }
        ).catch(e => console.log(e))
    };

    const nextMap = async () => {
        if (level === totalLevels){
            alert('final level, generate more levels');
        } else {
            const path = '/' + gamecode + '/levels/' + (level+1);
            readFromFirebase(path).then(value => setMapData(value.val() as MapData));
            setLevel(value => value+1);
        }
    }

    const previousMap = async () => {
        if (level <= 1){
            alert('first level');
        } else {
            const path = '/' + gamecode + '/levels/' + (level-1);
            readFromFirebase(path).then(value => setMapData(value.val() as MapData));
            setLevel(value => value-1);
        }
    }

    if (mapData == null) {
        return (
            <Grid>
                <Button onClick={generateMap}>Update Map</Button>
            </Grid>
        )
    }

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

        writeToFirebase('gamecode/levels/' + level + 'visibility',newVisibility);
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

    return (
        <div id='dmView' style={{ backgroundColor: hexToRgb("#8b5f8c"), height: "100%" }}>
            <div id="topBar">
                <Button id="topButton" style={{ width: '40px', top: 10 }} onClick={() => {
                    history.push('/home')
                }}>X</Button>
                <Button id="topButton" style={{ width: '200px', top: 10 }}><img src={saveImage} style={{
                    width: '17px',
                    marginRight: '10px'
                }} />Save</Button>

                <Button id="topButton" style={{ width: '200px', top: 10 }} onClick={generateMap}>New Level</Button>

                <Button id="topButton" style={{ width: '100px', top: '10px' }} onClick={previousMap}>Previous Map</Button>
                <Button id="topButton" style={{ width: '100px', top: '10px' }} onClick={nextMap}>Next Map</Button>

                <div id="topButton" style={{ position: "absolute", left: "900px", top: 10 }}>
                    <p>FOG Controls</p>
                    <FormControlLabel
                        control={<Switch checked={showFog} onChange={handleShowingFogChange} name={'showFog'} />}
                        label={'Show Fog'} />
                    <FormControlLabel control={<Switch checked={adjustingFog} onChange={handleAdjustingFogChange}
                        name={'adjustFog'} />} label={'Add/Remove Fog'} />
                </div>
                <div id='route' style={{ backgroundColor: hexToRgb("#AAAABB"), position: "absolute", top: 100, alignSelf: "center", right: "35%" }}>
                    <Map mapData={mapData} imagePressFunction={clickVisibilityHandler} showFog={showFog}/>
                </div>
                <div id="topButton" style={{ position: "absolute", left: "1000px", top: 10 }}>
                    <RadioGroup row={true} aria-label="fog" name="fog controls" value={addingFog}
                        onChange={handleAddingFogChange}>
                        <FormControlLabel value={true} control={<Radio />} label="add" />
                        <FormControlLabel value={false} control={<Radio />} label="remove" />
                    </RadioGroup>
                </div>
                <div id="topButton" style={{ position: "absolute", left: "1200px", top: 10 }}>
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
                <Text>{ }</Text>
            </div>
        </div>
    )
}

export default DmView
