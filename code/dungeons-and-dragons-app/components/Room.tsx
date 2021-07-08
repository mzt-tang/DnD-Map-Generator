import React, { useState } from 'react';
import {Text, TouchableOpacity} from 'react-native';


interface roomProps {
    north: number[]
    south: number[]
    east: number[]
    west: number[]
}

export default function room (props:roomProps) {
    
    var room : number[][] = [
        [8,8,8,8,8,8,8,8,8,8],
        [8,9,9,9,9,9,9,9,9,8],
        [8,9,9,9,9,9,9,9,9,8],
        [8,9,9,9,9,9,9,9,9,8],
        [8,9,9,9,9,9,9,9,9,8],
        [8,9,9,9,9,9,9,9,9,8],
        [8,9,9,9,9,9,9,9,9,8],
        [8,9,9,9,9,9,9,9,9,8],
        [8,9,9,9,9,9,9,9,9,8],
        [8,8,8,8,8,8,8,8,8,8],
    ]

    for (var i = props.north[0]; i < props.north[1]; i++) {
        room[0][i] = 9
    }
    for (var i = props.south[0]; i < props.south[1]; i++) {
        room[8][i] = 9
    }
    for (var i = props.east[0]; i < props.east[1]; i++) {
        room[i][9] = 9
    }
    for (var i = props.west[0]; i < props.west[1]; i++) {
        room[i][0] = 9
    }
    
    return (
        <div id="room">
            {room}
        </div>
    );
}