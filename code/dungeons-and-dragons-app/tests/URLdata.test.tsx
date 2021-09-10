// This is template code for testing using jest for the CI part of CI/CD
// The guide im following is: https://docs.expo.io/guides/testing-with-jest/

// To install the jest test library: "yarn add jest-expo" or "npm install jest-expo"
// To run all tests: "npx jest --ci"

import React from 'react';
import ParseURLData from "../utility/ParseURLData"

describe('<URLdata />', () => {
    /**
     * TESTING THE PARSEURL DATA FUNCTION
     */
    test('Cant parse empty routes', () => {
        try {
            const data: string = ParseURLData("route/ ");
            console.assert(data == undefined);
        } catch (error) {
            console.error("Couldn't parse empty chars");
        }
    });

    test('Can parse standard text', () => {
        try {
            const data: string = ParseURLData("localhost/route/abcde");
            console.assert(data == "abcde");
        } catch (error) {
            console.error("Couldn't parse standard text");
        }
    });

    test('Can parse special characters', () => {
        try {
            const data: string = ParseURLData("localhost/route/!@#$%");
            console.assert(data == "!@#$%");
        } catch (error) {
            console.error("Couldn't parse special characters");
        }
    });

    test('Only retrieves immediate folders data', () => {
        try {
            const data: string = ParseURLData("localhost/route/answer/route");
            console.assert(data == "answer");
        } catch (error) {
            console.error("Failed to parse immediate folder data");
        }
    });

    test('Can parse empty characters', () => {
        try {
            const data: string = ParseURLData("localhost/route/");
            console.assert(data == "")
        } catch (error) {
            //Needs to reach this state
            console.assert(false);
        }
    });
});
