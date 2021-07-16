import React from "react";
import {Room} from "./Room"

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
    let height: number = mapGrid.length+1;
    let width: number = mapGrid[0].length+1;

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
    let rooms: Room[] = [(new Room(0, 0, 10, 10, [0, 0], [0, 0], [0, 0], [0, 0],'NULL',2))]

    let roomX = 0;
    let roomY = 0;
    let roomIndex = 0;

    let exitX = 30
    let exitY = 20
    /* Generates the Path */
    while (roomX <= exitX && roomY <= exitY) {
        let origX = roomX;
        let origY = roomY;
        let southEntrance = [0,0]
        let eastEntrance = [0,0]
        let westEntrance = [0,0]
        let northEntrance = [0,0]
        let entrance = 'NULL'
        if(roomX != exitX && roomY != exitY) {
            if(Math.random() >= 0.5) {
                roomX += 10;
                eastEntrance = [4,6]
                entrance = 'EAST'
            } else {
                roomY += 10;
                southEntrance = [4,6]
                entrance = 'SOUTH'
            }
        } else {
            if(roomX == exitX && roomY == exitY) {
                roomY+=10;
            } else if(roomX == exitX) {
                roomY +=10;
                southEntrance = [4,6]
                entrance = 'SOUTH'
            } else {
                roomX +=10;
                eastEntrance = [4,6]
                entrance = 'EAST'
            }
        }
        switch(rooms[roomIndex].entrance) {
            case 'SOUTH':
                northEntrance = [4,6]
                break;
            case 'EAST':
                westEntrance = [4,6]
                break;
        }
        let roomToAdd:Room = new Room(origX,origY,origX+10,origY+10,northEntrance,southEntrance,eastEntrance,westEntrance,entrance,2)
        roomIndex++
        rooms.splice(roomIndex,0,roomToAdd)
    }
    for(let i = 0; i <rooms.length; i++) {
        let currentRoom:Room = rooms[i]
        addRoom(currentRoom.left,currentRoom.top,currentRoom.width,currentRoom.height,currentRoom.routeRoom)
    }
    for(let i = 0; i < mapGrid.length; i++) {
        for(let j = 0; j < mapGrid[i].length; j++) {
            if(mapGrid[i][j] == 10) {
                let south = [0,0]
                let north = [0,0]
                let east = [0,0]
                let west = [0,0]
                let rand = Math.random()



                let randRoom = new Room(j,i,j+10,i+10,north,south,east,west,'NULL',1)
                rooms.push(randRoom)
                addRoom(randRoom.left,randRoom.top,randRoom.width,randRoom.height,randRoom.routeRoom)
            }
        }
    }

    let pixelDisplay: JSX.Element[][] = []
    function makeImages() {
        mapGrid.forEach(function (e1: number[], index: number) {
            //  row
            let row: JSX.Element[] = []
            e1.forEach(function (e2: number, index2: number) {
                //  col
                // numbers should reference a tile in images
                const imagelink = props.images[e2]
                row.push(imagelink)
                console.log("e1 index:"+index+", e2 index:"+index2);
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
    }
    return (
        <div id="map" style={mapStyle(40, 25)}>

            {makeImages()}
            {pixelDisplay}
            {/* {text} */}
        </div>
    )
}
