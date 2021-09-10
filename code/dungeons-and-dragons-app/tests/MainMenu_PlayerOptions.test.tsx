import React from 'react';
import renderer from 'react-test-renderer'

import PlayerOptions from "../pages/PlayerOptions";

/*Player Options Page Rendering*/
describe('<MainMenu_PlayerOptions />', () => {

    test('Player options page renders correctly', () => {
        const renderedComponent = renderer.create(<PlayerOptions />).toJSON()
        expect(renderedComponent).toMatchSnapshot();
    });

});