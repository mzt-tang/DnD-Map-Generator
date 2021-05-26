import React from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

// We establish Props as our "Parameters" for the Button
interface Props {
  headerLabel : string
}

const CustomAppBar = (props : Props) => {

  ////////////////////////////////////
  // Variable Initialisation
  ////////////////////////////////////

  // Props Initialisations
  const headerLabel : string = props.headerLabel;
  
  ////////////////////////////////////
  //Return
  ////////////////////////////////////

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">
          {headerLabel}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default CustomAppBar
