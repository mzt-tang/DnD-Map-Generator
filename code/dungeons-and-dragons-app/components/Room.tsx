export class Room {
    left: number
    top: number
    width: number
    height: number
    north: number[];
    south: number[];
    east: number[];
    west: number[];
    entrance: String
    routeRoom: number[][] = [
        [8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
        [8, 9, 9, 9, 9, 9, 9, 9, 9, 8],
        [8, 9, 9, 9, 9, 9, 9, 9, 9, 8],
        [8, 9, 9, 9, 9, 9, 9, 9, 9, 8],
        [8, 9, 9, 9, 5, 5, 9, 9, 9, 8],
        [8, 9, 9, 9, 5, 5, 9, 9, 9, 8],
        [8, 9, 9, 9, 9, 9, 9, 9, 9, 8],
        [8, 9, 9, 9, 9, 9, 9, 9, 9, 8],
        [8, 9, 9, 9, 9, 9, 9, 9, 9, 8],
        [8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
    ];

    rooms: number[][][] = [
        // Empty room
        [
            [8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
            [8, 9, 9, 9, 9, 9, 9, 9, 9, 8],
            [8, 9, 9, 9, 9, 9, 9, 9, 9, 8],
            [8, 9, 9, 9, 9, 9, 9, 9, 9, 8],
            [8, 9, 9, 9, 9, 9, 9, 9, 9, 8],
            [8, 9, 9, 9, 9, 9, 9, 9, 9, 8],
            [8, 9, 9, 9, 9, 9, 9, 9, 9, 8],
            [8, 9, 9, 9, 9, 9, 9, 9, 9, 8],
            [8, 9, 9, 9, 9, 9, 9, 9, 9, 8],
            [8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
        ],
        // Regular shaped room
        [
            [8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
            [8, 9, 9, 9, 9, 9, 9, 9, 9, 8],
            [8, 9, 9, 9, 9, 9, 9, 9, 9, 8],
            [8, 9, 9, 9, 9, 9, 9, 9, 9, 8],
            [8, 9, 9, 9, 5, 5, 9, 9, 9, 8],
            [8, 9, 9, 9, 5, 5, 9, 9, 9, 8],
            [8, 9, 9, 9, 9, 9, 9, 9, 9, 8],
            [8, 9, 9, 9, 9, 9, 9, 9, 9, 8],
            [8, 9, 9, 9, 9, 9, 9, 9, 9, 8],
            [8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
        ],
        // Cross shaped room
        [
            [8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
            [8, 8, 8, 8, 9, 9, 8, 8, 8, 8],
            [8, 8, 8, 8, 9, 9, 8, 8, 8, 8],
            [8, 8, 8, 8, 9, 9, 8, 8, 8, 8],
            [8, 9, 9, 9, 9, 9, 9, 9, 9, 8],
            [8, 9, 9, 9, 9, 9, 9, 9, 9, 8],
            [8, 8, 8, 8, 9, 9, 8, 8, 8, 8],
            [8, 8, 8, 8, 9, 9, 8, 8, 8, 8],
            [8, 8, 8, 8, 9, 9, 8, 8, 8, 8],
            [8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
        ],
        // Walled room
        [
            [8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
            [8, 5, 8, 9, 9, 9, 9, 8, 9, 8],
            [8, 9, 8, 9, 9, 9, 9, 9, 9, 8],
            [8, 9, 9, 9, 9, 8, 8, 8, 8, 8],
            [8, 9, 9, 8, 8, 8, 9, 9, 9, 8],
            [8, 9, 9, 9, 5, 5, 9, 9, 9, 8],
            [8, 9, 9, 9, 9, 9, 9, 9, 5, 8],
            [8, 5, 5, 9, 9, 9, 9, 9, 5, 8],
            [8, 5, 5, 9, 9, 9, 9, 5, 5, 8],
            [8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
        ],
        // X shaped room
        [
            [8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
            [8, 5, 9, 5, 9, 9, 5, 9, 5, 8],
            [8, 9, 5, 5, 9, 9, 5, 5, 9, 8],
            [8, 5, 5, 5, 9, 9, 5, 5, 5, 8],
            [8, 9, 9, 9, 9, 9, 9, 9, 9, 8],
            [8, 9, 9, 9, 9, 9, 9, 9, 9, 8],
            [8, 5, 5, 5, 9, 9, 5, 5, 5, 8],
            [8, 9, 5, 5, 9, 9, 5, 5, 9, 8],
            [8, 5, 9, 5, 9, 9, 5, 9, 5, 8],
            [8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
        ],
        // Random squares room
        [
            [8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
            [8, 5, 5, 9, 9, 9, 9, 5, 5, 8],
            [8, 5, 5, 9, 9, 9, 9, 5, 5, 8],
            [8, 9, 5, 5, 9, 9, 9, 9, 9, 8],
            [8, 9, 5, 5, 9, 5, 5, 9, 9, 8],
            [8, 9, 9, 9, 9, 5, 5, 9, 9, 8],
            [8, 9, 9, 9, 9, 9, 9, 9, 9, 8],
            [8, 5, 5, 9, 9, 9, 5, 5, 9, 8],
            [8, 5, 5, 9, 9, 9, 5, 5, 9, 8],
            [8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
        ],
        // Walled shaped room 2
        [
            [8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
            [8, 9, 9, 9, 9, 9, 9, 5, 5, 8],
            [8, 5, 5, 5, 5, 5, 9, 5, 5, 8],
            [8, 9, 9, 9, 9, 5, 9, 9, 9, 8],
            [8, 9, 9, 9, 9, 5, 5, 9, 9, 8],
            [8, 9, 8, 8, 9, 5, 5, 9, 9, 8],
            [8, 9, 8, 8, 9, 9, 9, 9, 9, 8],
            [8, 5, 5, 8, 9, 9, 8, 8, 8, 8],
            [8, 5, 5, 8, 9, 9, 8, 9, 9, 8],
            [8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
        ],
        // M shaped room
        [
            [8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
            [8, 5, 8, 9, 9, 9, 8, 5, 5, 8],
            [8, 9, 8, 9, 5, 5, 8, 9, 9, 8],
            [8, 9, 8, 9, 9, 9, 8, 9, 9, 8],
            [8, 9, 9, 9, 9, 9, 9, 9, 9, 8],
            [8, 9, 9, 9, 5, 5, 9, 9, 9, 8],
            [8, 9, 9, 8, 5, 5, 9, 8, 9, 8],
            [8, 5, 9, 8, 9, 9, 9, 8, 9, 8],
            [8, 5, 9, 8, 9, 9, 9, 8, 9, 8],
            [8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
        ]

    ];

    constructor(startLeft: number, startTop: number, width: number, height: number, northDoor: number[], southDoor: number[], eastDoor: number[], westDoor: number[], originalEntrance: String) {
        this.north = northDoor;
        this.south = southDoor;
        this.east = eastDoor;
        this.west = westDoor;
        this.left = startLeft;
        this.top = startTop;
        this.width = width;
        this.height = height;

        //Pick a random room from list for routeRoom
        this.routeRoom = this.rooms[Math.floor(Math.random()*this.rooms.length)];
        
        this.assignEntrances();
        this.entrance = originalEntrance
    }

    public addNorthEntrance(newEntrance:number[]) {
        this.north = [4,6];
        this.assignEntrances
    }
    public addSouthEntrance(newEntrance:number[]) {
        this.south = [4,6];
        this.assignEntrances
    }
    public addEastEntrance(newEntrance:number[]) {
        this.east = [4,6];
        this.assignEntrances
    }
    public addWestEntrance(newEntrance:number[]) {
        this.west = [4,6];
        this.assignEntrances
    }
    /*
    Replaces the tiles corresponding to the entrances with floor tiles.
    */
    private assignEntrances() {
        for (let i: number = this.north[0]; i < this.north[1]; i++) {
            this.routeRoom[0][i] = 9
        }
        for (let i = this.south[0]; i < this.south[1]; i++) {
            this.routeRoom[9][i] = 9
        }
        for (let i = this.east[0]; i < this.east[1]; i++) {
            this.routeRoom[i][9] = 9
        }
        for (let i = this.west[0]; i < this.west[1]; i++) {
            this.routeRoom[i][0] = 9
        }
    }
}
