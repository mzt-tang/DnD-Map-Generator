import React, { useState } from "react";
import MapData from "../interfaces/MapData";
import {makeImageArray} from '../utility/MapTilerHelper'

interface mapProps {
    mapData: MapData
}

//Map constants
const ROOM_SIZE = 10;
const MAP_ROOM_ROWS = 3;
const MAP_ROOM_COLS = 4;
const height = ROOM_SIZE*MAP_ROOM_ROWS;
const width = ROOM_SIZE*MAP_ROOM_COLS;
const ENTRANCE_PROBABILITY= 0.7;
const ROOM_GROW_PROBABILITY = 0.42;

//todo double doors.
const DOUBLE_DOORS = false;

/**
 * Map component. The very meat of this file.
 * At the moment, it just composes a 2d array of images...
 * @param props
 * @returns map 'style'.
 */
export default function map(props: mapProps) {
    const mapStyle = function (width: number, height: number) {
        return {
            margin: 'auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(' + width + ',max-content)',
            gridTemplateRows: 'repeat(' + height + ',max-content)',
            gridGap: '0px'
        }
    }

    const data = props.mapData;
    const images = makeImageArray(data.map,data.visibility);

    return (
        <div id="map" style={mapStyle(data.roomCols*data.roomSize, data.roomRows*data.roomSize)}>
            {images}
        </div>
    )
}



