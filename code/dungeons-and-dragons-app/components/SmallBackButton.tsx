import {Button, Typography} from '@material-ui/core';
import React from 'react';
import {useHistory} from "react-router-dom";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {useFonts} from 'expo-font';

interface Props {
    buttonString: string
    buttonRoute: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        smallBackButton: {
            color: '#Eddded',
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
    const classes = useStyles();

    let [fontsLoaded] = useFonts({
        'Title': require('../assets/Fonts/DraconisBold-qZxd6.ttf'),
    });

    // Props Initialisations
    const buttonString: string = props.buttonString;
    const buttonRoute: string = props.buttonRoute;

    //Other Variable Initialisations
    const history = useHistory();

    return (
        <div className={"SmallMenuButton"}>
            <Button variant="outlined" size="small" color="primary" startIcon={<ArrowBackIosIcon/>}
                    className={classes.smallBackButton} onClick={() => {
                history.push(buttonRoute)
            }}>

                <Typography variant={"button"} className={classes.buttonText} style={{fontFamily: 'Title'}}>
                    {buttonString}
                </Typography>
            </Button>
        </div>
    );
}

export default SmallMenuButton
