import React, {ChangeEvent, useState} from 'react';
import { View } from 'react-native';
import {Checkbox, Slider, Typography} from '@material-ui/core';
import empty from '../assets/Dark.png';
import floor from '../assets//Light.png';
import entrance from '../assets/ImageSet4/Floor.png';
import Image1 from '../assets/TLCorner.png';
import Image2 from '../assets/BLCorner.png';
import Image3 from '../assets/BRCorner.png';
import Image4 from '../assets/TRCorner.png';
import Image5 from '../assets/WallBottom.png';
import Image6 from '../assets/WallTop.png';
import Image7 from '../assets/WallLeft.png';
import Image8 from '../assets/WallRight.png';
import Image9 from '../assets/Floor.png';
import Image10 from '../assets/Leftovers/LeftOver1.png'

import '../utility/roomGen';

// Import styles
import GridOther from "../components/GridOther1";
import '../styles/style.css';
import {roomGen} from "../utility/roomGen";

const Room = () => {
    const[rows, setRows] = useState(20);
    const[cols,setCols] = useState(20);
    const[probability,setProbability] = useState(0.35);
    const[entrances,setEntrances] = useState([[10,0],[0,12],[19,19]])
    const[clean, setClean] = useState(true)

    const images : JSX.Element[] = [
        <img className="grid_img" src={empty}/>,    // empty tile
        <img className="grid_img" src={floor}/>,    // floor tile
        <img className="grid_img" src={entrance}/>, // entrance tile
        <img className="grid_img" src={Image1}/>, // top left corner tile
        <img className="grid_img" src={Image2}/>, // bottom left corner tile
        <img className="grid_img" src={Image3}/>, // bottom right corner tile
        <img className="grid_img" src={Image4}/>, // top right corner tile
        <img className="grid_img" src={Image5}/>, // bottom wall tile
        <img className="grid_img" src={Image6}/>, // top wall tile
        <img className="grid_img" src={Image7}/>, // left wall tile
        <img className="grid_img" src={Image8}/>, // right wall tile
        <img className="grid_img" src={Image9}/>, // another floor tile
        <img className="grid_img" src={Image10}/>, // boarder tile
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
