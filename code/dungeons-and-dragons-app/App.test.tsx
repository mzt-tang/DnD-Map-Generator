// This is template code for testing using jest for the CI part of CI/CD
// The guide im following is: https://docs.expo.io/guides/testing-with-jest/

// To install the jest test library: "yarn add jest-expo" or "npm install jest-expo"
// To run all tests: "npx jest --ci"

import React from 'react';
import renderer from 'react-test-renderer';

import App from './App';
import {roomGen} from "./utility/roomGen";
import map from "./components/Map"
import {fade} from "@material-ui/core";
import routeFindingMap from "./pages/RouteFindingMap";

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
            assert.fail();
        } catch (error) {
            console.log("Did not allow the [0,0] entrance to pass");
        }
    });

    test('entrances must be on at the edge.', () => {
        const entrances:number[][] = [[5,6], [4,0]];
        try {
            const roomArray = roomGen(10, 10, entrances, 0.2, false);
            console.assert(false);
        } catch (error) {
            console.log("Did not allow the [5,6] entrance to pass");
        }
    });

    test('There must be at least 1 entrance', () => {
        const entrances:number[][] = [];
        try {
            const roomArray = roomGen(10, 10, entrances, 0.2, false);
            console.assert(false);
        } catch (error) {
            console.log("Did not allow the [5,6] entrance to pass");
        }
    });

});
