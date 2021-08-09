import React, { useState } from "react";
import {roomGen} from "../utility/roomGen";

import { db } from '../FirebaseConfig';
import firebase from 'firebase';


interface mapProps {
    images: JSX.Element[]
}

import {Monster} from "../interfaces/MapData"
import {AppRegistry} from "react-native";
import unmountApplicationComponentAtRootTag = AppRegistry.unmountApplicationComponentAtRootTag;

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

//Firebase
//todo this is needed to init the firebase database connection. We need to change this in future.
const reference = db;
const dbRefObject = firebase.database().ref().child('maps');

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

    let allRooms : number[][][] = []; // holds all the rooms making up the map in order.

    for (let row = 0; row < MAP_ROOM_ROWS; row++) { // push the total empty rooms needed to make the map.
        for (let col = 0; col < MAP_ROOM_COLS; col++) {
            allRooms.push([]);
        }
    }

    // create a 2D array rows * cols filled with the value 10.
    let mapGrid = Array.from(Array(MAP_ROOM_ROWS * ROOM_SIZE), _ => Array(MAP_ROOM_COLS * ROOM_SIZE).fill(10));

    // this is used to send to firebase where we need the final numbers stored
    let fireBaseMapVersion = Array.from(Array(MAP_ROOM_ROWS * ROOM_SIZE), _ => Array(MAP_ROOM_COLS * ROOM_SIZE).fill(10));

    let previousRoomIndex = -1; // the previous room generated
    let currentRoomIndex = 0; // the next room to generate

    // these are used for the path from entry to exit.
    let row = 0;
    let col = 0;

    /*
    This while loop generates the rooms that follow the route from the start room to end room. Starting room is currently at top left position and end is at bottom
    right. Each time it randomly decides whether to generate a room to the right or downwards along the path (as long as the room isn't at the bottom or far right of
    the map). The room is then added to the map and to the rooms array.
    */
    while (col <= MAP_ROOM_COLS && row <= MAP_ROOM_ROWS) {

        let entrances: number[][] = []

        // figure out which row and col this room belongs to in the map.
        let roomRow = getRoomRow(currentRoomIndex);
        let roomCol = getRoomCol(currentRoomIndex);

        let northEntrances: number[][] = []
        let westEntrances: number[][] = []
        let eastEntrances: number[][] = []
        let southEntrances: number[][] = []


        if (previousRoomIndex == -1) { // this is the first room we are generating.
            // place first entrances in
            northEntrances.push([0, getRandomDoorLocation()]);
            westEntrances.push([getRandomDoorLocation(), 0]);
            eastEntrances.push([getRandomDoorLocation(), 9]);
            southEntrances.push([9, getRandomDoorLocation()]);

            previousRoomIndex = currentRoomIndex;
        } else {
            // Figure out where previous entrances were.
            let previousRoomEntrances = getRoomEntrances(previousRoomIndex);

            let previousRow = getRoomRow(previousRoomIndex);
            let previousCol = getRoomCol(previousRoomIndex);

            // Match the previous entrances - must be left or up.
            let previousWasLeft = previousCol == roomCol - 1;
            let previousWasUp = previousRow == roomRow - 1;

            if (previousWasLeft){
                for (let i = 0; i < previousRoomEntrances.length; i++){
                    if (previousRoomEntrances[i][1] == ROOM_SIZE-1) westEntrances.push([previousRoomEntrances[i][0],0]);
                }

                // Push random east and south entrances
                eastEntrances.push([getRandomDoorLocation(), 9]);
                southEntrances.push([9, getRandomDoorLocation()]);

                // Chance for a north
                if (Math.random() < ENTRANCE_PROBABILITY) northEntrances.push([0, getRandomDoorLocation()]);
            } else if (previousWasUp){
                for (let i = 0; i < previousRoomEntrances.length; i++){
                    if (previousRoomEntrances[i][0] == ROOM_SIZE-1) northEntrances.push([0,previousRoomEntrances[i][1]]);
                }

                // Push random east and south entrances
                eastEntrances.push([getRandomDoorLocation(), 9]);
                southEntrances.push([9, getRandomDoorLocation()]);

                // chance for a west
                if (Math.random() < ENTRANCE_PROBABILITY) westEntrances.push([getRandomDoorLocation(), 0]);
            }

            previousRoomIndex = currentRoomIndex;
        }

        if (roomRow > 0) {
            northEntrances.forEach(e => entrances.push(e));
        }
        if (roomRow < MAP_ROOM_ROWS - 1) {
            southEntrances.forEach(e => entrances.push(e));
        }
        if (roomCol > 0) {
            westEntrances.forEach(e => entrances.push(e));
        }
        if (roomCol < MAP_ROOM_COLS - 1) {
            eastEntrances.forEach(e => entrances.push(e));
        }

        // Generate the room and add it to allRooms.
        allRooms[currentRoomIndex] = roomGen(ROOM_SIZE, ROOM_SIZE, entrances, ROOM_GROW_PROBABILITY, true);

        // calculate the next room to make.
        if (row < MAP_ROOM_ROWS - 1 && col < MAP_ROOM_COLS - 1) {
            // can grow south or east
            if (Math.random() < 0.5) {
                // grow south
                currentRoomIndex = currentRoomIndex + MAP_ROOM_COLS
                row++;
            } else {
                // grow east
                currentRoomIndex = currentRoomIndex + 1;
                col++;
            }
        } else if (row < MAP_ROOM_ROWS - 1) {
            // must grow south
            currentRoomIndex = currentRoomIndex + MAP_ROOM_COLS
            row++;
        } else if (col < MAP_ROOM_COLS - 1) {
            // must grow east
            currentRoomIndex = currentRoomIndex + 1;
            col++;
        } else {
            // no further places we can travel.
            break;
        }
    }

    // Generate any left over rooms
    for (let i = 0; i < allRooms.length; i++){
        if (allRooms[i].length == 0) generateRoom(i);
    }

    /**
     * Used to generate the rooms after the initial path from entrance to exit is made.
     *
     * @param i the room number
     */
    function generateRoom(i: number) {
        let roomRow = getRoomRow(i);
        let roomCol = getRoomCol(i);
        let roomEntrances : number[][] = [];

        // Check if it is possible to have the neighbour
        let hasNorthNeighbour = roomRow > 0;
        let hasSouthNeighbour = roomRow < MAP_ROOM_ROWS-1;
        let hasWestNeighbour = roomCol > 0;
        let hasEastNeighbour = roomCol < MAP_ROOM_COLS-1;

        // If it is possible, check they have a generated room otherwise no point in looking for entrances.
        let hasNorthGenerated = hasNorthNeighbour && allRooms[i - MAP_ROOM_COLS].length != 0;
        let hasSouthGenerated = hasSouthNeighbour && allRooms[i + MAP_ROOM_COLS].length != 0;
        let hasWestGenerated = hasWestNeighbour && allRooms[i - 1].length != 0;
        let hasEastGenerated = hasEastNeighbour && allRooms[i + 1].length != 0;

        // check each neighbour for entrances and add them if they exist.
        if (hasNorthGenerated){
            let northNeighbourEntrances = getRoomEntrances(i - MAP_ROOM_COLS);

            for (let i = 0; i < northNeighbourEntrances.length; i++){
                if (northNeighbourEntrances[i][0] == ROOM_SIZE-1) roomEntrances.push([0,northNeighbourEntrances[i][1]]);
            }
        }

        if (hasSouthGenerated){
            let southNeighbourEntrances = getRoomEntrances(i + MAP_ROOM_COLS);

            for (let i = 0; i < southNeighbourEntrances.length; i++){
                if (southNeighbourEntrances[i][0] == 0) roomEntrances.push([ROOM_SIZE-1,southNeighbourEntrances[i][1]]);
            }
        }

        if (hasWestGenerated){
            let westNeighbourEntrances = getRoomEntrances(i - 1);

            for (let i = 0; i < westNeighbourEntrances.length; i++){
                if (westNeighbourEntrances[i][1] == ROOM_SIZE-1) roomEntrances.push([westNeighbourEntrances[i][0],0]);
            }
        }

        if (hasEastGenerated){
            let eastNeighbourEntrances = getRoomEntrances(i + 1);

            for (let i = 0; i < eastNeighbourEntrances.length; i++){
                if (eastNeighbourEntrances[i][1] == 0) roomEntrances.push([eastNeighbourEntrances[i][0],ROOM_SIZE-1]);
            }
        }

        // if we got here and we have no entrances than the room has no entrances and we can exit.
        if (roomEntrances.length == 0){
            allRooms[i] = Array.from(Array(ROOM_SIZE), _ => Array(ROOM_SIZE).fill(0));
            return;
        }

        // Make possible new entrances for non generated rooms
        if (hasNorthNeighbour && !hasNorthGenerated){
            if (Math.random() < ENTRANCE_PROBABILITY){
                roomEntrances.push([0,getRandomDoorLocation()]);
            }
        }
        if (hasSouthNeighbour && !hasSouthGenerated){
            if (Math.random() < ENTRANCE_PROBABILITY){
                roomEntrances.push([ROOM_SIZE-1,getRandomDoorLocation()]);
            }
        }
        if (hasWestNeighbour && !hasWestGenerated){
            if (Math.random() < ENTRANCE_PROBABILITY){
                roomEntrances.push([getRandomDoorLocation(),0]);
            }
        }
        if (hasEastNeighbour && !hasEastGenerated){
            if (Math.random() < ENTRANCE_PROBABILITY){
                roomEntrances.push([getRandomDoorLocation(),ROOM_SIZE-1]);
            }
        }

        allRooms[i] = roomGen(ROOM_SIZE,ROOM_SIZE,roomEntrances,ROOM_GROW_PROBABILITY,true);
    }



    addRooms();
    let pixelDisplay = assignAutoTiledWalls();


    function assignMonstersToRooms(monsters: number[][]) {
        //Notes
        //This only takes a set of monsters and assigns them to the rooms
        //Try to avoid spawning monsters at the start of the map

        //Randomly select a monster from the map
        //Randomly select a room
        let chosenMonster = monsters[getRandomInt(0, monsters.length-1)];
        let chosenRoom = getRandomInt(0, ROOM_SIZE-1)

        while(chosenMonster)

        //populate the room
        //if number of monsters != (the sum of all monsters' loneliness/number of monsters)
        //  iterate and filter all monster's friends
        //  give the filtered monster an equal chance to be chosen.
        //  add the chosen monster to the room


        return null;
    }

    function getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
         max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

    /**
     * Iterates through all the rooms, finds their coordinates on the main map, and calls addRoom
     * to add them to the main map.
     */
    function addRooms() {
        for (let i = 0; i < allRooms.length; i++) {
            if (allRooms[i].length == 0){
                continue;
            }

            let room = allRooms[i];

            let roomRow = getRoomRow(i);
            let roomCol = getRoomCol(i);

            let left = roomCol * ROOM_SIZE;
            let top = roomRow * ROOM_SIZE;

            addRoom(left, top, room);
        }
    }

    /**
     * Returns the row of the room given a 1D array of rooms mapped to the 2D array of rooms.
     *
     * @param roomNumber the room number in the 1D Array.
     */
    function getRoomRow(roomNumber : number) : number {
        return Math.floor(roomNumber / MAP_ROOM_COLS);
    }

    /**
     * Returns the col of the room given a 1D array of rooms mapped to the 2D array of rooms.
     *
     * @param roomNumber the room number in the 1D Array.
     */
    function getRoomCol(roomNumber : number) : number {
        return roomNumber % MAP_ROOM_COLS;
    }

    /**
     *
     * Adds the room 2d array to the map grid, going from startLeft to width, and startTop to height.
     *
     * @param startLeft The col of the left most pixel
     * @param startTop The row of the top most pixel
     * @param room The room.
     */
    function addRoom(startLeft: number, startTop: number, room: number[][]) {
        let roomLeft = 0;
        let roomTop = 0;

        for (let row = startTop; row < startTop+ROOM_SIZE; row++) {
            for (let col = startLeft; col < startLeft+ROOM_SIZE; col++) {
                mapGrid[row][col] = room[roomTop][roomLeft];
                roomLeft++;
            }
            roomLeft = 0;
            roomTop++;
        }
    }

    /**
     * Returns the entrances of a room from the all rooms.
     *
     * @param index the index of the room you want the entrances from.
     */
    function getRoomEntrances(index : number) : number[][] {
        let room = allRooms[index]
        const entrances : number[][] = [];

        for (let row = 0; row < room.length; row++){
            for (let col = 0; col < room[row].length; col++){
                if (room[row][col] == 2) entrances.push([row,col]);
            }
        }

        return entrances;
    }

    /**
     * Returns a random int between 1 - RoomSize-1
     *
     * Eg for room size 10 it will return 1 - 8.
     */
    function getRandomDoorLocation() : number {
        return Math.floor(Math.random() * (ROOM_SIZE-2)) + 1;
    }

    /**
     * Takes in the 2D array representing the main map and returns a 2D array of JSX.Elements representing the tile
     * elements.
     */
    function assignAutoTiledWalls() : JSX.Element[][] {
        let pixelDisplay: JSX.Element[][] = []

        for (let i: number = 0; i < mapGrid.length; i++) { //Rows
            let row: JSX.Element[] = []
            for (let j: number = 0; j < mapGrid[i].length; j++) { //Col
                let imagelink = props.images[0];

                if (mapGrid[i][j] == 0) {
                    //Create bool statements to find walls
                    let compass: string = "";

                    //Check which directions have walls, or edge of the grid
                    if (i == 0 || mapGrid[i - 1][j] == 0) {
                        compass += "N"
                    }
                    if (j == mapGrid[0].length-1 || mapGrid[i][j + 1] == 0) {
                        compass += "E"
                    }
                    if (i == mapGrid.length-1 || mapGrid[i + 1][j] == 0) {
                        compass += "S"
                    }
                    if (j == 0 || mapGrid[i][j - 1] == 0) {
                        compass += "W";
                    }


                    //Assign an image based on wall directions
                    switch (compass) {
                        case "N": // Only north
                            imagelink = props.images[13];
                            fireBaseMapVersion[i][j] = 13;
                            break;
                        case "S": // Only south
                            imagelink = props.images[12];
                            fireBaseMapVersion[i][j] = 12;
                            break;
                        case "W": // Only west
                            imagelink = props.images[10];
                            fireBaseMapVersion[i][j] = 10;
                            break;
                        case "E": // Only east
                            imagelink = props.images[11];
                            fireBaseMapVersion[i][j] = 11;
                            break;
                        case "NW": // north & west
                            imagelink = props.images[6];
                            fireBaseMapVersion[i][j] = 6;
                            break;
                        case "NE": // north & east
                            imagelink = props.images[7];
                            fireBaseMapVersion[i][j] = 7;
                            break;
                        case "SW": // south & west
                            imagelink = props.images[8];
                            fireBaseMapVersion[i][j] = 8;
                            break;
                        case "ES": // south & east
                            imagelink = props.images[9];
                            fireBaseMapVersion[i][j] = 9;
                            break;
                        case "NS": // vertical wall
                            imagelink = props.images[19];
                            fireBaseMapVersion[i][j] = 19;
                            break;
                        case "EW": // horizontal wall
                            imagelink = props.images[18];
                            fireBaseMapVersion[i][j] = 18;
                            break;
                        case "NEW": // north & east & west
                            imagelink = props.images[5];
                            fireBaseMapVersion[i][j] = 5;
                            break;
                        case "NSW": // north & west & south
                            imagelink = props.images[2];
                            fireBaseMapVersion[i][j] = 2;
                            break;
                        case "NES": // north & east & south
                            imagelink = props.images[3];
                            fireBaseMapVersion[i][j] = 3;
                            break;
                        case "ESW": // west & south & east
                            imagelink = props.images[4];
                            fireBaseMapVersion[i][j] = 4;
                            break;
                        default: // Solid wall, checks if its an inverted corner
                            //Create corner booleans
                            let cornerCompass:string = "";

                            //Check which directions have walls
                            if (i != 0 && j != 0 && mapGrid[i - 1][j - 1] == 0) {
                                cornerCompass += "NW";
                            }
                            if (i != 0 && j != mapGrid[0].length-1 && mapGrid[i - 1][j + 1] == 0) {
                                cornerCompass += "NE";
                            }
                            if (i != mapGrid.length-1 && j != 0 && mapGrid[i + 1][j - 1] == 0) {
                                cornerCompass += "SW";
                            }
                            if (i != mapGrid.length-1 && j != mapGrid[0].length-1 && mapGrid[i + 1][j + 1] == 0) {
                                cornerCompass += "SE";
                            }

                            switch (cornerCompass) {
                                case "NWNESW": // All but SE
                                    imagelink = props.images[14];
                                    fireBaseMapVersion[i][j] = 14;
                                    break;
                                case "NWNESE": // All but SW
                                    imagelink = props.images[15];
                                    fireBaseMapVersion[i][j] = 15;
                                    break;
                                case "NWSWSE": // All but NE
                                    imagelink = props.images[16];
                                    fireBaseMapVersion[i][j] = 16;
                                    break;
                                case "NESWSE": // All but NW
                                    imagelink = props.images[17];
                                    fireBaseMapVersion[i][j] = 17;
                                    break;
                                default:
                                    imagelink = props.images[20];
                                    fireBaseMapVersion[i][j] = 20;
                                    break;
                            }
                    }

                    // Tile is a floor, grab floor image
                } else {
                    imagelink = props.images[21];
                    fireBaseMapVersion[i][j] = 21;
                }
                row.push(imagelink);
            }
            pixelDisplay.push(row);
        }

        // Send updated map to firebase
        dbRefObject.set({
            Map: fireBaseMapVersion
        })

        return pixelDisplay;
    }


    return (
        <div id="map" style={mapStyle(MAP_ROOM_COLS*ROOM_SIZE, MAP_ROOM_ROWS*ROOM_SIZE)}>
            {pixelDisplay}
        </div>
    )

}



