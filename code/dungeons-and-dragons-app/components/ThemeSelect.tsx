import React from 'react';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { Pressable } from 'react-native';

// We establish Props as our "Parameters" for the Button
interface Props {
    themeList : string[],
    onChange : Function
}

const ThemeSelect = (props : Props) => {

    // Props Initialisations
    const themeList : string[] = props.themeList;

    return (
        <div className={"themeSelect"}>
            <Paper>
                <MenuList>
                    <MenuItem onClick={() => props.onChange(themeList[0])}>{themeList[0]}</MenuItem>
                    <MenuItem onClick={() => props.onChange(themeList[1])}>{themeList[1]}</MenuItem>
                    <MenuItem onClick={() => props.onChange(themeList[2])}>{themeList[2]}</MenuItem>
                </MenuList>
            </Paper>
        </div>
    );
}

export default ThemeSelect
