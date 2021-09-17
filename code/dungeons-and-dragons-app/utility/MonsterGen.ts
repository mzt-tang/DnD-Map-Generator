import firebase from 'firebase/app';
import 'firebase/firestore';

import {Monster} from "../interfaces/MapData";
import {createData} from "../components/Map";
import {roomRows} from "../components/Map";

export default function monsterGeneration (level: string, rowr: roomRows[]){
    const monsterPresetRef = firebase.firestore().collection('monsterPresets').doc(level);

    monsterPresetRef.get().then(async (snapshot) => {
        if (snapshot.exists) {
            console.log("Document data:", snapshot.data());
            const presetRef = snapshot.data();
            let monsterPreset: Monster[] = [];
            let set1 = presetRef?.set1; //todo temporary, to be switched to random choosing later.
            let len = set1.length;

            for (let i = 0; i < len; i++) {
                let monster = await set1[i].get(); //
                monsterPreset.push({
                    faction: monster.data()?.faction, name: monster.data()?.name, size: monster.data()?.size, friends: monster.data()?.friends,
                    loneliness: monster.data()?.loneliness, commonality: monster.data()?.commonality});
            }

            //Parse the generated monsters and put it through createData()
            console.log("PLACEMARKER");
            console.log(monsterPreset);
            const genedMonsters = generateAllMonsters(monsterPreset);
            for (let i = 0; i <genedMonsters.length; i++) {
                const parsedMonsStrings:string[] = [];
                for (let j = 1; j < genedMonsters[i].length; j++) {
                    parsedMonsStrings.push((genedMonsters[i][j] as Monster).name);
                }
                // console.log(genedMonsters[i][0]);
                // console.log(parsedMonsStrings);
                rowr.push(createData("Room " + genedMonsters[i][0], parsedMonsStrings));
            }
            console.log("TEST");

        } else {
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });

    function generateAllMonsters(monsterPreset: Monster[]) {
        // Options:
        // 1. - doing this one
        // Create pre determined sets of monsters to be in a group together
        // Choose a random monster set based on level of difficulty
        // Randomly generate monsters from that set
        // Assign monsters to rooms

        // 2.
        // Randomly choose 2-3 monsters based on level difficulty
        // Look at the monsters' friends and add monsters by 'branching out' from the monsters in the set
        // Assign monsters to room

        let generatedMonsters: (string|number)[][] = []; // Data structure [[], [], []]

        //Generate monsters from set
        for (let i = 0; i < monsterPreset.length; i++) {
            let monster: Monster = monsterPreset[i];
            let commonalityDeviation: number = getRandomInt(monster.commonality - Math.floor(monster.commonality / 2),
                monster.commonality + Math.floor(monster.commonality / 2)); //an operator to determine whether to add or minus from the commonality
            console.log("common " + commonalityDeviation);
            generatedMonsters.push([monsterPreset[i].name, commonalityDeviation]);
        }
        console.log("HERE");
        console.log(generatedMonsters);

        return assignMonstersToRooms(generatedMonsters, monsterPreset);
    }

    /**
     *
     * @param assignableMonsters A 2d array of that contains the monster id and number of those monsters,
     * like this [[id, number of monsters], [id, number of monsters]].
     * @param monsterPreset A matching list of monsters, but in monster interface form
     */
    function assignMonstersToRooms(assignableMonsters: (string|number)[][], monsterPreset: Monster[]) {
        //Notes
        //This only takes a set of monsters and assigns them to the rooms
        //Try to avoid spawning monsters at the start of the map
        let eligibleRooms = []
        let assignedMonsters: (number|Monster)[][] = []; //data structure of assigned monsters: [[room number, monster1, monster2, monster3, ...], [], []]

        let totalMonsterAmount = (allMonsters: (string|number)[][]): number => {
            let total = 0;
            for (let i = 0; i < allMonsters.length; i++) {
                total += allMonsters[i][1] as number; // type-casting the second number.
            }
            return total;
        }

        while (eligibleRooms.length != 0 || totalMonsterAmount(assignableMonsters) != 0) {
            // Randomly select a monster from the map
            // Randomly select a room
            let initialMonsterInt = getRandomInt(0, assignableMonsters.length - 1);
            let chosenRoom = getRandomInt(0, eligibleRooms.length - 1);
            let currentMonsInRoom: (number|Monster)[] = [chosenRoom, monsterPreset[initialMonsterInt]]; // Push an initial random eligible monster first
            assignableMonsters[initialMonsterInt][1] = (assignableMonsters[initialMonsterInt][1] as number) - 1;

            let combinedLoneliness = (monsterList: (number|Monster)[]): number => {
                let total = 0;
                for (let i = 1; i < monsterList.length; i++) {
                    total += (monsterList[i] as Monster).loneliness;
                }
                return total;
            }

            // A room isn't fully populated unless the number of monsters is
            // more than the average of the sum of the monsters' loneliness
            while (currentMonsInRoom.length-1 >= (combinedLoneliness(currentMonsInRoom) / (currentMonsInRoom.length-1))) {
                let eligibleMonsters: Monster[] = [];

                // Iterate and filter through all the monsters that can be in the room.
                //for all of the monsters in the monster set
                //if it doesn't exist in all of the existing monsters' friend list
                //skip to next eligible monster
                //else add as eligible
                for (let i = 0; i < monsterPreset.length; i++) {
                    let eligible: boolean = true;

                    for (let j = 1; j < currentMonsInRoom.length; j++) {
                        if (!(currentMonsInRoom[i] as Monster).friends.includes(assignableMonsters[i][0] as string)) {
                            eligible = false;
                            break;
                        }
                    }
                    if (eligible) {
                        eligibleMonsters.push(monsterPreset[i]);
                    }
                }

                //Choose and add an eligible monster (given equal chance)
                let chosenMonsterInt: number = getRandomInt(0, eligibleMonsters.length - 1);
                currentMonsInRoom.push(eligibleMonsters[chosenMonsterInt]);
                //Remove monster from assignable monsters
                for (let i = 0; i < assignableMonsters.length; i++) {
                    if (assignableMonsters[i][0] as string === eligibleMonsters[chosenMonsterInt].name) {
                        assignableMonsters[i][1] = assignableMonsters[i][1] as number - 1;
                        break;
                    }
                }

                //todo This algorithm could be potentially more efficient
                // if it checks if the current monsters' types have increased
                // and if not then keep adding from the eligible monsters
                // todo assign monster to the actual room to the map data
            }

            assignedMonsters.push(currentMonsInRoom);
        }

        // populate the room
        // if number of monsters <= (the sum of all monsters' loneliness/number of monsters)
        //  iterate and filter all monster's friends
        //  give the filtered monster an equal chance to be chosen.
        //  add the chosen monster to the room

        return assignedMonsters;
    }

    function getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

}