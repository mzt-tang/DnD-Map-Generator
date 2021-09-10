import React from 'react';
import renderer from 'react-test-renderer'

import DmOptions from "../pages/DmOptions";

/*DM Options Page Rendering*/
describe('<MainMenu_DmOptions />', () => {

    test('Dm options page renders correctly', () => {
        const renderedComponent = renderer.create(<DmOptions />).toJSON()
        expect(renderedComponent).toMatchSnapshot();
    });

});