import React from "react";
import { Room } from "./Room"

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
    function addRoom(startLeft: number, startTop: number, width: number, height: number, room: number[][]) {
        let roomLeft = 0;
        let roomTop = 0;
        for (let i = startTop; i < height; i++) {
            for (let j = startLeft; j < width; j++) {
                mapGrid[i][j] = room[roomTop][roomLeft];
                roomLeft++;
            }
            roomLeft = 0;
            roomTop++;
        }
    }
    /*
    The array of rooms in the map, includes a placeholder room (so that the entrance doesn't have a doorway to connect to). It is removed when the route is made.
    */
    let rooms: Room[] = [(new Room(0, 0, 10, 10, [0, 0], [0, 0], [0, 0], [0, 0], 'NULL'))]
    let roomX = 0;
    let roomY = 0;
    let roomIndex = 0;

    let exitX = 30
    let exitY = 20
    /*
    This while loop generates the rooms that follow the route from the start room to end room. Starting room is currently at top left position and end is at bottom
    right. Each time it randomly decides whether to generate a room to the right or downwards along the path (as long as the room isn't at the bottom or far right of
    the map). The room is then added to the map and to the rooms array. 
    */
    while (roomX <= exitX && roomY <= exitY) {
        let origX = roomX;
        let origY = roomY;
        let southEntrance = [0, 0]
        let eastEntrance = [0, 0]
        let westEntrance = [0, 0]
        let northEntrance = [0, 0]
        let entrance = 'NULL'
        // checks if room is not on the far left or bottom of map, if it is randomly decides to advance left or down
        if (roomX != exitX && roomY != exitY) {
            if (Math.random() >= 0.5) {
                roomX += 10;
                eastEntrance = [4, 6]
                entrance = 'EAST'
            } else {
                roomY += 10;
                southEntrance = [4, 6]
                entrance = 'SOUTH'
            }
        } else {
            // if the room is on the exit room position, then doesn't make a new entrance, increases roomY to stop the loop
            if (roomX == exitX && roomY == exitY) {
                roomY += 10;
            } else if (roomX == exitX) {
                roomY += 10;
                southEntrance = [4, 6]
                entrance = 'SOUTH'
            } else {
                roomX += 10;
                eastEntrance = [4, 6]
                entrance = 'EAST'
            }
        }
        // checks the whether the previous room is to the left or upwards, and makes a doorway
        switch (rooms[roomIndex].entrance) {
            case 'SOUTH':
                northEntrance = [4, 6]
                break;
            case 'EAST':
                westEntrance = [4, 6]
                break;
        }
        let roomToAdd: Room = new Room(origX, origY, origX + 10, origY + 10, northEntrance, southEntrance, eastEntrance, westEntrance, entrance)
        roomIndex++
        rooms.splice(roomIndex, 0, roomToAdd)
        addRoom(origX, origY, origX + 10, origY + 10, roomToAdd.routeRoom)
    }
    rooms.splice(0, 1)


    /*
    This for loop fills up the rest of the map with rooms.
    */
    for (let i = 0; i < mapGrid.length; i += 10) {
        for (let j = 0; j < mapGrid[i].length; j += 10) {
            if (mapGrid[i][j] == 10) {
                let randRoom = new Room(j, i, j + 10, i + 10, [0, 0], [0, 0], [0, 0], [0, 0], 'NULL')
                rooms.push(randRoom)
                addRoom(randRoom.left, randRoom.top, randRoom.width, randRoom.height, randRoom.routeRoom)
            }
        }
    }


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
        <div id="map" style={mapStyle(40, 25)}>
            {pixelDisplay}
        </div>
    )
}