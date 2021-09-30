import React from "react";
import { roomGen } from "./roomGen";
import { assignImageNumbers } from './MapTilerHelper';
import MapData from "../interfaces/MapData";


const roomSize = 10;
const mapRoomRows = 3;
const mapRoomCols = 4;
const height = roomSize * mapRoomRows;
const width = roomSize * mapRoomCols;
const entranceProbability = 0.7;
const roomGrowProbability = 0.42;

//todo double doors.
const DOUBLE_DOORS = false;

interface mapGenProps {
    theme: string
}
/**
 * Returns a map data object containing all the information needed for a level.
 */
export default function map(props: mapGenProps): MapData {

    let allRooms: number[][][] = []; // holds all the rooms making up the map in order.

    for (let row = 0; row < mapRoomRows; row++) { // push the total empty rooms needed to make the map.
        for (let col = 0; col < mapRoomCols; col++) {
            allRooms.push([]);
        }
    }

    // create a 2D array rows * cols filled with the value 10.
    let mapGrid: number[][] = Array.from(Array(mapRoomRows * roomSize), _ => Array(mapRoomCols * roomSize).fill(10));

    // create a 2D array of rows * cols, filled with the value 0. For visiblity.    0:unexplored;  1:visible;   2:fog of war
    let mapVisibility: number[][] = Array.from(Array(mapRoomRows * roomSize), _ => Array(mapRoomCols * roomSize).fill(0));

    let previousRoomIndex = -1; // the previous room generated
    let currentRoomIndex = 0; // the next room to generate

    // these are used for the path from entry to exit.
    let row = 0;
    let col = 0;

    var roomsInside: number = 0;

    /*
    This while loop generates the rooms that follow the route from the start room to end room. Starting room is currently at top left position and end is at bottom
    right. Each time it randomly decides whether to generate a room to the right or downwards along the path (as long as the room isn't at the bottom or far right of
    the map). The room is then added to the map and to the rooms array.
    */
    while (col <= mapRoomCols && row <= mapRoomRows) {
        roomsInside++;

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

            if (previousWasLeft) {
                for (let i = 0; i < previousRoomEntrances.length; i++) {
                    if (previousRoomEntrances[i][1] == roomSize - 1) westEntrances.push([previousRoomEntrances[i][0], 0]);
                }

                // Push random east and south entrances
                eastEntrances.push([getRandomDoorLocation(), 9]);
                southEntrances.push([9, getRandomDoorLocation()]);

                // Chance for a north
                if (Math.random() < entranceProbability) northEntrances.push([0, getRandomDoorLocation()]);
            } else if (previousWasUp) {
                for (let i = 0; i < previousRoomEntrances.length; i++) {
                    if (previousRoomEntrances[i][0] == roomSize - 1) northEntrances.push([0, previousRoomEntrances[i][1]]);
                }

                // Push random east and south entrances
                eastEntrances.push([getRandomDoorLocation(), 9]);
                southEntrances.push([9, getRandomDoorLocation()]);

                // chance for a west
                if (Math.random() < entranceProbability) westEntrances.push([getRandomDoorLocation(), 0]);
            }

            previousRoomIndex = currentRoomIndex;
        }

        if (roomRow > 0) {
            northEntrances.forEach(e => entrances.push(e));
        }
        if (roomRow < mapRoomRows - 1) {
            southEntrances.forEach(e => entrances.push(e));
        }
        if (roomCol > 0) {
            westEntrances.forEach(e => entrances.push(e));
        }
        if (roomCol < mapRoomCols - 1) {
            eastEntrances.forEach(e => entrances.push(e));
        }

        // Generate the room and add it to allRooms.
        allRooms[currentRoomIndex] = roomGen(roomSize, roomSize, entrances, roomGrowProbability, true);

        // calculate the next room to make.
        if (row < mapRoomRows - 1 && col < mapRoomCols - 1) {
            // can grow south or east
            if (Math.random() < 0.5) {
                // grow south
                currentRoomIndex = currentRoomIndex + mapRoomCols
                row++;
            } else {
                // grow east
                currentRoomIndex = currentRoomIndex + 1;
                col++;
            }
        } else if (row < mapRoomRows - 1) {
            // must grow south
            currentRoomIndex = currentRoomIndex + mapRoomCols
            row++;
        } else if (col < mapRoomCols - 1) {
            // must grow east
            currentRoomIndex = currentRoomIndex + 1;
            col++;
        } else {
            // no further places we can travel.
            break;
        }
    }

    // Generate any left over rooms
    for (let i = 0; i < allRooms.length; i++) {
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
        let roomEntrances: number[][] = [];

        // Check if it is possible to have the neighbour
        let hasNorthNeighbour = roomRow > 0;
        let hasSouthNeighbour = roomRow < mapRoomRows - 1;
        let hasWestNeighbour = roomCol > 0;
        let hasEastNeighbour = roomCol < mapRoomCols - 1;

        // If it is possible, check they have a generated room otherwise no point in looking for entrances.
        let hasNorthGenerated = hasNorthNeighbour && allRooms[i - mapRoomCols].length != 0;
        let hasSouthGenerated = hasSouthNeighbour && allRooms[i + mapRoomCols].length != 0;
        let hasWestGenerated = hasWestNeighbour && allRooms[i - 1].length != 0;
        let hasEastGenerated = hasEastNeighbour && allRooms[i + 1].length != 0;

        if (hasNorthGenerated || hasSouthGenerated || hasEastGenerated || hasWestGenerated) roomsInside++;

        // check each neighbour for entrances and add them if they exist.
        if (hasNorthGenerated) {
            let northNeighbourEntrances = getRoomEntrances(i - mapRoomCols);

            for (let i = 0; i < northNeighbourEntrances.length; i++) {
                if (northNeighbourEntrances[i][0] == roomSize - 1) {
                    roomEntrances.push([0, northNeighbourEntrances[i][1]]);
                }
            }
        }

        if (hasSouthGenerated) {
            let southNeighbourEntrances = getRoomEntrances(i + mapRoomCols);

            for (let i = 0; i < southNeighbourEntrances.length; i++) {
                if (southNeighbourEntrances[i][0] == 0) {
                    roomEntrances.push([roomSize - 1, southNeighbourEntrances[i][1]]);
                }
            }
        }

        if (hasWestGenerated) {
            let westNeighbourEntrances = getRoomEntrances(i - 1);

            for (let i = 0; i < westNeighbourEntrances.length; i++) {
                if (westNeighbourEntrances[i][1] == roomSize - 1) {
                    roomEntrances.push([westNeighbourEntrances[i][0], 0]);
                }
            }
        }

        if (hasEastGenerated) {
            let eastNeighbourEntrances = getRoomEntrances(i + 1);

            for (let i = 0; i < eastNeighbourEntrances.length; i++) {
                if (eastNeighbourEntrances[i][1] == 0) {
                    roomEntrances.push([eastNeighbourEntrances[i][0], roomSize - 1]);
                }
            }
        }

        // if we got here and we have no entrances than the room has no entrances and we can exit.
        if (roomEntrances.length == 0) {
            roomsInside--;
            allRooms[i] = Array.from(Array(roomSize), _ => Array(roomSize).fill(0));
            return;
        }

        // Make possible new entrances for non generated rooms
        if (hasNorthNeighbour && !hasNorthGenerated) {
            if (Math.random() < entranceProbability) {
                roomEntrances.push([0, getRandomDoorLocation()]);
            }
        }
        if (hasSouthNeighbour && !hasSouthGenerated) {
            if (Math.random() < entranceProbability) {
                roomEntrances.push([roomSize - 1, getRandomDoorLocation()]);
            }
        }
        if (hasWestNeighbour && !hasWestGenerated) {
            if (Math.random() < entranceProbability) {
                roomEntrances.push([getRandomDoorLocation(), 0]);
            }
        }
        if (hasEastNeighbour && !hasEastGenerated) {
            if (Math.random() < entranceProbability) {
                roomEntrances.push([getRandomDoorLocation(), roomSize - 1]);
            }
        }
        allRooms[i] = roomGen(roomSize, roomSize, roomEntrances, roomGrowProbability, true);
    }
    // checks if the generated exit room isn't too close to the entrance
    function checkIfRoomIsForbidden(index:number, forbiddenExitRooms:number[]) {
        for(let i = 0; i < forbiddenExitRooms.length; i++) {
            if(index == forbiddenExitRooms[i]) {
                return false;
            }
        }
        return true;
    }

    // sets the entrance and exit room. Starts by setting a random room in the array of rooms as the entrance, then sets all the rooms that cannot be exit rooms.
    // it then sets the exit room by randomly selecting a room that isn't in the array of forbidden exit rooms.
    let forbiddenExitRooms:number[] = []
    function findEntranceRoom() {
        let foundRoom: boolean = false
        let entranceIndex: number = 0;
        while (foundRoom == false) {
            let index = Math.floor(Math.random() * allRooms.length)
            for (let i = 0; i < allRooms[index].length; i++) {
                console.log(allRooms[index])
                for (let j = 0; j < allRooms[index][i].length; j++) {
                    if (allRooms[index][i][j] == 1) {
                        foundRoom = true;
                        entranceIndex = index;

                        // forbids the rooms that are adjacent to the entrance room
                        forbiddenExitRooms.push(index);
                        forbiddenExitRooms.push(index+1);
                        forbiddenExitRooms.push(index-1);
                        forbiddenExitRooms.push(index+4);
                        forbiddenExitRooms.push(index+8);
                        forbiddenExitRooms.push(index-8);
                        forbiddenExitRooms.push(index+2);
                        forbiddenExitRooms.push(index-2);
                        forbiddenExitRooms.push(index-4);
                        forbiddenExitRooms.push(index+5);
                        forbiddenExitRooms.push(index-5);
                        forbiddenExitRooms.push(index+3);
                        forbiddenExitRooms.push(index-3);
                    }
                }
            }
        }
    }


    function findExitRoom(forbiddenExitRooms:number[]) {
        let exitIndex:number = 0;

        let foundRoom = false
        while (foundRoom == false) {
            let index = Math.floor(Math.random() * allRooms.length)
            if (checkIfRoomIsForbidden(index, forbiddenExitRooms)) {
                for (let i = 0; i < allRooms[index].length; i++) {
                    console.log(allRooms[index])
                    for (let j = 0; j < allRooms[index][i].length; j++) {
                        if (allRooms[index][i][j] == 1) {
                            foundRoom = true;
                            exitIndex = index;
                        }
                    }
                }
            }
        }
        makeEntranceAndExit(forbiddenExitRooms[0],exitIndex);
    }

    // Sets a tile in the entrance and exit rooms as a staircase. It goes through the room to find the first floor tile.
    function makeEntranceAndExit(entranceIndex: number, exitIndx:number) {
        let madeEntrance = false
        let madeExit = false
        for (let i = 0; i < allRooms[entranceIndex].length; i++) {
            for (let j = 0; j < allRooms[entranceIndex][i].length; j++) {
                if (allRooms[entranceIndex][i][j] == 1 && madeEntrance == false) {
                    allRooms[entranceIndex][i][j] = 3
                    madeEntrance = true
                }
            }
        }
        
        for (let i = 0; i < allRooms[exitIndx].length; i++) {
            for (let j = 0; j < allRooms[exitIndx][i].length; j++) {
                if (allRooms[exitIndx][i][j] == 1 && madeExit == false) {
                    allRooms[exitIndx][i][j] = 4
                    madeExit = true
                }
            }
        }

    }

    findEntranceRoom();
    findExitRoom(forbiddenExitRooms);
    addRooms();

    /**
     * Iterates through all the rooms, finds their coordinates on the main map, and calls addRoom
     * to add them to the main map.
     */
    function addRooms() {
        for (let i = 0; i < allRooms.length; i++) {
            if (allRooms[i].length == 0) {
                continue;
            }

            let room = allRooms[i];

            let roomRow = getRoomRow(i);
            let roomCol = getRoomCol(i);

            let left = roomCol * roomSize;
            let top = roomRow * roomSize;

            addRoom(left, top, room);
        }
    }

    /**
     * Returns the row of the room given a 1D array of rooms mapped to the 2D array of rooms.
     *
     * @param roomNumber the room number in the 1D Array.
     */
    function getRoomRow(roomNumber: number): number {
        return Math.floor(roomNumber / mapRoomCols);
    }

    /**
     * Returns the col of the room given a 1D array of rooms mapped to the 2D array of rooms.
     *
     * @param roomNumber the room number in the 1D Array.
     */
    function getRoomCol(roomNumber: number): number {
        return roomNumber % mapRoomCols;
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

        for (let row = startTop; row < startTop + roomSize; row++) {
            for (let col = startLeft; col < startLeft + roomSize; col++) {
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
    function getRoomEntrances(index: number): number[][] {
        let room = allRooms[index]
        const entrances: number[][] = [];

        for (let row = 0; row < room.length; row++) {
            for (let col = 0; col < room[row].length; col++) {
                if (room[row][col] == 2) entrances.push([row, col]);
            }
        }

        return entrances;
    }

    /**
     * Returns a random int between 1 - RoomSize-1
     *
     * Eg for room size 10 it will return 1 - 8.
     */
    function getRandomDoorLocation(): number {
        return Math.floor(Math.random() * (roomSize - 2)) + 1;
    }

    const finalMap = assignImageNumbers(mapGrid);

    const mapData: MapData = {
        map: finalMap,
        monsters: [],
        roomCols: mapRoomCols,
        roomRows: mapRoomRows,
        roomSize: roomSize,
        visibility: mapVisibility,
        roomNum: roomsInside,
        theme: props.theme,
    }

    return mapData;
}
