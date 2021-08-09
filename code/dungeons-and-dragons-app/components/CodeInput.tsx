import React from 'react';
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// We establish Props as our "Parameters" for the Button
interface Props {
    defaultText : string
    labelText : string
    helperText : string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        gameCodeInput: {
            background: '#FFFFFF',
            opacity: 0.9   
        },
    }),
);

const CodeInput = (props : Props) => {
    const classes = useStyles();

    // Props Initialisations
    const defaultText : string = props.defaultText;
    const labelText : string = props.labelText;
    const underText : string = props.helperText

    return (
        <TextField
            required
            className={classes.gameCodeInput}
            id="outlined-required"
            label={labelText}
            defaultValue={defaultText}
            helperText={underText}
            fullWidth
            variant="outlined"
            InputLabelProps={{
                style: { color: '#403940' },
            }}
        />
    );
}

export default CodeInput
