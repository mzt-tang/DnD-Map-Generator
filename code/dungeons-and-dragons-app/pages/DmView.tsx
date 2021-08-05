import React, {ChangeEvent, useState} from 'react';
import { View } from 'react-native';
import {Button, makeStyles, Paper} from "@material-ui/core";
import {AppBar, Grid, IconButton, Link, Toolbar, Typography} from "@material-ui/core";
import {Title} from "@material-ui/icons";
import Map from '../components/Map';
import '../styles/style.css'
import { useHistory } from "react-router-dom";


import Image1 from '../assets/Dark.png';
import Image2 from '../assets/Light.png';
import Image3 from '../assets/New Tile Assets/floor_e.png';
import Image4 from '../assets/New Tile Assets/floor_w.png';
import Image5 from '../assets/New Tile Assets/floor_n.png';
import Image6 from '../assets/New Tile Assets/floor_s.png';
import Image7 from '../assets/New Tile Assets/floor_se.png';
import Image8 from '../assets/New Tile Assets/floor_sw.png';
import Image9 from '../assets/New Tile Assets/floor_ne.png';
import Image10 from '../assets/New Tile Assets/floor_nw.png';
import Image11 from '../assets/New Tile Assets/floor_e2.png';
import Image12 from '../assets/New Tile Assets/floor_w2.png';
import Image13 from '../assets/New Tile Assets/floor_n2.png';
import Image14 from '../assets/New Tile Assets/floor_s2.png';
import Image15 from '../assets/New Tile Assets/floor_se2.png';
import Image16 from '../assets/New Tile Assets/floor_sw2.png';
import Image17 from '../assets/New Tile Assets/floor_ne2.png';
import Image18 from '../assets/New Tile Assets/floor_nw2.png';
import Image19 from '../assets/New Tile Assets/floor_ns.png';
import Image20 from '../assets/New Tile Assets/floor_ew.png';
import Image21 from '../assets/New Tile Assets/floor_default.png';
import Image22 from '../assets/New Tile Assets/wall.png';

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
    <img className="grid_img" src={Image12}/>,
    <img className="grid_img" src={Image13}/>,
    <img className="grid_img" src={Image14}/>,
    <img className="grid_img" src={Image15}/>,
    <img className="grid_img" src={Image16}/>,
    <img className="grid_img" src={Image17}/>,
    <img className="grid_img" src={Image18}/>,
    <img className="grid_img" src={Image19}/>,
    <img className="grid_img" src={Image20}/>,
    <img className="grid_img" src={Image21}/>,
    <img className="grid_img" src={Image22}/>
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
    const history = useHistory();
    return (
        <div id='dmView'>
            <div id="topBar">
                <Button id="topButton" style={{width:'40px'}} onClick={() => {
                    history.push('/home')
                }}>X</Button>
                <Button id="topButton" style={{width:'200px'}}>Save</Button>
                <Button id="topButton" style={{width:'200px'}}>Level</Button>
            </div>
            <div id='route'>
                <Map images={images} ALL_ROOMS = {[]}/>
            </div>
        </div>

    )
}


export default DmView
