import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { Pressable, Text } from 'react-native';
import { Typography, Radio, RadioGroup } from "@material-ui/core";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import FormControlLabel from '@material-ui/core/FormControlLabel';
// We establish Props as our "Parameters" for the Button
interface Props {
    themeList: string[],
    theme: string,
    onChange: Function
}

const ThemeSelect = (props: Props) => {

    const colorTheme = createMuiTheme({
        palette: {
            primary: { main: 'rgb(234,157,228)' },
        },
    })

    // Props Initialisations
    const themeList: string[] = props.themeList;
    const [theme, setTheme] = useState(props.theme);

    function changeTheme(newTheme: React.ChangeEvent<HTMLInputElement>) {
        setTheme((newTheme.target as HTMLInputElement).value);
        props.onChange((newTheme.target as HTMLInputElement).value);
    }
    return (
        <div className={"themeSelect"}>
            {console.log(props.theme)}
            <Paper>
                <MenuList style={{ left: '10%' }}>
                    <MuiThemeProvider theme={colorTheme}>
                        <RadioGroup value={theme} onChange={e => changeTheme(e)}>
                            <FormControlLabel value={themeList[0]} control={<Radio color={'primary'}/>} label="Cave" />
                            <FormControlLabel value={themeList[1]} control={<Radio color={'primary'}/>} label="Dungeon" />
                            <FormControlLabel value={themeList[2]} control={<Radio color={'primary'}/>} label="Basement" />
                        </RadioGroup>
                    </MuiThemeProvider>

                </MenuList>
            </Paper>
        </div>
    );
}

export default ThemeSelect
