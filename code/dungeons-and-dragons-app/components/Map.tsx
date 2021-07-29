import React, { Component } from "react";
import {roomGen} from "../utility/roomGen"

interface mapProps {
    images: JSX.Element[]
    ALL_ROOMS: number [][]
}

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
        borderBottom: 'unset',
    },
    position: "relative",
    top: 0,
    width: 800,
  },
});

function createData(
  name: string,
) {
  return {
    name,
  };
}

function Row(props: { row: ReturnType<typeof createData> }) { // Will need to be called by map, passing in number of rooms
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  let room: string[] = fillRooms([]);// Passes in array of rooms from map, gets rooms

    let mons: string[] = getMonsters();

    function getMonsters(): string[] {
        // calls database to get an array of monsters
        return [];
    }

    let roomToMon:string[][] = [] // 2d array of rooms, then monsters in the room

    roomToMon = fillRoomsWithMons();

    function fillRoomsWithMons() :string[][]{
        // loops through all rooms, gets a random monster, adds it to roomToMon with that room as the first element, gets the rest of the monsters and checks if they can be in the same room as og monster
        return []
    }

    let monMap = new Map<string, Array<string>>(
        // alternative way to store monsters by map
    )

  let monsters: string[] = ["snek", "sln", "gost", "mand"] // only here to get something to display

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Monster
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow style={{position: "relative",top: 0, width: 700, display: "flex", flexDirection: "column"}}>
                      {monsters.map((mon => (
                        <TableCell>{mon}</TableCell>
                      )))}
                  </TableRow>
                </TableHead>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
    createData('Room 1'),
    createData('Room 2'),
    createData('Room 3'),
    createData('Room 4'),
    createData('Room 5'),
    createData('Room 6'),
    createData('Room 7'),
    createData('Room 8'),
    createData('Room 9'),
    createData('Room 10'),
    createData('Room 11'),
    createData('Room 12'),
  ];

function fillRooms(rooms: number[][][]) : string[] {
    let row: string[] = [];
    for (var i:number = 0; i < rooms.length; i++){
        row[i] = "Room: " + i;
    }
    return row;
}

const ROOM_SIZE = 10;
const MAP_ROOM_ROWS = 3;
const MAP_ROOM_COLS = 4;
const ENTRANCE_PROBABILITY= 0.7;
const ROOM_GROW_PROBABILITY = 0.42;

//todo double doors.
const DOUBLE_DOORS = false;

export default function map(props: mapProps) {
    const mapStyle = function (width: number, height: number) {
        return {
            position: "absolute",
            left: 0,
            top: 0,
            margin: 'auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(' + width + ',max-content)',
            gridTemplateRows: 'repeat(' + height + ',max-content)',
            gridGap: '0px'
        }
    }

    function getRooms():number[][][]{
        return ALL_ROOMS;
    }

    let ALL_ROOMS : number[][][] = []; // holds all the rooms making up the map in order.

    for (let row = 0; row < MAP_ROOM_ROWS; row++) { // push the total empty rooms needed to make the map.
        for (let col = 0; col < MAP_ROOM_COLS; col++) {
            ALL_ROOMS.push([]);
        }
    }

    // create a 2D array rows * cols filled with the value 10.
    let mapGrid = Array.from(Array(MAP_ROOM_ROWS * ROOM_SIZE), _ => Array(MAP_ROOM_COLS * ROOM_SIZE).fill(10));

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

        //todo change to allow multiple.
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
        ALL_ROOMS[currentRoomIndex] = roomGen(ROOM_SIZE, ROOM_SIZE, entrances, ROOM_GROW_PROBABILITY, true);

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
    for (let i = 0; i < ALL_ROOMS.length; i++){
        if (ALL_ROOMS[i].length == 0) generateRoom(i);
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
        let hasNorthGenerated = hasNorthNeighbour && ALL_ROOMS[i - MAP_ROOM_COLS].length != 0;
        let hasSouthGenerated = hasSouthNeighbour && ALL_ROOMS[i + MAP_ROOM_COLS].length != 0;
        let hasWestGenerated = hasWestNeighbour && ALL_ROOMS[i - 1].length != 0;
        let hasEastGenerated = hasEastNeighbour && ALL_ROOMS[i + 1].length != 0;

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
            ALL_ROOMS[i] = Array.from(Array(ROOM_SIZE), _ => Array(ROOM_SIZE).fill(0));
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

        ALL_ROOMS[i] = roomGen(ROOM_SIZE,ROOM_SIZE,roomEntrances,ROOM_GROW_PROBABILITY,true);
    }



    addRooms();
    let pixelDisplay = doPixelDisplay();

    /**
     * Iterates through all the rooms, finds their coordinates on the main map, and calls addRoom
     * to add them to the main map.
     */
    function addRooms() {
        for (let i = 0; i < ALL_ROOMS.length; i++) {
            if (ALL_ROOMS[i].length == 0){
                continue;
            }

            let room = ALL_ROOMS[i];

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
        let room = ALL_ROOMS[index]
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
        <div style={{position: "relative",top: 0, width: 1000, display: "flex", flexDirection: "row"}}>
        <div id="map" style={mapStyle(MAP_ROOM_COLS*ROOM_SIZE, MAP_ROOM_ROWS*ROOM_SIZE)}>
            {pixelDisplay}
        </div>
        <div style={{position: "relative",top: 0, left:1000, width: 800, display: "flex", flexDirection: "row"}}>
        <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Room</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
        </div>
        
    )

}

function mountNode(arg0: JSX.Element, mountNode: any) {
    throw new Error("Function not implemented.");
}

