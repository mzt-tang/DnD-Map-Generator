import React from "react";
import {Room} from "./Room"
import {roomGen} from "../utility/roomGen"

interface mapProps {
    images: JSX.Element[]
}

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

    const ROOM_SIZE = 10;
    const MAP_ROWS = 3;
    const MAP_COLS = 4;
    const ENTRANCE_CHANCE = 0.5;


    let allRooms = []; // holds all the rooms making up the map in order.

    for (let row = 0; row < MAP_ROWS; row++) { // push the total empty rooms needed to make the map.
        for (let col = 0; col < MAP_COLS; col++) {
            allRooms.push([]);
        }
    }

    /*
    The blank map
    */
    let mapGrid: number[][] = [
        [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    ]

    let height: number = mapGrid.length + 1;
    let width: number = mapGrid[0].length + 1;


    /*
    A Function that adds the room 2d array to the map grid, going from startLeft to width, and startTop to height.
    */
    /**
     *
     * @param startLeft The col of the left most pixel
     * @param startTop The row of the top most pixel
     * @param room The room.
     */
    function addRoom(startLeft: number, startTop: number, room: number[][]) {
        let roomLeft = 0;
        let roomTop = 0;
        for (let i = startTop; i < ROOM_SIZE; i++) {
            for (let j = startLeft; j < ROOM_SIZE; j++) {
                mapGrid[i][j] = room[roomTop][roomLeft];
                roomLeft++;
            }
            roomLeft = 0;
            roomTop++;
        }
    }


    let previousRoomIndex = -1; // the previous room generated
    let nextRoomIndex = 0; // the next room to generate

    let row = 0;
    let col = 0;

    /*
    This while loop generates the rooms that follow the route from the start room to end room. Starting room is currently at top left position and end is at bottom
    right. Each time it randomly decides whether to generate a room to the right or downwards along the path (as long as the room isn't at the bottom or far right of
    the map). The room is then added to the map and to the rooms array.
    */
    while (col <= MAP_COLS && row <= MAP_ROWS) {
        let southEntrance: number[] = []
        let eastEntrance: number[] = []
        let westEntrance: number[] = []
        let northEntrance: number[] = []

        let entrances: number[][] = []

        if (previousRoomIndex == -1) { // this is the first room we are generating.
            // place first entrances in
            southEntrance.push(0, 4);
            eastEntrance.push(4, 0);
            westEntrance.push(4, 9);
            northEntrance.push(9, 4);

            previousRoomIndex = nextRoomIndex;
        } else {
            // figure out where previous entrances were.
            southEntrance.push(0, 4);
            eastEntrance.push(4, 0);
            westEntrance.push(4, 9);
            northEntrance.push(9, 4);

            previousRoomIndex = nextRoomIndex;
        }

        // figure out which row and col this room belongs to.
        let roomRow = nextRoomIndex / MAP_COLS;
        let roomCol = nextRoomIndex % MAP_COLS;

        if (roomRow > 0) {
            entrances.push(southEntrance)
        }
        if (roomRow < MAP_ROWS - 1) {
            entrances.push(northEntrance)
        }
        if (roomCol > 0) {
            entrances.push(eastEntrance)
        }
        if (roomCol < MAP_COLS - 1) {
            entrances.push(westEntrance)
        }

        // Generate the room and add it to allRooms.
        allRooms[nextRoomIndex] = roomGen(ROOM_SIZE, ROOM_SIZE, entrances, 0.4, true);

        // calculate the next room to make.
        if (row < MAP_ROWS - 1 && col < MAP_COLS - 1) {
            // can grow south or east
            if (Math.random() < 0.5) {
                // grow south
                nextRoomIndex = nextRoomIndex + MAP_COLS
                row++;
            } else {
                // grow east
                nextRoomIndex = nextRoomIndex + 1;
                col++;
            }
        } else if (row < MAP_ROWS - 1) {
            // must grow south
            nextRoomIndex = nextRoomIndex + MAP_COLS
            row++;
        } else if (col < MAP_COLS - 1) {
            // must grow east
            nextRoomIndex = nextRoomIndex + 1;
            col++;
        } else {
            // no further places we can travel.
            break;
        }
    }

    // iterate through rooms and add them to the map.
    for (let i = 0; i < allRooms.length; i++) {
        if (allRooms[i].length == 0){
            continue;
        }

        let room = allRooms[i];
        let roomRow = i / MAP_COLS;
        let roomCol = i % MAP_COLS;

        let left = roomCol * ROOM_SIZE;
        let top = roomRow * ROOM_SIZE;

        addRoom(left, top,room);
    }


    // /*
    // This for loop fills up the rest of the map with rooms.
    // */
    // for (let row = 0; row < mapGrid.length; row += 10) {
    //     for (let col = 0; col < mapGrid[row].length; col += 10) {
    //         if (mapGrid[row][col] == 10) { // checks if it is an empty square
    //
    //             let entrances:number[][] = []
    //
    //             let southEntrance = [0,4];
    //             let eastEntrance = [4,0];
    //             let westEntrance = [4,9];
    //             let northEntrance = [9,4];
    //
    //             if(row > 0) { // if not on the top
    //                 entrances.splice(0,0,southEntrance)
    //             }
    //             if(row < 20) { // if not on the bottom
    //                 entrances.splice(0,0,northEntrance)
    //             }
    //             if(col > 0) { // if not on the left
    //                 entrances.splice(0,0,eastEntrance)
    //             }
    //             if(col < 30) { // if not on the right
    //                 entrances.splice(0,0,westEntrance)
    //             }
    //
    //             let randRoom = new Room(col, row, col + 10, row + 10, entrances, 'NULL')
    //             rooms.push(randRoom)
    //
    //             let r = roomGen(ROOM_SIZE, ROOM_SIZE, entrances, 0.4, true);
    //
    //             addRoom(randRoom.left, randRoom.top, randRoom.width, randRoom.height, r)
    //         }
    //     }
    // }


    /*
    Assigns the numbers in mapGrid to the tiles from the images array. This generates the array that will be displayed
    */
    let pixelDisplay: JSX.Element[][] = []
    mapGrid.forEach(function (e1: number[], index: number) {
        //  row
        let row: JSX.Element[] = []
        e1.forEach(function (e2: number, index2: number) {
            //  col
            // numbers should reference a tile in images
            const imagelink = props.images[e2]
            row.push(imagelink)
            console.log("e1 index:" + index + ", e2 index:" + index2);
        })
        pixelDisplay.push(row)
    })

    /*for (let i: number = 0; i < width; i++) {
        //  row
        let row: JSX.Element[] = []
        for (let j: number = 0; j < height; j++) {
            //  col
            // numbers should reference a tile in images
            let num = mapGrid[i][j];
            let imagelink = props.images[num]
            if (num == 0) {

                if (i == 0 || j == 0 || i == width - 1 || j == height - 1) {
                    imagelink = props.images[12]
                }

                if (i > 0 && j > 0 && i < width - 1 && j < height - 1) {
                    // Need to check tiles left, right, above, below, above left, above right, below left, below right

                    // Checks for tiles in the corners, if there is one floor tile in one corner only
                    // Check for three tiles, in a corner formation around the current tile
                    if (mapGrid[i - 1][j] == 1 && mapGrid[i - 1][j - 1] == 1 && mapGrid[i][j - 1] == 1) {
                        imagelink = props.images[3]
                    } else if (mapGrid[i - 1][j] == 1 && mapGrid[i - 1][j + 1] == 1 && mapGrid[i][j + 1] == 1) {
                        imagelink = props.images[6]
                    } else if (mapGrid[i + 1][j] == 1 && mapGrid[i + 1][j - 1] == 1 && mapGrid[i][j - 1] == 1) {
                        imagelink = props.images[4]
                    } else if (mapGrid[i + 1][j] == 1 && mapGrid[i + 1][j + 1] == 1 && mapGrid[i][j + 1] == 1) {
                        imagelink = props.images[5]
                    }// Checks for if there are floor tiles adjacent to the current tile
                    else if (mapGrid[i - 1][j] == 1) {
                        imagelink = props.images[8]
                    } else if (mapGrid[i + 1][j] == 1) {
                        imagelink = props.images[7]
                    } else if (mapGrid[i][j - 1] == 1) {
                        imagelink = props.images[9]
                    } else if (mapGrid[i][j + 1] == 1) {
                        imagelink = props.images[10]
                    } else if (mapGrid[i - 1][j - 1] == 1 && mapGrid[i - 1][j] == 0 && mapGrid[i - 1][j + 1] == 0 && mapGrid[i][j - 1] == 0 && mapGrid[i][j + 1] == 0 && mapGrid[i + 1][j - 1] == 0 && mapGrid[i + 1][j + 1] == 0) {
                        imagelink = props.images[5]
                    } else if (mapGrid[i + 1][j - 1] == 1 && mapGrid[i - 1][j] == 0 && mapGrid[i - 1][j + 1] == 0 && mapGrid[i][j - 1] == 0 && mapGrid[i][j + 1] == 0 && mapGrid[i - 1][j - 1] == 0 && mapGrid[i + 1][j + 1] == 0) {
                        imagelink = props.images[6]
                    } else if (mapGrid[i - 1][j + 1] == 1 && mapGrid[i - 1][j] == 0 && mapGrid[i - 1][j - 1] == 0 && mapGrid[i][j - 1] == 0 && mapGrid[i][j + 1] == 0 && mapGrid[i + 1][j - 1] == 0 && mapGrid[i + 1][j + 1] == 0) {
                        imagelink = props.images[4]
                    } else if (mapGrid[i + 1][j + 1] == 1 && mapGrid[i - 1][j] == 0 && mapGrid[i - 1][j + 1] == 0 && mapGrid[i][j - 1] == 0 && mapGrid[i][j + 1] == 0 && mapGrid[i + 1][j - 1] == 0 && mapGrid[i - 1][j - 1] == 0) {
                        imagelink = props.images[3]
                    } else {
                        let countCorners = 0;
                        if (mapGrid[i - 1][j - 1] == 1) {
                            countCorners++;
                        }
                        if (mapGrid[i + 1][j - 1] == 1) {
                            countCorners++;
                        }
                        if (mapGrid[i - 1][j + 1] == 1) {
                            countCorners++;
                        }
                        if (mapGrid[i + 1][j + 1] == 1) {
                            countCorners++;
                        }

                        if (countCorners > 0) {
                            imagelink = props.images[11]
                        }
                    }

                    // Check and count how many corner tiles there are around the current tile, if there are more than two,
                    // and none of the other conditions are met, put in another tile type.

                }
            }
            row.push(imagelink)
        }
        pixelDisplay.push(row)

    }*/

    return (
        <div id="map" style={mapStyle(40, 30)}>
            {pixelDisplay}
        </div>
    )
}

