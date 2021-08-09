import React from "react";
import MapData from "../interfaces/MapData";
import {makeImageArray} from '../utility/MapTilerHelper'

interface mapProps {
    mapData: MapData
}

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



