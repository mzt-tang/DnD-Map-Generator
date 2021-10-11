// This is template code for testing using jest for the CI part of CI/CD
// The guide im following is: https://docs.expo.io/guides/testing-with-jest/

// To install the jest test library: "yarn add jest-expo" or "npm install jest-expo"
// To run all tests: "npx jest --ci"

import React from 'react';
import renderer from 'react-test-renderer';
import ThemeSelect from '../components/ThemeSelect';


describe("snaphot testing", () => {
    test("snapshot for theme selection", () => {
        function onChange() {
        }

        const renderedComponent = renderer.create(<ThemeSelect themeList={["Caves", "Dungeon", "Underground Mansion"]}
                                                               theme={"Caves"} onChange={onChange}/>).toJSON();
        expect(renderedComponent).toMatchSnapshot();
    })
})
