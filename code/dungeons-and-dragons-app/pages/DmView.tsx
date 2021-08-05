import React, {ChangeEvent, useState} from 'react';
import { View } from 'react-native';
import {Box, Button, Collapse, hexToRgb, makeStyles, Paper, Slider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {AppBar, Grid, IconButton, Link, Toolbar, Typography} from "@material-ui/core";
import {ArrowDropDown, RadioButtonChecked, RadioButtonUnchecked, Title} from "@material-ui/icons";
import Map from '../components/Map';
import '../styles/style.css'
import { useHistory } from "react-router-dom";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';


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
import Row from '../components/Row';
import row from '../components/Row';

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


function DmView(this: any) {
    const classes = useStyles();
    const history = useHistory();
    const [open, setOpen] = React.useState(false);

    return (
        <div id='dmView' style={{backgroundColor:hexToRgb("#b37bb3")}}>
            <div id="topBar">
                <Button id="topButton" style={{width:'40px'}} onClick={() => {
                    history.push('/home')
                }}>X</Button>
                <Button id="topButton" style={{width:'200px'}}>Save</Button>
                <React.Fragment>
                    <TableRow>
                        <TableCell>
                            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                            Level
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <Box margin={1}>
                                    <Table size="small" aria-label="purchases">
                                        <TableHead>
                                            <TableRow style={{ position: "relative", top: 0, width: '100%', display: "flex", flexDirection: "column" }}>
                                                {// Get the levels from the firebase, loop through all of them, adding a button per level and attaching a link to load that level to the button
                                                    <><Button>Level 1</Button><Button>Level 2</Button><Button>Level 3</Button></>
                                                }
                                            </TableRow>
                                        </TableHead>
                                    </Table>
                                </Box>
                            </Collapse>
                        </TableCell>
                    </TableRow>
                </React.Fragment>
            </div>
            <div id='fogBar' style={{position:"absolute", left:"700px", top:10}}>
                FOG ON/OFF
                <Button id="fogToggle">Toggle Fog</Button>
                <Button id="fogEdit">add fog</Button>
            </div>
            <div id='sliderBar' style={{position:"absolute", left:"1100px", top:10, width:300}}>
                ZOOM
                <Slider onChange={() => {

                }}></Slider>
            </div>
            <div id='route' style={{backgroundColor:hexToRgb("#AAAABB")}}>
                <Map images={images} ALL_ROOMS = {[]}/>
            </div>
        </div>
    )
}


export default DmView
