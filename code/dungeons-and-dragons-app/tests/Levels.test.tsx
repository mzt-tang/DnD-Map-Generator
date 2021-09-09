import React from 'react';
import { getFirebaseMap } from '../components/Map';
import MapData from '../interfaces/MapData';
import DmView from '../pages/DmView';
import MapGen from '../utility/MapGen';

describe('<DungeonMaster />', () => {
    let levels: MapData[] = []
    
    /**
     * DM VIEW TESTS
     * NOT UI BASED, USES SAME LOGIC AS THE UI DOES
     */
    test('Levels Adding', () => {
        levels = []
        try {
            MapGen().then(
                value => {
                    levels.push(value)
                }
            )
            console.assert(levels.length > 0)
        }
        catch (error) {
            console.log('Level not added')
        }
    });

    test('Levels Previous', () => {
        levels = []
        let curMap : MapData
        MapGen().then(
            value => {
                levels.push(value)
                curMap = value
            }
        )
        MapGen().then(
            value => {
                levels.push(value)
                curMap = value
            }
        )
        MapGen().then(
            value => {
                levels.push(value)
                curMap = value
            }
        )
        let curNum = levels.length-1
        try {
            curNum = curNum-1
            curMap = levels[curNum]
            console.assert(curMap != levels[levels.length-1])
        }
        catch (error) {
            console.log('Could not go back')
        }
    });

    test('Levels Next', () => {
        levels = []
        let curMap : MapData
        MapGen().then(
            value => {
                levels.push(value)
                curMap = value
            }
        )
        MapGen().then(
            value => {
                levels.push(value)
                curMap = value
            }
        )
        MapGen().then(
            value => {
                levels.push(value)
                curMap = value
            }
        )
        let curNum = 0 // will be length in actual code, just need to test
        try {
            curNum = curNum + 1
            curMap = levels[curNum]
            console.assert(curMap != levels[0])
        }
        catch (error) {
            console.log('Could not go forward')
        }
    });

    test('Levels From Firebase', () => {
        levels = []
        try {
            levels = getFirebaseMap()
            console.assert(levels.length > 0)
        }
        catch (error) {
            console.log('Could not retrieve levels from firebase')
        }
    });

    test('Levels adding', () => {

    });
});