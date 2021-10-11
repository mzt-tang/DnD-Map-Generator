import React from 'react';
import TextField from "@material-ui/core/TextField";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

// We establish Props as our "Parameters" for the Button
interface Props {
    defaultText: string
    labelText: string

    onCodeChange(value: string): void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        gameCodeInput: {
            background: '#FFFFFF',
            opacity: 0.9,
            marginTop: 10
        },
    }),
);

const CodeInput = (props: Props) => {
    const classes = useStyles();

    const defaultText: string = props.defaultText;
    const labelText: string = props.labelText;

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        props.onCodeChange(event.target.value as string);
    }

    //Fetch the game code
    return (
        <TextField
            required
            className={classes.gameCodeInput}
            id="outlined-required"
            label={labelText}
            defaultValue={defaultText}
            fullWidth
            variant="outlined"
            InputLabelProps={{
                style: {color: '#403940'},
            }}
            onChange={handleChange}
        />
    );
}

export default CodeInput
