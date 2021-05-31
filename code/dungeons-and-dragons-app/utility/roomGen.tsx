const EMPTY = 0;
const ROOM_TILE = 1;
const ENTRANCE = 3;



/**
 * Generates a random room with a change to grow
 * @param rowSize the number of rows
 * @param colSize the number of columns
 * @param entrances the entrances (array of x,y coordinates eg [[1,3],[3,2]])
 * @param growProbability the probability that the room will grow (that is, it will be larger)
 * @return room The new room in array form.
 */
function roomGen(rowSize: number, colSize :number, entrances: number[][], growProbability: number) : number[][] {
    // preconditions: rowsize/colsize must be positive
    // grow probability(x) = 0 > x <= 1
    // at least one entrance
    // entrances are within the row/col size
    // if only single entrance, grow probability increased and decreases with distance.

    const singleEntrance = entrances.length == 1;
    // Start with array of 0's
    let room = Array.from(Array(rowSize), _ => Array(colSize).fill(0));


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

    // then move cols towards middle col
    for (let i = 0; i < entrances.length; i++){
        let entrance = entrances[i];
        let entranceRow = entrance[0];
        let entranceCol = entrance[1];

        // grow towards middle, whichever way that is.
        while (entranceCol < middleY){
            entranceCol++;
            room[entranceRow][entranceCol] = ROOM_TILE;
        }
        while (entranceCol > middleY){
            entranceCol--;
            room[entranceRow][entranceCol] = ROOM_TILE
        }
    }

    // entrances should be connected, grow tiles with probability depending on surrounding tiles.

    for (let i = 0; i < room.length; i++){
        console.log(room[i]);
    }
    return room;
}
