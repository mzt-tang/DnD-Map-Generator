import { ScrollView, Text } from 'react-native';
import { styled, Table, TableCell, Typography } from "@material-ui/core";
import { readFromFirebase, writeToFirebase } from "../utility/FirebaseRW";
import '../styles/style.css'
import Map from '../components/Map';
import '../styles/style.css'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import backgroundIm from "../assets/Menu Images/Underdark.jpg";

// will this change

import {
    Button,
    hexToRgb,
    Slider
} from "@material-ui/core";

import React, { MouseEventHandler, useEffect, useState } from 'react';

import { Grid } from "@material-ui/core";
import MapGen from '../utility/MapGen';
import MapData from "../interfaces/MapData";
import { useHistory, useLocation } from "react-router-dom";
import ParseURLData from "../utility/ParseURLData";


let mapDataInitial: MapData = {
    map: [], monsters: [], roomCols: 0, roomRows: 0, roomSize: 0, visibility: [], roomNum: 1, theme: "Caves"
};

let curMap: number;

const DmView = () => {

    const { state: { code, theme } = { code: 'code', theme: 'theme' } } = useLocation<{ code: string, theme: string }>()
    const history = useHistory();
    let gamecode: string = ParseURLData(history.location.pathname) as string;

    const [open, setOpen] = React.useState(false);

    // Fog Controls
    const [showFog, setShowFog] = React.useState(true);
    const [adjustingFog, setAdjustingFog] = React.useState(true);
    const [addingFog, setAddingFog] = React.useState(true);
    const [fogAdjustSize, setFogAdjustSize] = React.useState(1);
    const [mapIsHidden, setMapIsHidden] = React.useState(true);

    const [mapData, setMapData] = useState(mapDataInitial);
    const [level, setLevel] = useState(0);
    const [totalLevels, setTotalLevels] = useState(0);
    const [overlay, setOverlay] = useState(false);

    useEffect(() => {
        readFromFirebase(gamecode + '/levels').then(value => {
            if (value.exists() && !isObjectEmpty(value.val())) {
                setTotalLevels(value.val().length - 1);
            }
        });

        readFromFirebase(gamecode + '/levels/1').then(value => {
            if (value.exists() && !isObjectEmpty(value.val())) {
                setMapData(value.val() as MapData);
                setLevel(1);
                setPlayerLevel(1);
            } else {
                generateMap();
            }
        });

        readFromFirebase(gamecode + '/isHidden').then(value => {
            if (value.exists()) {
                setMapIsHidden(value.val());
            } else {
                writeToFirebase('/' + gamecode + '/isHidden', true);
            }
        });


    }, []);

    const isObjectEmpty = (obj: Object): boolean => {
        return Object.keys(obj).length === 0;
    }

    const setPlayerLevel = (level: number) => {
        writeToFirebase('/' + gamecode + '/currentMap', level);
    }

    const generateMap = async () => {
        const newMap = await MapGen({theme, level})
        writeToFirebase('/' + gamecode + '/levels/' + (totalLevels + 1), newMap);
        setTotalLevels(value => {
            setLevel(value + 1);
            setPlayerLevel(value + 1);
            return value + 1;
        }
        );
        setMapData(newMap);
    };

    const showRoomNums = () => {
        setOverlay(!overlay);
    }

    const nextMap = () => {
        if (level === totalLevels) {
            alert('Final floor, generate more floors');
        } else {
            const path = '/' + gamecode + '/levels/' + (level + 1);
            readFromFirebase(path).then(value => setMapData(value.val() as MapData));
            setLevel(value => {
                setPlayerLevel(value + 1);
                return value + 1
            });

        }
    }

    const previousMap = () => {
        if (level <= 1) {
            alert('First floor');
        } else {
            const path = '/' + gamecode + '/levels/' + (level - 1);
            readFromFirebase(path).then(value => setMapData(value.val() as MapData));
            setLevel(value => {
                setPlayerLevel(value - 1);
                return value - 1
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

        writeToFirebase('/' + gamecode + '/levels/' + level + '/visibility', newVisibility);
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

    const handleHideOrShowMap = (event: React.ChangeEvent<HTMLInputElement>) => {
        writeToFirebase('/' + gamecode + '/isHidden', event.target.checked);
        setMapIsHidden(event.target.checked);
    }
    return (
        <ScrollView>
            <div id='dmView' className="backgroundImage">
                <div id="topBar" style={{ width: window.innerWidth }}>
                    <Button id="topButton" style={{ backgroundColor: 'white', width: '40px', height: '40px', top: '15%', borderRadius: 10 }} onClick={() => {
                        history.push('/home')
                    }}>X</Button>

                    <div style={{ display: 'flex', flexDirection: "column", backgroundColor: 'white', borderRadius: 10, position: 'relative', left: '-1%', top: '10%', height: '50%', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ width: '200px', fontSize: 16, textAlign: "center", textAlignVertical: "center" }}>{'Current Floor: ' + level}</Text>
                        <Text style={{ width: '200px', fontSize: 16, textAlign: "center", textAlignVertical: "center" }}>{'Total Floors: ' + totalLevels}</Text>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Button id="topButton" style={{ backgroundColor: 'white', width: '10%', top: '15%', borderRadius: 10 }} onClick={generateMap}>New Floor</Button>
                            <Button id="topButton" style={{ backgroundColor: 'white', width: '100px', top: '15%', borderRadius: 10 }} onClick={previousMap}>Previous Floor</Button>
                            <Button id="topButton" style={{ backgroundColor: 'white', width: '100px', top: '15%', borderRadius: 10 }} onClick={nextMap}>Next Floor</Button>
                            <Button id="topButton" style={{ backgroundColor: 'white', width: '200px', top: '10px', borderRadius: 10 }} onClick={showRoomNums}>Show Room Numbers</Button>
                        </div>
                        <div style={{ display: 'flex', flexDirection: "column", backgroundColor: 'white', borderRadius: 10, position: 'relative', left: '-1%', top: '10%', height: '50%', alignItems: 'center', justifyContent: 'center', width:'70%'}}>
                            <Text> Gamecode: {gamecode}</Text>
                            <Text>  Theme: {theme}</Text>

                        </div>

                    </div>
                    <div id="fogBar" style={{ backgroundColor: 'white', position: "relative", top: '10%', borderRadius: 10, width: '60%', height: '100%' }}>
                        <div style={{ display: 'flex', flex: 0, flexDirection: 'row' }}>
                            <p style={{ position: 'relative', backgroundColor: 'white', fontFamily: 'Arial', left: '2%', width: '20%' }}>{"FOG Controls:  "}</p>
                            <RadioGroup row={true} aria-label="fog" name="fog controls" value={addingFog} style={{ backgroundColor: 'white' }}
                                onChange={handleAddingFogChange}>
                                <FormControlLabel value={true} control={<Radio />} label="add" />
                                <FormControlLabel value={false} control={<Radio />} label="remove" />

                            </RadioGroup>
                            <FormControlLabel
                                style={{ position: 'relative', left: '2%' }}
                                control={<Switch checked={mapIsHidden} onChange={handleHideOrShowMap} name={'hideMap'} />}
                                label={'Hide Player\'s Map'} />
                        </div>

                        <div id="controls" style={{ display: 'flex', flexDirection: 'row' }}>
                            <FormControlLabel
                                style={{ position: 'relative', left: '2%' }}
                                control={<Switch checked={showFog} onChange={handleShowingFogChange} name={'showFog'} />}
                                label={'Show Fog'} />
                            <FormControlLabel control={<Switch checked={adjustingFog} onChange={handleAdjustingFogChange}
                                name={'adjustFog'} />} label={'Add/Remove Fog'} />

                            <Typography id="discrete-slider" gutterBottom style={{ marginRight: '2%' }}>
                                Adjustment Size
                            </Typography>
                            <Slider
                                style={{ width: '20%' }}
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
                    </div>
                </div>
                <div id='route' style={{
                    top:"2%",
                    backgroundColor: hexToRgb("#AAAABB"),
                    position: "relative",
                    alignSelf: "center",
                }}>
                    <Map mapTheme='Cave' mapData={mapData} imagePressFunction={clickMapTileHandler} showFog={showFog} maxWidth={window.innerWidth / 70} maxHeight={window.innerHeight / 40} overlay={overlay} />
                </div>
            </div>
        </ScrollView>
    )
}

export default DmView
