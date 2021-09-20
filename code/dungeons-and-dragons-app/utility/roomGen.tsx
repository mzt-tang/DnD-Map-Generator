const EMPTY = 0;
const ROOM_TILE = 1;
const ENTRANCE = 2;

 export class RoomGenerationError extends Error {
    constructor(message : string) {
        super(message);
        this.name = "RoomGenerationError";
    }
};


/**
 * Generates a random room with a chance to grow
 *
 * @param rowSize the number of rows
 * @param colSize the number of columns
 * @param entrances the entrances (array of x,y coordinates eg [[0,3],[3,7]])
 * @param growProbability the probability that the room will grow (that is, it will be larger)
 * @param clean if you want the room to be cleaned of single tiles left after the grow function
 * @return room The new room in array form.
 */
export function roomGen(rowSize: number, colSize: number, entrances: number[][], growProbability: number, clean: boolean): number[][] {
    // preconditions: rowSize/colSize must be positive
    // grow probability(x) = 0 > x <= 1
    // at least one entrance
    // entrances are within the row/col size
    // if only single entrance, grow probability increased and decreases with distance.
    // no corner entrances

    const singleEntrance = entrances.length == 1;

    // Start with array of 0's
    let room = Array.from(Array(rowSize), _ => Array(colSize).fill(EMPTY));

    // assign entrances
    for (let i = 0; i < entrances.length; i++) {
        let row = entrances[i][0];
        let col = entrances[i][1];

        //Checks entrance isn't a corner entrance and is on the edge.
        let isCornerTile = (row == 0 || row == rowSize - 1) && (col == 0 || col == colSize - 1);
        if (!isCornerTile) throw new RoomGenerationError("Entrances cannot be corner tiles");
        if (checkEdgeTile(row,col)) throw new RoomGenerationError("Entrances must be edge tiles");

        room[row][col] = ENTRANCE;
    }

    if (singleEntrance){
        handleSingleEntrance()
    } else {
        // pick randomly from a selection of entrance connection methods here
        if (Math.random() > 0.5) {
            growRoomInwards();
        } else {
            growRoomEdgeWise();
        }
    }

    spreadRoomTiles();

    return room;

    /**
     * Places room tiles from the entrance to the middle of the room to allow the grow function to generate
     * more consistent rooms.
     */
    function handleSingleEntrance() {
        let row = entrances[0][0];
        let col = entrances[0][1];

        if (row == 0) {
            while (row < rowSize / 2) {
                row++;
                room[row][col] = ROOM_TILE;
            }
        } else if (row == room.length - 1) {
            while (row > rowSize / 2) {
                row--;
                room[row][col] = ROOM_TILE;
            }
        } else if (col == 0) {
            while (col < colSize / 2) {
                col++;
                room[row][col] = ROOM_TILE;
            }
        } else if (col == room[0].length - 1) {
            while (col > colSize / 2) {
                col--;
                room[row][col] = ROOM_TILE;
            }
        }
    }

    /**
     * Collects all the room tiles which connect the entrances and spreads with the probability passed to the room.
     */
    function spreadRoomTiles() {
        const roomTiles: number[][] = [];

        // collect all room tiles
        for (let i = 0; i < room.length; i++) {
            for (let j = 0; j < room[i].length; j++) {
                if (room[i][j] == ROOM_TILE) {
                    roomTiles.push([i, j]);
                }
            }
        }

        // spread from room tiles to empty tiles
        for (let i = 0; i < roomTiles.length; i++) {
            const row = roomTiles[i][0];
            const col = roomTiles[i][1];

            spread(row - 1, col);  // down
            spread(row, col + 1);  // right
            spread(row + 1, col); // up
            spread(row, col - 1); // left
        }

        if (clean) cleanFinish();
    }

    /**
     * A method to connect multiple entrances by joining them at the edges of the map instead of growing inwards.
     * Method takes the first entrance and randomly moves towards the next exit in either direction along the edge
     * until they are all connected.
     */
    function growRoomEdgeWise() {

        const numEntrances = entrances.length;

        //Get the first entrance room tile iteration
        let firstEntranceRow = IterateFirstRoomTile(entrances[0][0], entrances[0][1], false);
        let firstEntranceCol = IterateFirstRoomTile(entrances[0][0], entrances[0][1], true);

        //Iterate the other entrances' first tiles
        for (let i = 1; i < entrances.length; i++) {
            let entrance = entrances[i];
            IterateFirstRoomTile(entrance[0], entrance[1], false);
            IterateFirstRoomTile(entrance[0], entrance[1], true);
        }

        //If row edge, pick a direction = vertical. Else horizontal.
        if (firstEntranceRow == 1 || firstEntranceRow == rowSize - 2) {
            growHorizontal(firstEntranceRow, firstEntranceCol, (Math.random() < 0.5), 1, numEntrances);
        } else {
            growVertical(firstEntranceRow, firstEntranceCol, (Math.random() < 0.5), 1, numEntrances);
        }
    }

    /**
     * Grows vertically along the edge until it hits a wall while joining edges, then calls growHorizontal.
     * Will terminate if all edges are connected.
     *
     * @param row The row to grow vertically on.
     * @param col The col to grow vertically on.
     * @param isUp True if growing upwards, false otherwise.
     * @param coveredEntrances The number of entrances currently connected.
     * @param numEntrances The number of entrances needed to cover.
     */
    function growVertical(row: number, col: number, isUp: boolean, coveredEntrances: number, numEntrances: number) {
        if (isUp) {
            for (let i = row; i > 0; i--) {
                if (i != row && room[i][col] == ROOM_TILE) {
                    coveredEntrances++
                    if (coveredEntrances == numEntrances) {
                        return;
                    }
                }
                room[i][col] = ROOM_TILE;
            }

            growHorizontal(1, col, col != 1, coveredEntrances, numEntrances);
        } else {
            for (let i = row; i < rowSize - 1 ; i++) {
                if (i != row && room[i][col] == ROOM_TILE) {
                    coveredEntrances++
                    if (coveredEntrances == numEntrances) {
                        return;
                    }
                }
                room[i][col] = ROOM_TILE;
            }

            growHorizontal(rowSize - 2, col, col != 1, coveredEntrances, numEntrances);
        }
    }

    /**
     *
     * Grows horizontally along the edge until it hits a wall while joining edges, then calls growVertical.
     * Will terminate if all edges are connected.
     *
     * @param row The row to grow horizontally on.
     * @param col The col to grow horizontally on.
     * @param isLeft True if growing left, false otherwise.
     * @param coveredEntrances The number of entrances connected.
     * @param numEntrances The number of entrances to connect.
     */
    function growHorizontal(row: number, col: number, isLeft: boolean, coveredEntrances: number, numEntrances: number) {
        if (isLeft) {
            for (let i = col; i > 0; i--) {
                if (i != col && room[row][i] == ROOM_TILE) {
                    coveredEntrances++
                    if (coveredEntrances == numEntrances) {
                        return;
                    }
                }
                room[row][i] = ROOM_TILE;
            }

            growVertical(row, 1, row != 1, coveredEntrances, numEntrances);
        } else {
            for (let i = col; i < colSize - 1 ; i++) {
                if (i != col && room[row][i] == ROOM_TILE) {
                    coveredEntrances++
                    if (coveredEntrances == numEntrances) {
                        return;
                    }
                }
                room[row][i] = ROOM_TILE;
            }

            growVertical(row, colSize - 2, row != 1, coveredEntrances, numEntrances);
        }
    }

    /**
     * Ensures the tile opposite of the entrance becomes a room tile.
     *
     * @param entranceRow row of the entrance
     * @param entranceCol col of the entrance
     * @param isColumnEdge true if it is a col edge, false otherwise.
     */
    function IterateFirstRoomTile(entranceRow: number, entranceCol: number, isColumnEdge: boolean) : number {
        let enRow = entranceRow;
        let enCol = entranceCol;

        if (isColumnEdge) {
            //Checks if entrance is on column edge. If it is move it 1 over to avoid a edge path.
            if (enCol == 0) {
                enCol++;
                room[enRow][enCol] = ROOM_TILE;
            } else if (enCol == room[0].length - 1) {
                enCol--;
                room[enRow][enCol] = ROOM_TILE;
            }

            return enCol;
        } else {
            if (enRow == 0) {
                enRow++;
                room[enRow][enCol] = ROOM_TILE;
            } else if (enRow == room.length - 1) {
                enRow--;
                room[enRow][enCol] = ROOM_TILE;
            }

            return enRow;
        }
    }

    /**
     * This is for multiple entrances and grows inwards towards the middle to connect the entrances.
     */
    function growRoomInwards() {
        // figure out middle row and col if entrances > 1
        let middleX = 0;
        let middleY = 0;

        for (let i = 0; i < entrances.length; i++) {
            middleX += entrances[i][0];
            middleY += entrances[i][1];
        }

        // we round to the nearest int using math.floor. This ensures it is within scope.
        middleX = Math.floor(middleX / entrances.length);
        middleY = Math.floor(middleY / entrances.length);

        // first move rows towards middle row
        for (let i = 0; i < entrances.length; i++) {
            let entrance = entrances[i];
            let entranceRow = entrance[0];
            let entranceCol = IterateFirstRoomTile(entrance[0], entrance[1], true);

            // grow towards middle, whichever way that is.
            while (entranceRow < middleX) {
                entranceRow++;
                room[entranceRow][entranceCol] = ROOM_TILE;
            }
            while (entranceRow > middleX) {
                entranceRow--;
                room[entranceRow][entranceCol] = ROOM_TILE
            }
        }

        // ensure middle cols grow to size of rows bounds.
        let colMin = colSize - 1;
        let colMax = 0;

        for (let i = 0; i < entrances.length; i++) {
            let entrance = entrances[i];
            let entranceCol = entrance[1];
            colMin = Math.min(colMin, entranceCol);
            colMax = Math.max(colMax, entranceCol);
        }

        // grow cols to connect all entrances
        while (colMin < colMax - 1) {
            colMin++;
            room[middleX][colMin] = ROOM_TILE;
        }
    }

    /**
     * Recursively spreads the room tile at row,col to the surrounding empty tiles with a probability given into the
     * roomGen function.
     *
     * @param row the row to spread from
     * @param col the col to spread from
     */
    function spread(row: number, col: number) {
        // check bounds/conditions
        if (row >= 0 && row < room.length && col >= 0 && col < room[row].length && room[row][col] == EMPTY && !checkEdgeTile(row, col)) {
            // spread with probability
            if (Math.random() < growProbability) {
                room[row][col] = ROOM_TILE
                spread(row - 1, col);  // down
                spread(row, col + 1);  // right
                spread(row + 1, col); // up
                spread(row, col - 1); // left
            }
        }
    }

    /**
     * Looks at each tile in the final map to remove any single empty tiles with all adjacent room tiles to make the
     * map look cleaner.
     */
    function cleanFinish() {
        for (let row = 1; row < room.length - 1; row++) {
            for (let col = 1; col < room[row].length - 1; col++) {
                if (room[row][col] != EMPTY) continue;

                // check each surrounding tile for a room tile if it is empty
                let left = room[row][col - 1] == ROOM_TILE;
                let right = room[row][col + 1] == ROOM_TILE;
                let up = room[row - 1][col] == ROOM_TILE;
                let down = room[row + 1][col] == ROOM_TILE;

                // change to a room tile if all surrounding tiles are room tiles.
                if (left && right && up && down) room[row][col] = ROOM_TILE;
            }
        }
    }

    /**
     * Checks if the tile at row, col is an edge tile. Returns true if it is, false otherwise.
     *
     * @param row the row number
     * @param col the col number
     */
    function checkEdgeTile(row: number, col: number): boolean {
        return (((row == 0 || row == room.length - 1) && (col != 0 && col != room[0].length - 1))
            || ((col == 0 || col == room.length - 1) && (row != 0 && row != room[0].length - 1)));
    }
}
