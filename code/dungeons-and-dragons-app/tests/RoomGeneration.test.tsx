// This is template code for testing using jest for the CI part of CI/CD
// The guide im following is: https://docs.expo.io/guides/testing-with-jest/

// To install the jest test library: "yarn add jest-expo" or "npm install jest-expo"
// To run all tests: "npx jest --ci"

import React from 'react';

import './RoomGeneration.test';
import {roomGen, RoomGenerationError} from "../utility/roomGen";

interface mapProps {
    images: JSX.Element[]
}

describe('<App />', () => {
    /**
     * RENDERING COMPONENT TESTS
     */
    /*test('can render map', () => {
        render(<div id="map" />)
    })*/

    /**
     * ROOM GENERATION TESTS
     */
    test('corner entrance not allowed.', () => {
        const entrances:number[][] = [[0,0], [4,0]];
        try {
            const roomArray = roomGen(10, 10, entrances, 0.2, false);
            throw new Error()
        } catch (error) {
            if (!(error instanceof RoomGenerationError)) throw new Error()
        }
    });

    test('entrances must be on at the edge.', () => {
        const entrances:number[][] = [[5,6], [4,0]];
        try {
            const roomArray = roomGen(10, 10, entrances, 0.2, false);
            throw new Error()
        } catch (error) {
            if (!(error instanceof RoomGenerationError)) throw new Error()
        }
    });

    test('There must be at least 1 entrance', () => {
        const entrances:number[][] = [];
        try {
            const roomArray = roomGen(10, 10, entrances, 0.2, false);
            throw new Error()
        } catch (error) {
            if (!(error instanceof RoomGenerationError)) throw new Error()
        }
    });

});
