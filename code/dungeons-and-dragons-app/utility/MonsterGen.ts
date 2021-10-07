import firebase from 'firebase';
import 'firebase/firestore';

import {Monster} from "../interfaces/MapData";

export default async function monsterGeneration(level: number, map: number[][], mapRoomRows: number, mapRoomCols: number, roomSize: number): Promise<[number, [number, string][]][]> {
    //Get the monster preset document with the array of monster references from that collection.
    const levelString = "level1";
    const monsterPresetRef = firebase.firestore().collection('monsterPresets').doc(levelString);

    return await monsterPresetRef.get().then(async (snapshot) => {
        if (snapshot.exists) {

            const presetRef = snapshot.data();
            let monsterPreset: Monster[] = [];
            let set1 = presetRef?.set1;

            for (let i = 0; i < set1.length; i++) {
                let monster = await set1[i].get(); //
                const monsterData = monster.data();
                monsterPreset.push({
                    faction: monsterData.faction,
                    name: monsterData.name,
                    size: monsterData.size,
                    friends: monsterData.friends,
                    loneliness: monsterData.loneliness,
                    commonality: monsterData.commonality
                });
            }

            const eligibleRooms: number[] = getRoomsInMapAsArray(map, mapRoomRows, mapRoomCols, roomSize); // the rooms that are available to spawn in

            //Parse the generated monsters and put it through createData()
            const generatedMonsters = generateAllMonsters(monsterPreset, eligibleRooms);
            const parsedMonsters: [number, [number, string][]][] = [];

            for (let i = 0; i < generatedMonsters.length; i++) {
                const parsedMonsStrings: [number, string][] = [];
                outer:
                    for (let j = 0; j < generatedMonsters[i][1].length; j++) {
                        // checks if it already exists
                        for (let k = 0; k < parsedMonsStrings.length; k++) {
                            //If it exists, increment by 1 and continue
                            if (parsedMonsStrings[k][1] == generatedMonsters[i][1][j].name) {
                                parsedMonsStrings[k][0] = parsedMonsStrings[k][0] + 1;
                                continue outer;
                            }
                        }

                        parsedMonsStrings.push([1, generatedMonsters[i][1][j].name]); //push if it doesn't exist
                    }

                parsedMonsters.push([generatedMonsters[i][0] + 1, parsedMonsStrings]);
            }

            parsedMonsters.sort((r1,r2) => {
                return r1[0] - r2[0];
            })

            return parsedMonsters;

        } else {
            console.log("No such document!");
            return [];
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
        return [];
    });

}

/**
 * Randomly choose 2-3 monsters based on level difficulty
 * Look at the monsters' friends and add monsters by 'branching out' from the monsters in the set
 * Assign monsters to room
 * @param monsterPreset The monsters that set to be spawned.
 * @param eligibleRooms The eligible rooms to be spawned in.
 */
function generateAllMonsters(monsterPreset: Monster[], eligibleRooms: number[]) {
    const generatedMonsters: [string, number][] = [];

    //Generate monsters from set
    for (let i = 0; i < monsterPreset.length; i++) {
        let monster: Monster = monsterPreset[i];
        const lowerLimit: number = +monster.commonality - +Math.floor(+monster.commonality / +2);
        const upperLimit: number = +monster.commonality + +Math.floor(+monster.commonality / +2);
        const commonalityDeviation: number = getRandomInt(lowerLimit, upperLimit); //an operator to determine whether to add or minus from the commonality

        let pair: [string, number] = [monster.name, commonalityDeviation];
        generatedMonsters.push(pair);
    }

    return assignMonstersToRooms(generatedMonsters, monsterPreset, eligibleRooms);
}

/**
 *
 * @param assignableMonsters A 2d array of that contains the monster id and number of those monsters,
 * like this [[id, number of monsters], [id, number of monsters]].
 * @param monsterPreset A matching list of monsters, but in monster interface form
 * @param eligibleRooms The eligible rooms to be spawned in.
 */
function assignMonstersToRooms(assignableMonsters: [string, number][], monsterPreset: Monster[], eligibleRooms: number[]) {
    //Notes
    //This only takes a set of monsters and assigns them to the rooms
    //Try to avoid spawning monsters at the start of the map
    const allMonsters: [string, number][] = [];
    assignableMonsters.forEach(value => allMonsters.push(Object.assign({}, value)));

    let finalMonsterAssignment: [number, Monster[]][] = []; //data structure of assigned monsters: [[room number, [monster1, monster2, monster3]], [], []]

    //A function to calculate the total amount of monsters which need to be assigned.
    let totalMonsterAmount = (allMonsters: [string, number][]): number => {
        let total = 0;
        for (let i = 0; i < allMonsters.length; i++) {
            total += allMonsters[i][1];
        }
        return total;
    }

    let totalRoomCount = (allRooms: number[]) : number => {
        let total = 0;
        for (let i = 0; i < allRooms.length; i++) {
            if (allRooms[i] != 0) {
                total += 1;
            }
        }
        return total;
    }

    while (totalRoomCount(eligibleRooms) > 0 && totalMonsterAmount(allMonsters) > 0) {
        // Randomly select a monster from the map
        // Randomly select a room
        const initialMonsterInt = getRandomInt(0, allMonsters.length - 1);
        let chosenRoomNumber = -1;
        while (chosenRoomNumber === -1 || eligibleRooms[chosenRoomNumber] === 0) {
            chosenRoomNumber = getRandomInt(0, eligibleRooms.length - 1);
        }

        const roomTileNum = eligibleRooms[chosenRoomNumber];

        const roomAndMonsterList: [number, Monster[]] = [chosenRoomNumber, [monsterPreset[initialMonsterInt]]]; // Push an initial random eligible monster first
        allMonsters[initialMonsterInt][1]--;

        const currentMonstersInRoom: [number, Monster[]] = roomAndMonsterList;

        // A room isn't fully populated unless the number of monsters is
        // more than the average of the sum of the monsters' loneliness
        while (currentMonstersInRoom[1].length < (totalLoneliness(currentMonstersInRoom) / currentMonstersInRoom[1].length)) {
            const eligibleMonsters: Monster[] = [];

            // Iterate and filter through all the monsters that can be in the room.
            //for all of the monsters in the monster set
            //if it doesn't exist in all of the existing monsters' friend list
            //skip to next eligible monster
            //else add as eligible
            for (let i = 0; i < allMonsters.length; i++) {
                if (allMonsters[i][1] < 1) {
                    continue;
                }

                let eligible: boolean = true;

                for (let j = 0; j < currentMonstersInRoom[1].length; j++) {


                    if (!currentMonstersInRoom[1][j].friends.includes(allMonsters[i][0])) {
                        eligible = false;
                        break;
                    }
                }

                if (eligible) {
                    const eligibleMon = getMonsterByName(allMonsters[i][0], monsterPreset);
                    if (eligibleMon == null) {
                        console.error("Monster in all monsters not from chosen monster preset"); // throw error
                    } else {
                        eligibleMonsters.push(monsterPreset[i]);
                    }
                }
            }

            if (eligibleMonsters.length === 0) {
                break;
            }

            //Choose and add an eligible monster (given equal chance)
            const chosenMonster: Monster = eligibleMonsters[getRandomInt(0, eligibleMonsters.length - 1)];
            currentMonstersInRoom[1].push(chosenMonster);

            //Remove monster from assignable monsters
            for (let i = 0; i < allMonsters.length; i++) {
                if (allMonsters[i][0] === chosenMonster.name) {
                    allMonsters[i][1]--;
                    break;
                }
            }
        }
        eligibleRooms[chosenRoomNumber] = 0;
        finalMonsterAssignment.push(currentMonstersInRoom);
    }

    // populate the room
    // if number of monsters <= (the sum of all monsters' loneliness/number of monsters)
    //  iterate and filter all monster's friends
    //  give the filtered monster an equal chance to be chosen.
    //  add the chosen monster to the room

    return finalMonsterAssignment;
}

/**
 * Returns a monster object by its name string from the monster preset. Returns null if not found.
 * @param monsterName
 * @param monsterPreset
 */
function getMonsterByName(monsterName: string, monsterPreset: Monster[]): Monster | null {
    for (let i = 0; i < monsterPreset.length; i++) {
        if (monsterPreset[i].name === monsterName) {
            return monsterPreset[i];
        }
    }
    return null;
}

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function totalLoneliness(currentMonstersInRoom: [number, Monster[]]): number {
    let total: number = 0;
    for (let i = 0; i < currentMonstersInRoom[1].length; i++) {
        const loneliness: number = +currentMonstersInRoom[1][i].loneliness;
        total = +total + +loneliness;
    }
    return total;
}

/**
 * Returns an array of numbers, each index being a room and each number being the amount of tiles in that room
 * if the room is not spawned the number is 0.
 * @param map The map array as numbers
 * @param mapRoomRows
 * @param mapRoomCols
 * @param roomSize The size of each room (square so length * length)
 */
function getRoomsInMapAsArray(map: number[][], mapRoomRows: number, mapRoomCols: number, roomSize: number): number[] {
    const roomsArray: number[] = new Array(mapRoomRows*mapRoomCols).fill(0);

    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[row].length; col++) {
            if (map[row][col] === 21) {
                const roomCol: number = Math.floor(row / roomSize);
                const roomRow: number = Math.floor( col / roomSize);
                roomsArray[(roomRow*mapRoomRows + roomCol)]++;
            }
        }
    }

    return roomsArray;
}