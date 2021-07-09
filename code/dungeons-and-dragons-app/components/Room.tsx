import React, { useState } from 'react';
import {Text, TouchableOpacity} from 'react-native';

class Room {
    north: number[];
    south: number[];
    east: number[];
    west: number[];
    room: number[][] = [
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
    ];
    constructor(northDoor:number[],southDoor:number[],eastDoor:number[],westDoor:number[]) {
        this.north = northDoor;
        this.south = southDoor;
        this.east = eastDoor;
        this.west = westDoor;
    }

    private assignEntrances () {
        for (var i = this.north[0]; i < this.north[1]; i++) {
            
        }
        for (var i = this.south[0]; i < this.south[1]; i++) {
            
        }
        for (var i = this.east[0]; i < this.east[1]; i++) {
            
        }
        for (var i = this.west[0]; i < this.west[1]; i++) {
            
        }
    }



}


// interface roomProps {
//     north: number[]
//     south: number[]
//     east: number[]
//     west: number[]
// }

// export default function room (props:roomProps) {
    
//     var room : number[][] = [
//         [8,8,8,8,8,8,8,8,8,8],
//         [8,9,9,9,9,9,9,9,9,8],
//         [8,9,9,9,9,9,9,9,9,8],
//         [8,9,9,9,9,9,9,9,9,8],
//         [8,9,9,9,9,9,9,9,9,8],
//         [8,9,9,9,9,9,9,9,9,8],
//         [8,9,9,9,9,9,9,9,9,8],
//         [8,9,9,9,9,9,9,9,9,8],
//         [8,9,9,9,9,9,9,9,9,8],
//         [8,8,8,8,8,8,8,8,8,8],
//     ]

//     for (var i = props.north[0]; i < props.north[1]; i++) {
//         room[0][i] = 20
//     }
//     for (var i = props.south[0]; i < props.south[1]; i++) {
//         room[8][i] = 20
//     }
//     for (var i = props.east[0]; i < props.east[1]; i++) {
//         room[i][9] = 20
//     }
//     for (var i = props.west[0]; i < props.west[1]; i++) {
//         room[i][0] = 20
//     }
    
//     return (
//         <div id="room">
//             {room}
//         </div>
//     );
// }