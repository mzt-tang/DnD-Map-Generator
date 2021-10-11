import {Button, Typography} from '@material-ui/core';
import React from 'react';
import {useHistory} from "react-router-dom";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

import ValidateGameCode from "../utility/ValidateGameCode";
import {useFonts} from 'expo-font';

interface Props {
    buttonString: string
    buttonRoute: string
    buttonProp?: string

    code(): string;

    creatingNewGame: boolean,
    disabled?: boolean
    onclick?: Function
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        smallMenuButton: {
            background: '#000000',
            borderColor: '#Eddded',
            borderWidth: 2,
            opacity: 0.8,
            margin: 25,
            padding: 20,
            alignSelf: 'center',
            '&:hover': {
                backgroundColor: '#b348b1',
                borderColor: '#Eddded',
                borderWidth: 2,
                boxShadow: 'none',
            }
        },
        buttonText: {
            fontSize: 16,
            color: '#Eddded'
        },
    }),
);

const SmallMenuButton = (props: Props) => {
    let [fontsLoaded] = useFonts({
        'Title': require('../assets/Fonts/DraconisBold-qZxd6.ttf'),
      });
    const classes = useStyles();

    // Props Initialisations
    const buttonString: string = props.buttonString;
    const buttonRoute: string = props.buttonRoute;
    const buttonProp: string | undefined = props.buttonProp;

    //Other Variable Initialisations
    let history = useHistory();

    return (
        <div className={"SmallMenuButton"}>
            <Button variant="outlined" size="small" color="primary" className={classes.smallMenuButton} onClick={
                async () => {
                    if (props.onclick) props.onclick(true);
                    await ValidateGameCode(props.code(), props.creatingNewGame) ? // Need to first check if a game with this gamecode exists
                        history.push({
                            pathname: buttonRoute + "/" + props.code(),
                            state: {
                                code: "gamecode",
                                theme: buttonProp,
                            } //data parsed between pages
                        })
                        : alert("The GameCode \"" + props.code() + "\" is not valid. Please enter a valid GameCode.");
                    if (props.onclick) props.onclick(false);
                }}>
                <Typography variant={"button"} className={classes.buttonText} style={{fontFamily:'Title'}}>
                    {buttonString}
                </Typography>
            </Button>
        </div>
    );
}

export default SmallMenuButton
