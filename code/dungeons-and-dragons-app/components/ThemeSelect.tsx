import React from 'react';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

// We establish Props as our "Parameters" for the Button
interface Props {
    themeList : string[]
}

const ThemeSelect = (props : Props) => {

    // Props Initialisations
    const themeList : string[] = props.themeList;

    return (
        <div className={"themeSelect"}>
            <Paper>
                <MenuList>
                    <MenuItem>{themeList[0]}</MenuItem>
                    <MenuItem >{themeList[1]}</MenuItem>
                    <MenuItem>{themeList[2]}</MenuItem>
                </MenuList>
            </Paper>
        </div>
    );
}

export default ThemeSelect
