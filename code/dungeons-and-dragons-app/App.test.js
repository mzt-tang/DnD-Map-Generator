// This is template code for testing using jest for the CI part of CI/CD
// The guide im following is: https://docs.expo.io/guides/testing-with-jest/

import React from 'react';
import renderer from 'react-test-renderer';

import App from './App';

describe('<App />', () => {
    //This is an example of a test
    /*it('has 1 child', () => {
        const tree = renderer.create(<App />).toJSON();
        expect(tree.children.length).toBe(1);
    });*/

    //This is an example of a snapshot test (states of UI)
    /*it('renders correctly', () => {
        const tree = renderer.create(<App />).toJSON();
        expect(tree).toMatchSnapshot();
    });*/
});
