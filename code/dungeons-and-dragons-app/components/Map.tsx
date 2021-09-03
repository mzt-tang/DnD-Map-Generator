import React from "react";
import {db} from '../firebaseConfig';

import '../styles/style.css'

import PrismaZoom from 'react-prismazoom'

import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import MapData from "../interfaces/MapData";
import {makeImageArray} from '../utility/MapTilerHelper'

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
        position: "relative",
        top: 0,
        width: 800,
    },
});

function createData(
    name: string,
    monsters: string[],
) {
    return {
        name,
        monsters,
    };
}

function Row(props: { row: ReturnType<typeof createData> }) { // Will need to be called by map, passing in number of rooms
    const {row} = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                    {row.name}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Monster
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow style={{
                                        position: "relative",
                                        top: 0,
                                        width: '100%',
                                        display: "flex",
                                        flexDirection: "column"
                                    }}>
                                        {row.monsters.map((m => (
                                            <TableCell>{m}</TableCell>
                                        )))}
                                    </TableRow>
                                </TableHead>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

let rowr = [createData("Room 1", ["Skeleton", "Boney Boi", "SkelyMan", "Jack"]),
    createData("Room 2", ["Orc", "Grunk", "Bronk"]),
    createData("Room 3", ["Ghost", "Danny Phantom", "Caspar", "Dead Guy"]),
    createData("Room 4", ["Skeleton", "Boney Boi", "SkelyMan", "Jack"]),
    createData("Room 5", ["Skeleton", "Boney Boi", "SkelyMan", "Jack"]),
    createData("Room 6", ["Skeleton", "Boney Boi", "SkelyMan", "Jack"]),
    createData("Room 7", ["Skeleton", "Boney Boi", "SkelyMan", "Jack"]),
    createData("Room 8", ["Skeleton", "Boney Boi", "SkelyMan", "Jack"]),
    createData("Room 9", ["Skeleton", "Boney Boi", "SkelyMan", "Jack"]),
    createData("Room 10", ["Skeleton", "Boney Boi", "SkelyMan", "Jack"]),
    createData("Room 11", ["Skeleton", "Boney Boi", "SkelyMan", "Jack"]),
    createData("Room 12", ["Skeleton", "Boney Boi", "SkelyMan", "Jack"])]

function fillRooms(rooms: number[][][]): string[] {
    let row: string[] = [];
    for (var i: number = 0; i < rooms.length; i++) {
        row[i] = "Room: " + i;
    }
    return row;
}

let fireBaseMapVersion: any[][] = []

export function getFirebaseMap(): number[][] {
    return fireBaseMapVersion
}


// The callBackFunction is to be passed into the JSX elements onPush to ensure that when they are pushed we can trigger
// the visibility on the DM side.

interface mapProps {
    mapData: MapData,
    imagePressFunction: React.MouseEventHandler<HTMLImageElement>
}

/**
 * Map component. The very meat of this file.
 * At the moment, it just composes a 2d array of images...
 * @param props
 * @returns map 'style'.
 */
export default function map(props: mapProps) {
    const mapStyle = function (width: number, height: number) {
        return {
            margin: 'auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(' + width + ',max-content)',
            gridTemplateRows: 'repeat(' + height + ',max-content)',
            gridGap: '0px'
        }
    }

    const data = props.mapData;
    const images = makeImageArray(data.map, data.visibility,props.imagePressFunction);

    return (
        <div id="page">
            <div id="left" style={mapStyle(props.mapData.roomCols * props.mapData.roomSize, props.mapData.roomRows * props.mapData.roomSize)}>
                <section style={{overflow: 'hidden', borderStyle: 'solid', borderColor: 'gray'}}>
                    <PrismaZoom
                        minZoom={1}
                        maxZoom={3}
                    >
                        <div id="map" style={mapStyle(data.roomCols * data.roomSize, data.roomRows * data.roomSize)}>
                            {images}
                        </div>

                    </PrismaZoom>
                </section>

            </div>
            <div id="right" style={{
                position: "absolute",
                top: 0,
                left: '101%',
                width: "40%",
                display: "flex",
                flexDirection: "row"
            }}>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell/>
                                <TableCell>Room</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rowr.map((row) => (
                                <Row key={row.name} row={row}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>);
}

