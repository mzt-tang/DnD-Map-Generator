// This is template code for testing using jest for the CI part of CI/CD
// The guide im following is: https://docs.expo.io/guides/testing-with-jest/

// To install the jest test library: "yarn add jest-expo" or "npm install jest-expo"
// To run all tests: "npx jest --ci"

import { isJSXFragment } from '@babel/types';
import React from 'react';

import { assignImageNumbers } from "../utility/MapTilerHelper";


describe('<MapTilerHelper />', () => {

    /**
     * MAP TILER TEST 1
     */
    test('Test tiles successful 1', () => {
        const expectedOutput: number[][] = [
            [21,21,21,21,21,21,21],
            [21,9,4,4,4,8,21],
            [21,3,20,20,20,2,21],
            [21,7,5,5,5,6,21],
            [21,21,21,21,21,21,21],
        ];

        const input: number[][] = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const output = assignImageNumbers(input);
        console.assert(testHelper(expectedOutput, output));
        if(!testHelper(expectedOutput, output)) {
            console.log("Tiles test 1 failed");
            console.log("output: " + output);
            console.log("expectedOutput: " + expectedOutput);
            fail();
        }
    });

    /**
     * MAP TILER TEST 2
     */
    test('Test tiles successful 2', () => {
        const expectedOutput: number[][] = [
            [21,21,21,21,21,21,21,21,21],
            [21,9,4,4,4,4,4,8,21],
            [21,3,20,20,20,20,20,2,21],
            [21,7,5,5,5,5,5,6,21],
            [21,21,21,21,21,21,21,21,21],
        ];

        const input: number[][] = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const output = assignImageNumbers(input);
        console.assert(testHelper(expectedOutput, output));
        if(!testHelper(expectedOutput, output)) {
            console.log("Tiles test 2 failed");
            console.log("output: " + output);
            console.log("expectedOutput: " + expectedOutput);
            fail();
        }
    });

    /**
     * MAP TILER TEST 3
     */
    test('Test tiles successful 3', () => {
        const expectedOutput: number[][] = [
            [21, 21, 21, 21, 21, 21, 21],
            [21, 9, 4, 4, 4, 8, 21],
            [21, 3, 20, 20, 20, 2, 21],
            [21, 3, 20, 20, 20, 2, 21],
            [21, 3, 20, 20, 20, 2, 21],
            [21, 3, 20, 20, 20, 2, 21],
            [21, 7, 5, 5, 5, 6, 21],
            [21, 21, 21, 21, 21, 21, 21],
        ];

        const input: number[][] = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const output = assignImageNumbers(input);
        console.assert(testHelper(expectedOutput, output));
        if(!testHelper(expectedOutput, output)) {
            console.log("Tiles test 3 failed");
            console.log("output: " + output);
            console.log("expectedOutput: " + expectedOutput);
            fail();
        }
    });

    /*
    Ensures two 2D arrays are identical, via running 3 checks
    + The width of the two arrays
    + The height of the two arrays
    + the numbers in each cell of both arrays.

    If anything is non-identical, returns false. true otherwise.
    */
    function testHelper(expected : number[][] , output : number[][]) {
        let expectedFormatted : number[];
        let outputFormatted : number[];

        //FIRST CHECK: col size
        if(expected.length != output.length) return false;

        //SECOND CHECK: row size
        for(var row = 0; row < expected.length; row++) {
            if(expected[row].length != output[row].length) return false;

            //THIRD CHECK: number
            for(var col = 0; col < expected[row].length; col++) {
                if(expected[row][col] != output[row][col]) return false
           }
        }

        return true;
    }

});
