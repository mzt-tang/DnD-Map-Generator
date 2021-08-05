import React from 'react';
import TextField from "@material-ui/core/TextField";

// We establish Props as our "Parameters" for the Button
interface Props {
    defaultText : string
    labelText : string
}

const CodeInput = (props : Props) => {
    // Props Initialisations
    const defaultText : string = props.defaultText;
    const labelText : string = props.labelText;

    return (
        <TextField
            required
            id="outlined-required"
            label={labelText}
            defaultValue={defaultText}
            variant="outlined"
        />
    );
}

export default CodeInput
