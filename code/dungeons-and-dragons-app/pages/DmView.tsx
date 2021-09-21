import { Text } from 'react-native';
import { styled, Typography } from "@material-ui/core";
import { readFromFirebase, writeToFirebase } from "../utility/FirebaseRW";
import '../styles/style.css'
import Map from '../components/Map';
import '../styles/style.css'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import backgroundIm from "../assets/Menu Images/Underdark.jpg";

import {
    Button,
    hexToRgb,
    Slider
} from "@material-ui/core";

import React, {MouseEventHandler, useEffect, useState} from 'react';

import { Grid } from "@material-ui/core";
import MapGen from '../utility/MapGen';
import MapData from "../interfaces/MapData";
import {useHistory, useLocation} from "react-router-dom";
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

    const [mapData, setMapData] = useState(mapDataInitial);
    const [level, setLevel] = useState(0);
    const [totalLevels, setTotalLevels] = useState(0);

    useEffect(() => {
        readFromFirebase('/' + gamecode + '/levels').then(value => {
            if (value.exists() && !isObjectEmpty(value.val())){
                setTotalLevels(value.val().length-1);
            }
        });

        readFromFirebase('/' + gamecode + '/levels/1').then(value => {
            if (value.exists() && !isObjectEmpty(value.val())){
                setMapData(value.val() as MapData);
                setLevel(1);
                setPlayerLevel(1);
            } else {
                generateMap();
            }
        });
    }, []);

    const isObjectEmpty = (obj : Object) : boolean => {
        return Object.keys(obj).length === 0;
    }

    const setPlayerLevel = (level : number) => {
        writeToFirebase('/' + gamecode + '/currentMap',level);
    }

    const generateMap = () => {
        const newMap = MapGen({theme})
        writeToFirebase('/'+ gamecode+'/levels/'+(totalLevels+1),newMap);
        setTotalLevels(value => {
            setLevel(value+1);
            setPlayerLevel(value+1);
           return value+1;
        }
        );
        setMapData(newMap);
    };

    const nextMap = () => {
        if (level === totalLevels){
            alert('final level, generate more levels');
        } else {
            const path = '/' + gamecode + '/levels/' + (level+1);
            readFromFirebase(path).then(value => setMapData(value.val() as MapData));
            setLevel(value => {
                setPlayerLevel(value+1);
                return value+1
            });

        }
    }

    const previousMap = () => {
        if (level <= 1){
            alert('first level');
        } else {
            const path = '/' + gamecode + '/levels/' + (level-1);
            readFromFirebase(path).then(value => setMapData(value.val() as MapData));
            setLevel(value => {
                setPlayerLevel(value-1);
                return value-1
            });
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

        writeToFirebase('/'+ gamecode+ '/levels/' + level + '/visibility',newVisibility);
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
        <div id='dmView' className="backgroundImage">
            <div id="topBar">
                <Button id="topButton" style={{backgroundColor:'white', width: '40px', top: 10 }} onClick={() => {
                    history.push('/home')
                }}>X</Button>

                <div style={{flexDirection:"column", backgroundColor: 'white', borderRadius: 10, position:'relative', left:'-1%', top:'25%'}}>
                    <Text style={{ width: '200px', top: 10, fontSize:16,textAlign:"center",textAlignVertical:"center", padding:'5px'}}>{'Current Level: '  + level}</Text>
                    <Text style={{ width: '200px', top: 10, fontSize:16,textAlign:"center",textAlignVertical:"center", padding:'5px'}}>{'Total Levels: '  + totalLevels}</Text>
                </div>
                <Button id="topButton" style={{backgroundColor:'white', width: '200px', top: 10 , borderRadius:10}} onClick={generateMap}>New Level</Button>

                <Button id="topButton" style={{backgroundColor:'white', width: '100px', top: '10px', borderRadius:10 }} onClick={previousMap}>Previous Level</Button>
                <Button id="topButton" style={{backgroundColor:'white', width: '100px', top: '10px', borderRadius:10 }} onClick={nextMap}>Next Level</Button>


                <div id="topButton" style={{backgroundColor:'white', position: "absolute", left: "900px", top: 10, borderRadius:10, width:'30%', height:'10%' }}>
                    <p style={{position:'relative', backgroundColor:'white', fontFamily: 'Arial', left:'2%', width:'20%'}}>FOG Controls</p>
                    <FormControlLabel
                        style={{position:'relative',backgroundColor:'white', left:'2%'}}
                        control={<Switch checked={showFog} onChange={handleShowingFogChange} name={'showFog'} />}
                        label={'Show Fog'} />
                    <FormControlLabel style={{backgroundColor:'white'}} control={<Switch checked={adjustingFog} onChange={handleAdjustingFogChange}
                        name={'adjustFog'} />} label={'Add/Remove Fog'} />
                </div>
            </div>
                <div id="topButton" style={{ position: "absolute", backgroundColor:'white', left: "1020px", top: 10 }}>
                    <RadioGroup row={true} aria-label="fog" name="fog controls" value={addingFog} style={{backgroundColor:'white'}}
                        onChange={handleAddingFogChange}>
                        <FormControlLabel value={true} control={<Radio />} label="add" />
                        <FormControlLabel value={false} control={<Radio />} label="remove" />
                    </RadioGroup>
                </div>
                <div id="topButton" style={{ backgroundColor:'white', position: "absolute", left: "1250px", top: '20px' }}>
                    <Typography id="discrete-slider" gutterBottom>
                        Adjustment Size
                    </Typography>
                    <Slider
                        style={{backgroundColor:'white'}}
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
                <div id='route' style={{
                    backgroundColor: hexToRgb("#AAAABB"),
                    position: "absolute",
                    top: 110,
                    alignSelf: "center",
                    right: "35%",
                }}>
                    <Map mapTheme='Cave' mapData={mapData} imagePressFunction={clickMapTileHandler} showFog={showFog} />
                </div>
            </div>
    )
}

export default DmView
