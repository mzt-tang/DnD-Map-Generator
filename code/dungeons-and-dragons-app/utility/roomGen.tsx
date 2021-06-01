const EMPTY = 0;
const ROOM_TILE = 1;
const ENTRANCE = 2;



/**
 * Generates a random room with a change to grow
 * @param rowSize the number of rows
 * @param colSize the number of columns
 * @param entrances the entrances (array of x,y coordinates eg [[1,3],[3,2]])
 * @param growProbability the probability that the room will grow (that is, it will be larger)
 * @return room The new room in array form.
 */
export function roomGen(rowSize: number, colSize :number, entrances: number[][], growProbability: number) : number[][] {
    // preconditions: rowsize/colsize must be positive
    // grow probability(x) = 0 > x <= 1
    // at least one entrance
    // entrances are within the row/col size
    // if only single entrance, grow probability increased and decreases with distance.

    const singleEntrance = entrances.length == 1;
    // Start with array of 0's
    let room = Array.from(Array(rowSize), _ => Array(colSize).fill(EMPTY));


    // assign entrances

    for (let i = 0;i < entrances.length; i++){
     let row = entrances[i][0];
     let col = entrances[i][1];

     room[row][col] = ENTRANCE;
    }

    // figure out middle row and col if entrances > 1
    let middleX = 0;
    let middleY = 0;

    for (let i = 0; i < entrances.length; i++){
        middleX += entrances[i][0];
        middleY += entrances[i][1];
    }

    // we round to the nearest int using math.floor. This ensures it is within scope.
    middleX = Math.floor(middleX / entrances.length);
    middleY = Math.floor(middleY / entrances.length);

    // first move rows towards middle row
    for (let i = 0; i < entrances.length; i++){
        let entrance = entrances[i];
        let entranceRow = entrance[0];
        let entranceCol = entrance[1];

        // grow towards middle, whichever way that is.
        while (entranceRow < middleX){
            entranceRow++;
            room[entranceRow][entranceCol] = ROOM_TILE;
        }
        while (entranceRow > middleX){
            entranceRow--;
            room[entranceRow][entranceCol] = ROOM_TILE
        }
    }

    // ensure middle cols grow to size of rows bounds.
    let colMin = colSize;
    let colMax = 0;

    for (let i = 0; i < entrances.length; i++){
        let entrance = entrances[i];
        let entranceCol = entrance[1];
        colMin = Math.min(colMin,entranceCol);
        colMax = Math.max(colMax,entranceCol);
    }

    // grow cols to connect
    while (colMin < colMax){
        colMin++;
        room[middleX][colMin] = ROOM_TILE;
    }

    // entrances should be connected, grow tiles with probability depending on surrounding tiles.

    // find all tiles that have an adjacent floor tiles. The more floor tiles the higher change to become a floor tile.

    // array of x,y coords where empty tiles are.
    const emptyTiles : number[][] = [];

    // array of failed to grow tiles that we no longer grow from
    let doNotGrow : number[][] = [];

    // collect all empty tiles
    for (let i = 0; i < room.length; i++) {
        for (let j = 0; j < room[i].length; j++) {
            if (room[i][j] == EMPTY) {
                emptyTiles.push([i,j]);
            }
        }
    }

    // grow empty tiles
    for (let i = 0; i < emptyTiles.length; i++){
        const emptyTile = emptyTiles[i];
        const row = emptyTile[0];
        const col = emptyTile[1];
        const count = surroundingTiles(emptyTile,room);

        if (count >= 1 && Math.random() < growProbability){
            room[row][col] = ROOM_TILE;
        }
    }

    // experimental
    function surroundingTiles(tile : number[], room : number[][]) {
        const row = tile[0];
        const col = tile[1];
        let count = 0;
        // left
        if (col-1 >= 0){
            if (room[row][col-1] == ROOM_TILE) count++;
        }
        // right
        if (col+1 < room[0].length){
            if (room[row][col+1] == ROOM_TILE) count++;
        }
        // up
        if (row-1 >= 0){
            if (room[row-1][col] == ROOM_TILE) count++;
        }
        // down
        if (row+1 < room.length){
            if (room[row+1][col] == ROOM_TILE) count++;
        }
        return count;
    }




    return room;
}