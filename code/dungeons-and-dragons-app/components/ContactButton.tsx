import { Button } from '@material-ui/core';
import React from 'react';
import { useHistory } from "react-router-dom";

const ContactButton = () => {

  ////////////////////////////////////
  // Variable Initialisation
  ////////////////////////////////////

  //Other Variable Initialisations
  const history = useHistory(); //Establishing History Prop
  
  ////////////////////////////////////
  //Return
  ////////////////////////////////////

  return (
    <Button onClick={() => { 
      history.push("/contact") // React Router may not like the idea about parameterising the direction
    }}>
      {"Go to Contact"}
    </Button>
  );
}

export default ContactButton
