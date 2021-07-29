import React, {ChangeEvent, useState} from 'react';
import { View } from 'react-native';
import {makeStyles, Paper} from "@material-ui/core";
import {AppBar, Grid, IconButton, Link, Toolbar, Typography} from "@material-ui/core";
import {Title} from "@material-ui/icons";
import Map from '../components/Map';

import Image1 from '../assets/Dark.png';
import Image2 from '../assets/Light.png';
import Image3 from '../assets/TLCorner.png';
import Image4 from '../assets/BLCorner.png';
import Image5 from '../assets/BRCorner.png';
import Image6 from '../assets/TRCorner.png';
import Image7 from '../assets/WallBottom.png';
import Image8 from '../assets/WallTop.png';
import Image9 from '../assets/WallLeft.png';
import Image10 from '../assets/WallRight.png';
import Image11 from '../assets/Floor.png';

const images : JSX.Element[] = [
    <img className="grid_img" src={Image1}/>,
    <img className="grid_img" src={Image2}/>,
    <img className="grid_img" src={Image3}/>,
    <img className="grid_img" src={Image4}/>,
    <img className="grid_img" src={Image5}/>,
    <img className="grid_img" src={Image6}/>,
    <img className="grid_img" src={Image7}/>,
    <img className="grid_img" src={Image8}/>,
    <img className="grid_img" src={Image9}/>,
    <img className="grid_img" src={Image10}/>,
    <img className="grid_img" src={Image11}/>,
]

const useStyles = makeStyles((theme) => ({
    grid: {
        width: '100%',
        margin: '0px'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        background: theme.palette.success.light,
    }
}));

function DmView() {
    const classes = useStyles();

    return (
        <Grid container spacing={2} className={classes.grid}>
            <Grid item xs={6}>
                <Paper className={classes.paper}>1</Paper>
            </Grid>
            <div id='route'>
                <Map images={images} />
            </div>
        </Grid>
    )
}


export default DmView
