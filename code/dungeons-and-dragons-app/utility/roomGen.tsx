const EMPTY = 0;
const ROOM_TILE = 1;



/**
 * Generates a random room with a change to grow
 * @param rowSize the number of rows
 * @param colSize the number of columns
 * @param entrances the entrances (array of x,y coordinates eg [[1,3],[3,2]])
 * @param growProbability the probability that the room will grow (that is, it will be larger)
 * @return room The new room in array form.
 */
function roomGen(rowSize: number, colSize :number, entrances: number[][], growProbability: number) : number[][] {
    //preconditions: rowsize/colsize must be positive
    // grow probability = 0 > x <= 1
    // at least one entrance
    // if only single entrance, grow probability increased and decreases with distance.

    const room = [rowSize][colSize]

    // figure out middle row and col

    // first move rows towards middle row

    // then move cols towards middle col

    // entrances should be connected, grow tiles with probability depending on surrounding tiles.


    return [[1],[2]]
}
