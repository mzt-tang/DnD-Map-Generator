import {Button, Typography} from '@material-ui/core';
import React from 'react';
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {db} from "../firebaseConfig";

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

    async function isGameCodeValid(props : Props) : Promise<boolean> {
        let gameCode : string = props.code();
        if (gameCode.length > 1 && props.creatingNewGame) { return true; }
        else {
            //Check if the gamecode is a valid path in Firebase (i.e., has length > 1, and does not have invalid characters like '$')
            if (gameCode.length < 1 || gameCode.includes(".") || gameCode.includes("#") || gameCode.includes("$") || gameCode.includes("[") 
                || gameCode.includes("]")) { return false; }

            // Check if a GameCode matches an existing game
            let isValidCode : boolean = false;
            await gamecodeExists(gameCode).then((exists) => { isValidCode = exists; });
            return Promise.resolve(isValidCode);
        }
    }

    async function gamecodeExists(gameCode : string){
        let codeExists : boolean = false;
        try {
            // Check whether the GameCode exists in the Firebase Realtime Database
            const snapshot = await db.database().ref().get();
            codeExists = snapshot.hasChild(gameCode);
        }
        catch (error) {
            alert(error);
        }
        return Promise.resolve(codeExists);
    }

    return (
        <div className={"SmallMenuButton"}>
            <Button variant="outlined" size="small" color="primary" className={classes.smallMenuButton} onClick={async() => {
                await isGameCodeValid(props) ? // Need to first check if a game with this gamecode exists
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
