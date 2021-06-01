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


    const roomTiles : number[][] = [];

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

        spread(row-1, col);  // down
        spread(row, col+1);  // right
        spread(row+1, col); // up
        spread(row, col-1); // left
    }

    function spread(row : number, col : number){
        // check bounds/conditions
        if (row >= 0 && row < room.length && col >= 0 && col < room[row].length && room[row][col] == EMPTY){

            // spread with probability
            if (Math.random() < growProbability){
                room[row][col] = ROOM_TILE
                spread(row-1, col);  // down
                spread(row, col+1);  // right
                spread(row+1, col); // up
                spread(row, col-1); // left
            }
        }
    }

    return room;
}