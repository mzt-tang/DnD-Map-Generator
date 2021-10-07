import {roomSize, mapRoomRows, mapRoomCols, height, width} from "./MapGen";

const numRoomsTotal = mapRoomRows * mapRoomCols;

/**
 * Returns an array of numbers, each index being a room and each number being the amount of tiles in that room
 * if the room is not spawned the number is 0.
 * @param map The map array as numbers
 */
export default function getRoomsInMapAsArray(map: number[][]) {
    const roomsArray: number[] = []
    for (let i = 0; i < numRoomsTotal; i++) {
        let room = 0;
        for (let j = 0; j < roomSize; j++) {
            const tile:number = i*roomSize+j;
            if (tile === 21) room++;
        }
        roomsArray.push(room);
    }
    return roomsArray;
}