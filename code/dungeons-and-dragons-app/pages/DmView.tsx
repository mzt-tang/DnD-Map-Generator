import { Text } from 'react-native';
import {styled, Table, TableCell, Typography} from "@material-ui/core";
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
        const newMap = await MapGen({theme})
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

    if (!overlay) {
        return (
            <div id='dmView' className="backgroundImage">
                <div id="topBar">
                <Button id="topButton" style={{ backgroundColor: 'white', width: '40px', top: 10, borderRadius: 10 }} onClick={() => {
                        history.push('/home')
                    }}>X</Button>

                    <div style={{ flexDirection: "column", backgroundColor: 'white', borderRadius: 10, position: 'relative', left: '-1%', top: '25%' }}>
                        <Text style={{ width: '200px', top: 10, fontSize: 16, textAlign: "center", textAlignVertical: "center", padding: '5px' }}>{'Current Floor: ' + level}</Text>
                        <Text style={{ width: '200px', top: 10, fontSize: 16, textAlign: "center", textAlignVertical: "center", padding: '5px' }}>{'Total Floors: ' + totalLevels}</Text>
                    </div>
                    <Button id="topButton" style={{ backgroundColor: 'white', width: '200px', top: 10, borderRadius: 10 }} onClick={generateMap}>New Floor</Button>

                    <Button id="topButton" style={{ backgroundColor: 'white', width: '100px', top: '10px', borderRadius: 10 }} onClick={previousMap}>Previous Floor</Button>
                    <Button id="topButton" style={{ backgroundColor: 'white', width: '100px', top: '10px', borderRadius: 10 }} onClick={nextMap}>Next Floor</Button>

                    <Button id="topButton" style={{ backgroundColor: 'white', width: '200px', top: '10px', borderRadius: 10 }} onClick={showRoomNums}>Show Room Numbers</Button>

                    <div id="topButton" style={{ backgroundColor: 'white', position: "absolute", left: "1100px", top: 10, borderRadius: 10, width: '30%', height: '10%' }}>
                        <p style={{ position: 'relative', backgroundColor: 'white', fontFamily: 'Arial', left: '2%', width: '20%' }}>FOG Controls</p>
                        <FormControlLabel
                            style={{ position: 'relative', backgroundColor: 'white', left: '2%' }}
                            control={<Switch checked={showFog} onChange={handleShowingFogChange} name={'showFog'} />}
                            label={'Show Fog'} />
                        <FormControlLabel style={{ backgroundColor: 'white' }} control={<Switch checked={adjustingFog} onChange={handleAdjustingFogChange}
                            name={'adjustFog'} />} label={'Add/Remove Fog'} />
                    </div>
                </div>
                <div id="topButton" style={{ position: "absolute", backgroundColor: 'white', left: "1220px", top: 10 }}>
                    <RadioGroup row={true} aria-label="fog" name="fog controls" value={addingFog} style={{ backgroundColor: 'white' }}
                        onChange={handleAddingFogChange}>
                        <FormControlLabel value={true} control={<Radio />} label="add" />
                        <FormControlLabel value={false} control={<Radio />} label="remove" />
                    </RadioGroup>
                </div>
                <div id="topButton" style={{ backgroundColor: 'white', position: "absolute", left: "1450px", top: '20px' }}>
                    <Typography id="discrete-slider" gutterBottom>
                        Adjustment Size
                    </Typography>
                    <Slider
                        style={{ backgroundColor: 'white' }}
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
                <div id="topButton" style={{ backgroundColor: 'white', position: "absolute", left: "1700px", top: '15px', borderRadius: 10, height:'90px' }}>
                    <FormControlLabel
                        style={{ position: 'relative', left: '2%',height:'90px' }}
                        control={<Switch checked={mapIsHidden} onChange={handleHideOrShowMap} name={'hideMap'} />}
                        label={'Hide Player\'s Map'} />
                </div>

                <div style={{
                    backgroundColor:'black',
                    position: "absolute",
                    left: "10%",
                    top: '70px',
                    width: '470px',
                    height: '36px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 4
                }}>
                    <div style={{
                        position: "relative",
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: "center",
                        flex: 1,
                        border: '3px solid #808080',
                    }}>
                        <Text style={{fontSize: 20}}>Gamecode: {gamecode}, Theme: {history.location.state.theme}</Text>
                    </div>
                </div>

                <div id='route' style={{
                    backgroundColor: hexToRgb("#AAAABB"),
                    position: "absolute",
                    top: 110,
                    alignSelf: "center",
                    left: "8%",
                }}>
                    <Map mapTheme='Cave' mapData={mapData} imagePressFunction={clickMapTileHandler} showFog={showFog} maxWidth={window.innerWidth / 2 + window.innerWidth / 16} maxHeight={window.innerHeight / 2 + window.innerHeight / 16} />
                </div>
            </div>
        )
    }
    else {
        return (
            <div id='dmView' className="backgroundImage">
                <div id="topBar">
                    <Button id="topButton" style={{ backgroundColor: 'white', width: '40px', top: 10, borderRadius: 10 }} onClick={() => {
                        history.push('/home')
                    }}>X</Button>

                    <div style={{ flexDirection: "column", backgroundColor: 'white', borderRadius: 10, position: 'relative', left: '-1%', top: '25%' }}>
                        <Text style={{ width: '200px', top: 10, fontSize: 16, textAlign: "center", textAlignVertical: "center", padding: '5px' }}>{'Current Floor: ' + level}</Text>
                        <Text style={{ width: '200px', top: 10, fontSize: 16, textAlign: "center", textAlignVertical: "center", padding: '5px' }}>{'Total Floors: ' + totalLevels}</Text>
                    </div>
                    <Button id="topButton" style={{ backgroundColor: 'white', width: '200px', top: 10, borderRadius: 10 }} onClick={generateMap}>New Floor</Button>

                    <Button id="topButton" style={{ backgroundColor: 'white', width: '100px', top: '10px', borderRadius: 10 }} onClick={previousMap}>Previous Floor</Button>
                    <Button id="topButton" style={{ backgroundColor: 'white', width: '100px', top: '10px', borderRadius: 10 }} onClick={nextMap}>Next Floor</Button>

                    <Button id="topButton" style={{ backgroundColor: 'white', width: '200px', top: '10px', borderRadius: 10 }} onClick={showRoomNums}>Show Room Numbers</Button>

                    <div id="topButton" style={{ backgroundColor: 'white', position: "absolute", left: "1100px", top: 10, borderRadius: 10, width: '30%', height: '10%' }}>
                        <p style={{ position: 'relative', backgroundColor: 'white', fontFamily: 'Arial', left: '2%', width: '20%' }}>FOG Controls</p>
                        <FormControlLabel
                            style={{ position: 'relative', backgroundColor: 'white', left: '2%' }}
                            control={<Switch checked={showFog} onChange={handleShowingFogChange} name={'showFog'} />}
                            label={'Show Fog'} />
                        <FormControlLabel style={{ backgroundColor: 'white' }} control={<Switch checked={adjustingFog} onChange={handleAdjustingFogChange}
                            name={'adjustFog'} />} label={'Add/Remove Fog'} />
                    </div>
                </div>
                <div id="topButton" style={{ position: "absolute", backgroundColor: 'white', left: "1220px", top: 10 }}>
                    <RadioGroup row={true} aria-label="fog" name="fog controls" value={addingFog} style={{ backgroundColor: 'white' }}
                        onChange={handleAddingFogChange}>
                        <FormControlLabel value={true} control={<Radio />} label="add" />
                        <FormControlLabel value={false} control={<Radio />} label="remove" />
                    </RadioGroup>
                </div>
                <div id="topButton" style={{ backgroundColor: 'white', position: "absolute", left: "1450px", top: '20px' }}>
                    <Typography id="discrete-slider" gutterBottom>
                        Adjustment Size
                    </Typography>
                    <Slider
                        style={{ backgroundColor: 'white' }}
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
                <div id="topButton" style={{ backgroundColor: 'white', position: "absolute", left: "1700px", top: '15px', borderRadius: 10, height:'90px' }}>
                    <FormControlLabel
                        style={{ position: 'relative', left: '2%',height:'90px' }}
                        control={<Switch checked={mapIsHidden} onChange={handleHideOrShowMap} name={'hideMap'} />}
                        label={'Hide Player\'s Map'} />
                </div>

                <div style={{
                    backgroundColor:'black',
                    position: "absolute",
                    left: "10%",
                    top: '70px',
                    width: '470px',
                    height: '36px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 4
                }}>
                    <div style={{
                        position: "relative",
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: "center",
                        flex: 1,
                        border: '3px solid #808080',
                    }}>
                        <Text style={{fontSize: 20}}>Gamecode: {gamecode}, Theme: {history.location.state.theme}</Text>
                    </div>
                </div>

                <div id='route' style={{
                    backgroundColor: hexToRgb("#AAAABB"),
                    position: "absolute",
                    top: 110,
                    alignSelf: "center",
                    left: "8%",
                    width: window.innerWidth / 2 + window.innerWidth / 16,
                    height: '100%'
                }}>
                    <Table style={{ backgroundColor: 'white' }}>
                        <tr style={{ backgroundColor: 'white', borderColor: 'black' }} />
                        <TableCell style={{ width: '25%', height: '242px', textAlign: 'center', backgroundColor: '#d6004b', borderColor: 'black', fontSize: 150, color: 'white' }}>1</TableCell>
                        <TableCell style={{ width: '25%', height: '242px', textAlign: 'center', backgroundColor: '#7f94fa', borderColor: 'black', fontSize: 150, color: 'white' }}>2</TableCell>
                        <TableCell style={{ width: '25%', height: '242px', textAlign: 'center', backgroundColor: '#d6004b', borderColor: 'black', fontSize: 150, color: 'white' }}>3</TableCell>
                        <TableCell style={{ width: '25%', height: '242px', textAlign: 'center', backgroundColor: '#7f94fa', borderColor: 'black', fontSize: 150, color: 'white' }}>4</TableCell>
                        <tr style={{ backgroundColor: 'white', borderColor: 'black' }} />
                        <TableCell style={{ width: '25%', height: '242px', textAlign: 'center', backgroundColor: '#7f94fa', borderColor: 'black', fontSize: 150, color: 'white' }}>5</TableCell>
                        <TableCell style={{ width: '25%', height: '242px', textAlign: 'center', backgroundColor: '#d6004b', borderColor: 'black', fontSize: 150, color: 'white' }}>6</TableCell>
                        <TableCell style={{ width: '25%', height: '242px', textAlign: 'center', backgroundColor: '#7f94fa', borderColor: 'black', fontSize: 150, color: 'white' }}>7</TableCell>
                        <TableCell style={{ width: '25%', height: '242px', textAlign: 'center', backgroundColor: '#d6004b', borderColor: 'black', fontSize: 150, color: 'white' }}>8</TableCell>
                        <tr style={{ backgroundColor: 'white', borderColor: 'black' }} />
                        <TableCell style={{ width: '25%', height: '242px', textAlign: 'center', backgroundColor: '#d6004b', borderColor: 'black', fontSize: 150, color: 'white' }}>9</TableCell>
                        <TableCell style={{ width: '25%', height: '242px', textAlign: 'center', backgroundColor: '#7f94fa', borderColor: 'black', fontSize: 150, color: 'white' }}>10</TableCell>
                        <TableCell style={{ width: '25%', height: '242px', textAlign: 'center', backgroundColor: '#d6004b', borderColor: 'black', fontSize: 150, color: 'white' }}>11</TableCell>
                        <TableCell style={{ width: '25%', height: '242px', textAlign: 'center', backgroundColor: '#7f94fa', borderColor: 'black', fontSize: 150, color: 'white' }}>12</TableCell>
                    </Table>
                </div>
            </div>
        )
    }
}

export default DmView
