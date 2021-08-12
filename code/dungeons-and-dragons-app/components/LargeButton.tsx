import {Button, Typography} from '@material-ui/core';
import React from 'react';
import { useHistory } from "react-router-dom";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// We establish Props as our "Parameters" for the Button
interface Props {
    buttonString : string
    buttonRoute : string
    leftAndRightPadding : number
}

const useStyles = makeStyles<Theme, Props>((theme: Theme) =>
    createStyles({
        largeButton: {
            background: '#000000',
            borderColor: '#Eddded',
            borderWidth: 2,
            opacity: 0.8,
            margin: 25,
            paddingTop: 20,
            paddingBottom: 20,
            paddingLeft: props => props.leftAndRightPadding,
            paddingRight: props => props.leftAndRightPadding,
            alignSelf: 'center',
            float: 'left',
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

const LargeButton = (props : Props) => {
    //const classes = useStyles(props);
    const {largeButton, buttonText} = useStyles(props);

    // Props Initialisations
    const buttonString : string = props.buttonString;
    const buttonRoute : string = props.buttonRoute;

    //Other Variable Initialisations
    const history = useHistory();

    return (
        <div className={"LargeButton"}>
        <Button variant="outlined" size="large" color="primary" className={largeButton} onClick={() => {
            history.push(buttonRoute)
        }}>

            <Typography variant={"h4"} className={buttonText}>
                {buttonString}
            </Typography>
        </Button>
        </div>
    );
}

export default LargeButton
