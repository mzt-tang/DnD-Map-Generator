import React from 'react';
import { View } from 'react-native';
import empty from '../assets/TLCorner.png';
import floor from '../assets/BLCorner.png';
import entrance from '../assets/BRCorner.png';

import '../utility/roomGen';

// Import styles
import GridOther from "../components/GridOther";
import '../styles/style.css';
import {roomGen} from "../utility/roomGen";

const Room = () => {

    const images : JSX.Element[] = [
        <img className="grid_img" src={empty}/>, // empty tile
        <img className="grid_img" src={floor}/>,  // floor tile
        <img className="grid_img" src={entrance}/>,  // entrance tile
    ]

    const entrances = [[1,0],[0,2],[2,3]];
    const rows = 3;
    const cols = 4;

    const tiles = roomGen(3,4,entrances,0.5);

    return (
        <View>
            <GridOther width={cols} height={rows} images={images} tiles={tiles} />
        </View>
    );
}
export default Room
