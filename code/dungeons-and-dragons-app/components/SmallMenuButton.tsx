import {Button, Typography} from '@material-ui/core';
import React from 'react';
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
    const history = useHistory();

    //const isValidCode = db.database().ref().child(props.code());

    return (
        <div className={"SmallMenuButton"}>
            <Button variant="outlined" size="small" color="primary" className={classes.smallMenuButton} onClick={() => {
                // Need to first check if a game with this gamecode exists
                
                history.push({
                    pathname: buttonRoute+"/"+props.code(),
                    state: props.code() //data parsed between pages
                })
            }}>

                <Typography variant={"button"} className={classes.buttonText} >
                    {buttonString}
                </Typography>
            </Button>
        </div>
    );
}

export default SmallMenuButton
