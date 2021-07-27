import React, {ChangeEvent, useState} from 'react';
import { View } from 'react-native';
import {makeStyles, Paper} from "@material-ui/core";
import {AppBar, Grid, IconButton, Link, Toolbar, Typography} from "@material-ui/core";
import {Title} from "@material-ui/icons";

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
        </Grid>
    )
}


export default DmView