import React from 'react';
import TextField from "@material-ui/core/TextField";

// We establish Props as our "Parameters" for the Button
interface Props {
    defaultText : string
    labelText : string
    helperText : string
}

const CodeInput = (props : Props) => {
    // Props Initialisations
    const defaultText : string = props.defaultText;
    const labelText : string = props.labelText;
    const underText : string = props.helperText

    return (
        <TextField
            required
            className={"styles.CodeInput"}
            id="outlined-required"
            label={labelText}
            defaultValue={defaultText}
            helperText={underText}
            fullWidth
            variant="outlined"
        />
    );
}

export default CodeInput
