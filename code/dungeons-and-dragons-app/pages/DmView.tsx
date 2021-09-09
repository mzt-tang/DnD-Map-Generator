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

import saveImage from '../assets/saveIcon.png'

import React, {DragEventHandler, MouseEventHandler, useEffect, useState} from 'react';

import {Grid} from "@material-ui/core";
import MapGen from '../utility/MapGen';
import MapData from "../interfaces/MapData";
import Typography from "@material-ui/core/Typography";


// Firebase
const dbRefObject = db.database().ref().child('adamtest');

const mapDataInitial: MapData = {
    map: [], monsters: [], roomCols: 0, roomRows: 0, roomSize: 0, visibility: []
};


const DmView = () => {
    const history = useHistory();
    const [open, setOpen] = React.useState(false);

    // Fog Controls
    const [showFog, setShowFog] = React.useState(true);
    const [adjustingFog, setAdjustingFog] = React.useState(true);
    const [addingFog, setAddingFog] = React.useState(true);
    const [fogAdjustSize, setFogAdjustSize] = React.useState(1);

    // Map Data
    const [mapData, setMapData] = useState(mapDataInitial);
    const [level, setLevel] = useState(1);

    let levels: Number[][][] = [getFirebaseMap()]

    useEffect(() => {
        dbRefObject.get().then(value => setMapData(value.val()))
    }, [])

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
        const visRef = db.database().ref().child('adamtest').child('visibility');
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
                <React.Fragment>
                    <TableRow>
                        <TableCell>
                            <IconButton aria-label="expand row" size="small" onClick={() => {
                                setOpen(!open)
                            }}>
                                {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                            </IconButton>
                            Level
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <Box margin={1}>
                                    <Table size="small" aria-label="purchases">
                                        <TableHead>
                                            <TableRow style={{
                                                position: "relative",
                                                top: 0,
                                                width: '100%',
                                                display: "flex",
                                                flexDirection: "column"
                                            }}>
                                                {levels.map((l => (
                                                    // Get the levels from the firebase, loop through all of them, adding a button per level and attaching a link to load that level to the button
                                                    <Button id="topButton" style={{width: '100px'}} onClick={() => {
                                                        //load the levels
                                                    }}>Level {levels.indexOf(l) + 1}</Button> // Retrieve each level, and display the level
                                                )))}
                                            </TableRow>
                                        </TableHead>
                                    </Table>
                                </Box>
                            </Collapse>
                        </TableCell>
                    </TableRow>
                </React.Fragment>
                <Button id="topButton" style={{width: '200px', top: 10}} onClick={() => {
                    // Generate new map
                    //window.location.reload() reloads a page, generating a new map
                    generateMap()
                    levels[levels.length] = getFirebaseMap()
                }}>New Level</Button>
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
                    <Map mapData={mapData} imagePressFunction={clickMapTileHandler} showFog={showFog}/>
                </div>

            </div>
        </div>
    )
}

export default DmView
