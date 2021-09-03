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

    function isGameCodeValid(props : Props) : boolean {
        let gameCode : string = props.code();
        let isValidCode : boolean = false;
        if (gameCode.length < 1) { isValidCode = false; }
        else {
            isValidCode = true;
            //let mapsDatabaseRef = db.database().ref();
            //mapsDatabaseRef.get().then(value => console.log("Buroza: " + value.child(gameCode).exists()));
            //console.log("ice code: '" + gameCode as string + "', isValidCode=" + isValidCode);
            //mapsDatabaseRef.get().then(value => console.log(isValidCode = value.child(gameCode).exists()));
            //console.log("fire code: '" + gameCode as string + "', isValidCode=" + isValidCode);
        }
        console.log("code: '" + gameCode as string + "', isValidCode=" + isValidCode);
        return isValidCode;
    }

    return (
        <div className={"SmallMenuButton"}>
            <Button variant="outlined" size="small" color="primary" className={classes.smallMenuButton} onClick={() => {
                // Need to first check if a game with this gamecode exists
                isGameCodeValid(props) ? 
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
