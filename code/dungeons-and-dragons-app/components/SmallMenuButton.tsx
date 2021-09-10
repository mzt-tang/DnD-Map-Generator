import {Button, Typography} from '@material-ui/core';
import React from 'react';
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {db} from "../firebaseConfig";

import ValidateGameCode from "../utility/ValidateGameCode";

interface Props {
    buttonString : string
    buttonRoute : string

    code(): string;

    creatingNewGame : boolean
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

const SmallMenuButton = (props : Props) => {
    const classes = useStyles();

    // Props Initialisations
    const buttonString : string = props.buttonString;
    const buttonRoute : string = props.buttonRoute;

    //Other Variable Initialisations
    let history = useHistory();

    return (
        <div className={"SmallMenuButton"}>
            <Button variant="outlined" size="small" color="primary" className={classes.smallMenuButton} onClick={async() => {
                await ValidateGameCode(props.code(), props.creatingNewGame) ? // Need to first check if a game with this gamecode exists
                    history.push({
                        pathname: buttonRoute+"/"+props.code(),
                        state: props.code() //data parsed between pages
                    })
                : alert("The GameCode \"" + props.code() + "\" is not valid. Please enter a valid GameCode.") // placeholder, should ideally send a custom error message component
            }}>
                <Typography variant={"button"} className={classes.buttonText} >
                    {buttonString}
                </Typography>
            </Button>
        </div>
    );
}

export default SmallMenuButton
