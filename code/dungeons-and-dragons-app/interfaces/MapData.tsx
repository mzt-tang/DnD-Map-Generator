interface MapData {
    map : JSX.Element[][],      // the map tile elements.
    visibility : number[][],    // the map visibility where 0 = hidden, 1 = visible
    monsters : string[],        // the monsters in each room.
    roomRows : number,          // the number of rooms per row on the map
    roomCols : number,          // the number of rooms per column on the map
    roomSize : number           // The size of each room eg 10x10
}

export default MapData

export interface Monster {
    id: number
    name: string
    stats: string[][]
    loneliness: number
    friends: number[]
    enemies: number[]
}