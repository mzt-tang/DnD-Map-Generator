/**
 * The RoomSegrigator
 * Uses the map to make areas into "room segments"
 * Should be a simple one...
 *
 * TODO:
 * + (initial) feed system, feed the map and set the rooms(?)
 * + Room storage on firebase? (talk to the others about this)
 */
import React from 'react';

/**
 * x and y is the starting offset (top left corner).
 * width and height is the amount
 */
interface roomArea {
    x: number;
    y: number;
    width: number;
    height: number;
}

/**
 * Use this for maps that are uniformly square...
 *
 * Returns an array of RoomAreas.
 * RoomArea has x and y coordinates for the top left offset, and a width and height variable for the area.
 *
 * NOTE: unit of measurement is in tile squares!
 * @param mapXSize The width of the entire map
 * @param mapYSize The height of the entire map
 * @param roomXSize The width of a single room
 * @param roomYSize The height of a single room.
 * @returns
 */
export default function roomSegrigator(mapXSize: number, mapYSize: number, roomXSize: number, roomYSize: number): roomArea[] {
    //List of Rooms
    let roomsArray: Array<roomArea> = [];

    const horizontalRoomCount = mapXSize / roomXSize;
    const verticalRoomCount = mapYSize / roomYSize;

    //for every room there is on the map...
    for (let col = 0; col < horizontalRoomCount; col + roomXSize) {
        for (let row = 0; row < verticalRoomCount; row + roomYSize) {
            let newRoom: roomArea = {
                x: col,
                y: row,
                width: roomXSize,
                height: roomYSize,
            }
            roomsArray.push(newRoom);
        }
    }

    return roomsArray;
};
