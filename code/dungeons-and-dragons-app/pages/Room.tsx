import React, {ChangeEvent, useState} from 'react';
import { View } from 'react-native';
import {Checkbox, Slider, Typography} from '@material-ui/core';
import empty from '../assets/Dark.png';
import floor from '../assets//Light.png';
import entrance from '../assets/Images4/Floor.png';
import Image1 from '../assets/Images2/TRCorner.png';
import Image2 from '../assets/Images2/BLCorner.png';
import Image3 from '../assets/Images2/BRCorner.png';
import Image4 from '../assets/Images2/TLCorner.png';
import Image5 from '../assets/Images2/BottomWall.png';
import Image6 from '../assets/Images2/TopWall.png';
import Image7 from '../assets/Images2/LeftWall.png';
import Image8 from '../assets/Images2/RightWall.png';
import Image9 from '../assets/Images2/Floor.png';

// Import styles
import GridOther from "../components/GridOther";
import '../styles/style.css';
import {roomGen} from "../utility/roomGen";

const Room = () => {
    const[rows, setRows] = useState(20);
    const[cols,setCols] = useState(20);
    const[probability,setProbability] = useState(0.35);
    const[entrances,setEntrances] = useState([[12,19],[0,12],[18,0]])
    const[clean, setClean] = useState(true)

    const images : JSX.Element[] = [
        <img className="grid_img" src={empty}/>,    // empty tile
        <img className="grid_img" src={floor}/>,    // floor tile
        <img className="grid_img" src={entrance}/>, // entrance tile
    ]

    const tiles = roomGen(rows,cols,entrances,probability,clean);

    console.log(tiles);

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
            <h1>Room Generation Testing</h1>

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
