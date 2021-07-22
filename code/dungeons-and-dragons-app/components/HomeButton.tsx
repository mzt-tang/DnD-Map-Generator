import { Button } from '@material-ui/core';
import React from 'react';
import { useHistory } from "react-router-dom";

// We establish Props as our "Parameters" for the Button
interface Props {
  buttonString : string
}

const HomeButton = (props : Props) => {

  ////////////////////////////////////
  // Variable Initialisation
  ////////////////////////////////////

  // Props Initialisations
  const buttonString : string = props.buttonString;

  //Other Variable Initialisations
  const history = useHistory(); //Establishing History Prop
  
  ////////////////////////////////////
  //Return
  ////////////////////////////////////

  return (
    <Button onClick={() => { 
      history.push("/home") // React Router may not like the idea about parameterising the direction
    }}>
      {buttonString}
    </Button>
  );
}

export default HomeButton
