import React from 'react';
import renderer from 'react-test-renderer'

import Home from "../pages/Home";

/*Home Page Rendering*/
describe('<MainMenu_Home />', () => {

    test('Home page renders correctly', () => {
        const renderedComponent = renderer.create(<Home />).toJSON()
        expect(renderedComponent).toMatchSnapshot();
    });
    
});