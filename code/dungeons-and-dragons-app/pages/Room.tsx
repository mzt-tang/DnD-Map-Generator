import React, {ChangeEvent, useState} from 'react';
import { View } from 'react-native';
import {Checkbox, Slider, Typography} from '@material-ui/core';
import empty from '../assets/Dark.png';
import floor from '../assets//Light.png';
import entrance from '../assets/Floor.png';


import '../utility/roomGen';

// Import styles
import GridOther from "../components/GridOther";
import '../styles/style.css';
import {roomGen} from "../utility/roomGen";

const Room = () => {
    const[rows, setRows] = useState(20);
    const[cols,setCols] = useState(20);
    const[probability,setProbability] = useState(0.35);
    const[entrances,setEntrances] = useState([[0,9],[19,10],[9,0],[10,19]])
    const[clean, setClean] = useState(true)

    const images : JSX.Element[] = [
        <img className="grid_img" src={empty}/>,    // empty tile
        <img className="grid_img" src={floor}/>,    // floor tile
        <img className="grid_img" src={entrance}/>, // entrance tile
    ]

    // const entrances = [[10, 0], [0, 12], [19, 19]];
    // const rows = 20;
    // const cols = 20;
    // let prob = 0.5

    const tiles = roomGen(rows,cols,entrances,probability,clean);

    const updateProbability = (event: any, newValue: number | number[]) => {
        setProbability(newValue as number);
    };

    const updateClean = (event: any, newValue: boolean) => {
        setClean(newValue as boolean);
    };

    function valuetext(value: number) {
        return `${value}`;
    }

    return (
        <View>
            <GridOther width={cols} height={rows} images={images} tiles={tiles} />
            <div style={{width:300,margin:30}}>
                <Typography id="probability-slider" gutterBottom>
                    Probability
                </Typography>
            <Slider value={probability}
                    onChange={updateProbability}
                    max={1}
                    min={0}
                    step={0.05}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    aria-labelledby="probability-slider"
            />
            </div>
            <div style={{width:300,margin:30}}>
                <Typography id="clean-checkbox" gutterBottom>
                    Post Generation Clean
                </Typography>
                <Checkbox
                    checked={clean}
                    onChange={updateClean}
                    color="primary"
                    inputProps={{ 'aria-label': 'clean-checkbox' }}
                />
            </div>
        </View>
    );
}
export default Room
