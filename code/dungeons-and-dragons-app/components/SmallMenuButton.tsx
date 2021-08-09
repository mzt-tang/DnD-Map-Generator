import {Button, Typography} from '@material-ui/core';
import React from 'react';
import { useHistory } from "react-router-dom";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

interface Props {
    buttonString : string
    buttonRoute : string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        smallMenuButton: {
            background: '#000000',
            borderColor: '#Eddded',
            borderWidth: 2,
            opacity: 0.7,
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

    return (
        <div className={"SmallMenuButton"}>
        <Button variant="outlined" size="small" color="primary" className={classes.smallMenuButton} onClick={() => {
            history.push(buttonRoute)
        }}>

            <Typography variant={"button"} className={classes.buttonText} >
                {buttonString}
            </Typography>
        </Button>
        </div>
    );
}

export default SmallMenuButton
