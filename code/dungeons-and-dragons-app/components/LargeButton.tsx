import {Button, Typography} from '@material-ui/core';
import React from 'react';
import { useHistory } from "react-router-dom";

// We establish Props as our "Parameters" for the Button
interface Props {
    buttonString : string
    buttonRoute : string
}

const LargeButton = (props : Props) => {
    // Props Initialisations
    const buttonString : string = props.buttonString;
    const buttonRoute : string = props.buttonRoute;

    //Other Variable Initialisations
    const history = useHistory();

    return (
        <Button variant="outlined" size="large" color="primary" className="largeButton" onClick={() => {
            history.push(buttonRoute)
        }}>

            <Typography variant={"h4"}>
                {buttonString}
            </Typography>
        </Button>
    );
}

export default LargeButton
