
const EMPTY = 0;
const ROOM_TILE = 1;
const ENTRANCE = 2;


/**
 * Generates a random room with a change to grow
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

    //todo if we want to maintain the walls around the room we need to implement changes to the grow function and
    // disallow corner room entrances as this would break it. Also if we want entrances to NOT be room edge pieces or
    // if the room to be generated is not a perfect square this might break the generation algorithm.

    const singleEntrance = entrances.length == 1;

    //todo handle single entrances with simple/modified grow function

    // Start with array of 0's
    let room = Array.from(Array(rowSize), _ => Array(colSize).fill(EMPTY));


    // assign entrances
    for (let i = 0; i < entrances.length; i++) {
        let row = entrances[i][0];
        let col = entrances[i][1];

        //Checks entrance isn't a corner entrance and is on the edge.
        console.assert ((row == 0 || row == room.length-1) && (col == 0 || room[0].length), "Entrances can't be corner tiles!");
        console.assert(checkEdgeTile(row, col), "Entrances must be an edge tile!")

        room[row][col] = ENTRANCE;
    }

    //todo we could grow horizontally instead of vertically for more variation if we wanted
    // this would involve using the middleY value instead of the middleX value.

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
        let entranceCol = entrance[1];

        //Checks if entrance is on column edge. If it is move it 1 over to avoid a edge path.
        if (entranceCol == 0) {
            entranceCol++;
            room[entranceRow][entranceCol] = ROOM_TILE;
        } else if (entranceCol == room[0].length) {
            entranceCol--;
            room[entranceRow][entranceCol] = ROOM_TILE;
        }

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
    let colMin = colSize;
    let colMax = 0;

    for (let i = 0; i < entrances.length; i++) {
        let entrance = entrances[i];
        let entranceCol = entrance[1];
        colMin = Math.min(colMin, entranceCol);
        colMax = Math.max(colMax, entranceCol);
    }

    // grow cols to connect all entrances
    while (colMin < colMax) {
        colMin++;
        room[middleX][colMin] = ROOM_TILE;
    }

    // entrances should be connected, grow tiles with probability depending on surrounding tiles.

    // find all tiles that have an adjacent floor tiles. The more floor tiles the higher change to become a floor tile.

    // array of x,y coords where empty tiles are.


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

    return room;

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

                let left = room[row][col - 1] == ROOM_TILE;
                let right = room[row][col + 1] == ROOM_TILE;
                let up = room[row - 1][col] == ROOM_TILE;
                let down = room[row + 1][col] == ROOM_TILE;

                if (left && right && up && down) room[row][col] = ROOM_TILE;
            }
        }
    }

    function checkEdgeTile(row: number, col: number): boolean {
        return (((row == 0 || row == room.length-1) && (col != 0 && col != room[0].length-1))
            || ((col == 0 || col == room.length-1) && (row != 0 && row != room[0].length-1)));

        // This actually creates some interesting rooms
        // return (((row == 0 || row == room.length) && (col != 0 && col != room[0].length))
        //     || ((col == 0 || col == room.length) && (row != 0 && row != room[0].length)));
    }
}