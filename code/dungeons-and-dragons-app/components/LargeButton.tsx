import {Button, Typography} from '@material-ui/core';
import React from 'react';
import { useHistory } from "react-router-dom";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useFonts } from 'expo-font';

// We establish Props as our "Parameters" for the Button
interface Props {
    buttonString : string
    buttonRoute : string
    buttonProps: string
    leftAndRightPadding : number
}

const useStyles = makeStyles<Theme, Props>((theme: Theme) =>
    createStyles({
        largeButton: {
            color: '#Eddded',
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
                color: '#Eddded',
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
    let [fontsLoaded] = useFonts({
        'Title': require('../assets/Fonts/DraconisBold-qZxd6.ttf'),
      });
    const classes = useStyles(props);
    const {largeButton, buttonText} = useStyles(props);

    // Props Initialisations
    const buttonString : string = props.buttonString;
    const buttonRoute : string = props.buttonRoute;
    const buttonProps : string = props.buttonProps; 

    //Other Variable Initialisations
    const history = useHistory();

    return (
        <Button variant="outlined" size="large" className={classes.largeButton} color="primary" onClick={() => {
            history.push({
                pathname: buttonRoute,
                state: {theme: buttonProps},
            });
        }}>

            <Typography variant={"h4"} className={buttonText} style={{fontFamily:'Title'}}>
                {buttonString}
            </Typography>
        </Button>
    );
}

export default LargeButton
