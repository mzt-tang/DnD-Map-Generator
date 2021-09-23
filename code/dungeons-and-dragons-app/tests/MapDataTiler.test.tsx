// This is template code for testing using jest for the CI part of CI/CD
// The guide im following is: https://docs.expo.io/guides/testing-with-jest/

// To install the jest test library: "yarn add jest-expo" or "npm install jest-expo"
// To run all tests: "npx jest --ci"

import React from 'react';

import { MapTilerHelper } from "../utility/MapTilerHelper";


describe('<MapTilerHelper />', () => {

    /**
     * MAP TILER TEST 1
     */
    test('Test tiles successful.', () => {
        const expectedOutput: number[][] = [
            [6, 13, 13, 13, 13, 13, 7],
            [10, 0, 0, 0, 0, 0, 11],
            [10, 0, 0, 0, 0, 0, 11],
            [10, 0, 0, 0, 0, 0, 11],
            [8, 12, 12, 12, 12, 12, 9],
        ];

        const input: number[][] = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ];
        const output = MapTilerHelper(input);
        console.log("output: " + output);
        console.log("expectedOutput: " + expectedOutput);
        console.assert(expectedOutput == output);
    });

    /**
     * MAP TILER TEST 2
     */
    test('Test tiles successful.', () => {
        const expectedOutput: number[][] = [
            [6, 13, 13, 13, 13, 13, 13, 13, 7],
            [10, 0, 0, 0, 0, 0, 0, 0, 11],
            [10, 0, 0, 0, 0, 0, 0, 0, 11],
            [10, 0, 0, 0, 0, 0, 0, 0, 11],
            [8, 12, 12, 12, 12, 12, 12, 12, 9],
        ];

        const input: number[][] = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const output = MapTilerHelper(input);
        console.log("output: " + output);
        console.log("expectedOutput: " + expectedOutput);
        console.assert(expectedOutput == output);
    });

    /**
     * MAP TILER TEST 3
     */
    test('Test tiles successful.', () => {
        const expectedOutput: number[][] = [
            [6, 13, 13, 13, 13, 13, 7],
            [10, 0, 0, 0, 0, 0, 11],
            [10, 0, 0, 0, 0, 0, 11],
            [10, 0, 0, 0, 0, 0, 11],
            [10, 0, 0, 0, 0, 0, 11],
            [10, 0, 0, 0, 0, 0, 11],
            [10, 0, 0, 0, 0, 0, 11],
            [8, 12, 12, 12, 12, 12, 9],
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
        const output = MapTilerHelper(input);
        console.log("output: " + output);
        console.log("expectedOutput: " + expectedOutput);
        console.assert(expectedOutput == output);
    });

});
