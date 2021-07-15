import React from 'react';

export class Room {
    left: number
    top: number
    width: number
    height: number
    north: number[];
    south: number[];
    east: number[];
    west: number[];
    route: number;
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
    constructor(startLeft: number, startTop: number, width: number, height: number, northDoor: number[], southDoor: number[], eastDoor: number[], westDoor: number[], originalEntrance: String,route:number) {
        this.north = northDoor;
        this.south = southDoor;
        this.east = eastDoor;
        this.west = westDoor;
        this.left = startLeft;
        this.top = startTop;
        this.width = width;
        this.height = height;
        this.assignEntrances();
        this.entrance = originalEntrance
        this.route = route
    }

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