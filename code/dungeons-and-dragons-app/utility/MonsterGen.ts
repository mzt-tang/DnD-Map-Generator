import firebase from 'firebase';
import 'firebase/firestore';

import {Monster} from "../interfaces/MapData";


//todo
// monster generating on level spawn and regenerating on new level
// monster generating only in rooms that exist
// the algorithm considers room size when allocating monsters
// formatting rooms in order and monsters are labeled with the number of those monsters instead of multiples of those monsters

export default async function monsterGeneration(level: number, map: number[][]): Promise<any> {
    //Get the monster preset document with the array of monster references from that co llection.
    const levelString = "level1";
    const monsterPresetRef = firebase.firestore().collection('monsterPresets').doc(levelString);

    await monsterPresetRef.get().then(async (snapshot) => {
        if (snapshot.exists) {
            console.log("Document data:", snapshot.data());
            const presetRef = snapshot.data();
            let monsterPreset: Monster[] = [];
            let set1 = presetRef?.set1; //todo temporary, to be switched to random set choosing later.

            for (let i = 0; i < set1.length; i++) {
                let monster = await set1[i].get(); //
                monsterPreset.push({
                    faction: monster.data()?.faction,
                    name: monster.data()?.name,
                    size: monster.data()?.size,
                    friends: monster.data()?.friends,
                    loneliness: monster.data()?.loneliness,
                    commonality: monster.data()?.commonality
                });
            }

            //Parse the generated monsters and put it through createData()
            const generatedMonsters = generateAllMonsters(monsterPreset);
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
                // console.log("Room " + generatedMonsters[i][0]);
                // console.log("Monsters: ", parsedMonsStrings);
                parsedMonsters.push([generatedMonsters[i][0], parsedMonsStrings]);
            }

            console.log("IT RETURNS")
            console.log(parsedMonsters)
            return parsedMonsters;

        } else {
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });

    /**
     * Randomly choose 2-3 monsters based on level difficulty
     * Look at the monsters' friends and add monsters by 'branching out' from the monsters in the set
     * Assign monsters to room
     * @param monsterPreset
     */
    function generateAllMonsters(monsterPreset: Monster[]) {
        const generatedMonsters: [string, number][] = [];

        //Generate monsters from set
        for (let i = 0; i < monsterPreset.length; i++) {
            let monster: Monster = monsterPreset[i];
            const lowerLimit: number = +monster.commonality - +Math.floor(+monster.commonality / +2);
            const upperLimit: number = +monster.commonality + +Math.floor(+monster.commonality / +2);
            const commonalityDeviation: number = getRandomInt(lowerLimit, upperLimit); //an operator to determine whether to add or minus from the commonality
            console.log("monster: " + monster.name);
            console.log("amount: " + commonalityDeviation);
            if (monster.name === "Kobold") {
                console.log(lowerLimit);
                console.log(upperLimit);
            }

            let pair: [string, number] = [monster.name, commonalityDeviation];
            generatedMonsters.push(pair);
        }

        console.log("total amount of monsters to be assigned: ", generatedMonsters);

        return assignMonstersToRooms(generatedMonsters, monsterPreset);
    }

    /**
     *
     * @param assignableMonsters A 2d array of that contains the monster id and number of those monsters,
     * like this [[id, number of monsters], [id, number of monsters]].
     * @param monsterPreset A matching list of monsters, but in monster interface form
     */
    function assignMonstersToRooms(assignableMonsters: [string, number][], monsterPreset: Monster[]) {
        //Notes
        //This only takes a set of monsters and assigns them to the rooms
        //Try to avoid spawning monsters at the start of the map
        let eligibleRooms = [1, 2, 3, 4, 5, 6, 7, 8, 12]; //todo temporary
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

        while (eligibleRooms.length > 0 && totalMonsterAmount(allMonsters) > 0) {
            // Randomly select a monster from the map
            // Randomly select a room
            const initialMonsterInt = getRandomInt(0, allMonsters.length - 1);
            const chosenRoomNumber = getRandomInt(0, eligibleRooms.length - 1);
            const chosenRoom = eligibleRooms[chosenRoomNumber];
            eligibleRooms.splice(chosenRoomNumber, 1);

            const roomAndMonsterList: [number, Monster[]] = [chosenRoom, [monsterPreset[initialMonsterInt]]]; // Push an initial random eligible monster first
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
                //console.log("eligible monsters: ", eligibleMonsters);

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
            finalMonsterAssignment.push(currentMonstersInRoom);
        }
        console.log("after algorithm: ", allMonsters);

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

}