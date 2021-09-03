import firebase from 'firebase/app';
import 'firebase/firestore';

import {Monster} from "../interfaces/MapData";
import {createData} from "../components/Map";

export function monsterGeneration (){

    const monsterPresetRef = firebase.firestore().collection('monsterPresets');

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

    //Set of monsters
    //List of eligible
    //Storing the assigned monsters.

    let dummySet: string[] = ["100", "111", "222", "333", "555"]; // dummy set. This part should call to firebase
    // and grab a monster set based on the map level

    let generatedMonsters: string[][] = [[]];

    //Generate monsters from set
    for (let i = 0; i < dummySet.length; i++) {
        let monster: Monster = getMonsterById(dummySet[i]);
        let commonalityDeviation: number = getRandomInt(monster.commonality - Math.floor(monster.commonality/2),
            monster.commonality + Math.floor(monster.commonality/2)); //an operator to determine whether to add or minus from the commonality

        generatedMonsters.push([dummySet[i], commonalityDeviation + ""]);
    }

    assignMonstersToRooms(generatedMonsters);

    /**
     *
     * @param assignableMonsters A 2d array of that contains the monster id and number of those monsters,
     * like this [[id, number of monsters], [id, number of monsters]].
     */
    function assignMonstersToRooms(assignableMonsters: string[][]) {
        //Notes
        //This only takes a set of monsters and assigns them to the rooms
        //Try to avoid spawning monsters at the start of the map
        let eligibleRooms = []

        let totalMonsterAmount = (allMonsters: string[][]): number => {
            let total = 0;
            for (let i = 0; i < allMonsters.length; i++) {
                for (let j = 0; j < allMonsters[i].length; j++) {
                    total += parseInt(allMonsters[i][1]);
                }
            }
            return total;
        }

        while (eligibleRooms.length != 0 || totalMonsterAmount(assignableMonsters) != 0) {
            // Randomly select a monster from the map
            // Randomly select a room
            let chosenMonster = assignableMonsters[getRandomInt(0, assignableMonsters.length - 1)];
            let chosenRoom = getRandomInt(0, eligibleRooms.length - 1);
            let currentMonsInRoom: Monster[] = [getMonsterById(chosenMonster[0])]; // Push an initial random eligible monster first

            let combinedLoneliness = (monsterList: Monster[]): number => {
                let total = 0;
                for (let i = 0; i < monsterList.length; i++) {
                    total += monsterList[i].loneliness;
                }
                return total;
            }

            // A room isn't fully populated unless the number of monsters is
            // more than the average of the sum of the monsters' loneliness
            while (currentMonsInRoom.length >= (combinedLoneliness(currentMonsInRoom) / currentMonsInRoom.length)) {
                let eligibleMonsters: string[] = []

                // Iterate and filter through all the monsters that can be in the room.
                for (let i = 0; i < currentMonsInRoom.length; i++) {
                    let friends = currentMonsInRoom[i].friends;

                    for (let j = 0; j < friends.length; j++) {
                        let eligible: boolean = true;

                        for (let k = 0; k < currentMonsInRoom.length; k++) {
                            //if an enemy of another monster in the room, skip to the next friend
                            if (currentMonsInRoom[k].friends.indexOf(friends[j]) == -1) {
                                eligible = false;
                                break;
                            }
                        }

                        if (eligible) {
                            eligibleMonsters.push(friends[j]);
                        }
                    }
                }

                //Choose and add an eligible monster (given equal chance)
                currentMonsInRoom.push(getMonsterById(eligibleMonsters[getRandomInt(0, eligibleMonsters.length - 1)]));
                //todo This algorithm could be potentially more efficient
                // if it checks if the current monsters' types have increased
                // and if not then keep adding from the eligible monsters
                // todo assign monster to the actual room to the map data
            }

            // get chosen room and add/push currentMonsInRoom to it.
        }

        // populate the room
        // if number of monsters <= (the sum of all monsters' loneliness/number of monsters)
        //  iterate and filter all monster's friends
        //  give the filtered monster an equal chance to be chosen.
        //  add the chosen monster to the room

        return null;
    }

    /**
     * todo A temporary method that before we set up monster database, TO BE REPLACED
     * @param id
     */
    function getMonsterById(id: string): Monster {
        let someMonster: Monster = {faction: "Humanoid", name:"goblin", size: 1, friends:["111","112","151"],
            loneliness:6, commonality: 1}
        return someMonster;
    }

    function getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

}