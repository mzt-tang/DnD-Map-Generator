import React from "react";
import {roomGen} from "../utility/roomGen"

interface mapProps {
    images: JSX.Element[]
}

const ROOM_SIZE = 10;
const MAP_ROOM_ROWS = 3;
const MAP_ROOM_COLS = 4;
const ENTRANCE_CHANCE = 0.5;

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

    let height: number = mapGrid.length + 1;
    let width: number = mapGrid[0].length + 1;

    let previousRoomIndex = -1; // the previous room generated
    let nextRoomIndex = 0; // the next room to generate

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

        //todo change to allow multiple.
        let northEntrances: number[] = []
        let westEntrances: number[] = []
        let eastEntrances: number[] = []
        let southEntrances: number[] = []


        if (previousRoomIndex == -1) { // this is the first room we are generating.
            // place first entrances in
            northEntrances.push(0, 4);
            westEntrances.push(4, 0);
            eastEntrances.push(4, 9);
            southEntrances.push(9, 4);

            previousRoomIndex = nextRoomIndex;
        } else {
            // figure out where previous entrances were.
            northEntrances.push(0, 4);
            westEntrances.push(4, 0);
            eastEntrances.push(4, 9);
            southEntrances.push(9, 4);

            previousRoomIndex = nextRoomIndex;
        }

        // figure out which row and col this room belongs to in the map.
        let roomRow = getRoomRow(nextRoomIndex);
        let roomCol = getRoomCol(nextRoomIndex);

        if (roomRow > 0) {
            entrances.push(northEntrances)
        }
        if (roomRow < MAP_ROOM_ROWS - 1) {
            entrances.push(southEntrances)
        }
        if (roomCol > 0) {
            entrances.push(westEntrances)
        }
        if (roomCol < MAP_ROOM_COLS - 1) {
            entrances.push(eastEntrances)
        }

        // Generate the room and add it to allRooms.
        allRooms[nextRoomIndex] = roomGen(ROOM_SIZE, ROOM_SIZE, entrances, 0.4, true);

        // calculate the next room to make.
        if (row < MAP_ROOM_ROWS - 1 && col < MAP_ROOM_COLS - 1) {
            // can grow south or east
            if (Math.random() < 0.5) {
                // grow south
                nextRoomIndex = nextRoomIndex + MAP_ROOM_COLS
                row++;
            } else {
                // grow east
                nextRoomIndex = nextRoomIndex + 1;
                col++;
            }
        } else if (row < MAP_ROOM_ROWS - 1) {
            // must grow south
            nextRoomIndex = nextRoomIndex + MAP_ROOM_COLS
            row++;
        } else if (col < MAP_ROOM_COLS - 1) {
            // must grow east
            nextRoomIndex = nextRoomIndex + 1;
            col++;
        } else {
            // no further places we can travel.
            break;
        }
    }

    addRooms();
    let pixelDisplay = doPixelDisplay();

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
     * Takes in the 2D array representing the main map and returns a 2D array of JSX.Elements representing the tile
     * elements.
     */
    function doPixelDisplay() : JSX.Element[][] {
        let pixelDisplay : JSX.Element[][] = [];

        mapGrid.forEach(function (e1: number[], index: number) {
            //  row
            let row: JSX.Element[] = []
            e1.forEach(function (e2: number, index2: number) {
                //  col
                // numbers should reference a tile in images
                const imagelink = props.images[e2]
                row.push(imagelink)
            })
            pixelDisplay.push(row)
        });
        return pixelDisplay;
    }

    return (
        <div id="map" style={mapStyle(MAP_ROOM_COLS*ROOM_SIZE, MAP_ROOM_ROWS*ROOM_SIZE)}>
            {pixelDisplay}
        </div>
    )


}



