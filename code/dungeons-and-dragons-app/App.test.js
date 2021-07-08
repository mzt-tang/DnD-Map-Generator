// This is template code for testing using jest for the CI part of CI/CD
// The guide im following is: https://docs.expo.io/guides/testing-with-jest/

import React from 'react';
import renderer from 'react-test-renderer';

import App from './App';

describe('<App />', () => {
    it('has 1 child', () => {
        const tree = renderer.create(<App />).toJSON();
        expect(tree.children.length).toBe(1);
    });
});
