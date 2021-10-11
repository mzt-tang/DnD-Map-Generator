import React from 'react';
import renderer from 'react-test-renderer'

import DmOptions from "../pages/DmOptions";
import genRandomCode from "../pages/DmOptions";

/*DM Options Page Rendering*/
describe('<MainMenu_DmOptions />', () => {

    test('Dm options page renders correctly', () => {
        const renderedComponent = renderer.create(<DmOptions/>).toJSON()
        expect(renderedComponent).toMatchSnapshot();
    });

    test('codes are randomly generated', () => {
        try {
            const code1 = genRandomCode();
            const code2 = genRandomCode();
            console.assert(code1 != code2);
        } catch (error) {
            console.assert(false)
        }
    })

});
