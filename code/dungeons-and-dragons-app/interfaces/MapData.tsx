interface MapData {
    map : number[][],      // the map tile elements.
    visibility : number[][],    // the map visibility where 0 = hidden, 1 = visible
    // The data structure of this goes [[room number, [[number of monsters, Goblins], [number of monsters, BugBear], []]], [], []]
    // So it contains a array of tuples of [room, list of monsters]
    // The list of monsters is an array of tuples [number of monsters, monster name]
    monsters : [number, [number, string][]][],
    roomRows : number,          // the number of rooms per row on the map
    roomCols : number,          // the number of rooms per column on the map
    roomSize : number,          // The size of each room eg 10x10
    roomNum : number,
    theme: string,         // the theme of the map
}

export default MapData

export interface Monster {
    faction: string,
    name: string,
    size: number,
    loneliness: number,
    friends: string[],
    commonality: number // The average amount of these monsters that appear on a map
}
