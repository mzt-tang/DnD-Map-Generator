import React from 'react';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { Pressable,Text } from 'react-native';
import { Typography, Radio, RadioGroup } from "@material-ui/core";
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import shape from '@material-ui/core/styles/shape';

// We establish Props as our "Parameters" for the Button
interface Props {
    themeList : string[],
    theme: string,
    onChange : Function
}

const ThemeSelect = (props : Props) => {

    // Props Initialisations
    const themeList : string[] = props.themeList;

    return (
        <div className={"themeSelect"}>
            {console.log(props.theme)}
            <Paper>
                <MenuList>
                    <RadioGroup defaultValue={themeList[0]}>
                        <FormControlLabel value={themeList[0]} control={<Radio color={'default'} />} label="Cave" />
                        <FormControlLabel value={themeList[1]} control={<Radio color={'default'}/>} label="Dungeon" />
                        <FormControlLabel value={themeList[2]} control={<Radio color={'default'}/>} label="Basement" />
                    </RadioGroup>
                </MenuList>
            </Paper>
        </div>
    );
}

export default ThemeSelect
