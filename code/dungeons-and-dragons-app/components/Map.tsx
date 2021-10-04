import React from "react";
import {db} from '../firebaseConfig';
import { roomGen } from "../utility/roomGen";
import React, {useContext, useEffect, useState} from "react";

import { Text } from 'react-native';
import firebase from 'firebase';
import {Alert, Button, Modal, Text, View} from 'react-native';

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
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import MapData from "../interfaces/MapData";
import {makeImageArray} from '../utility/MapTilerHelper'

import Image4 from '../assets/New Tile Assets/floor_w.png';

import MonsterData from "./MonsterData";
import ParseURLData from "../utility/ParseURLData";
import { useHistory } from "react-router-dom";

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

export function createData(
    name: string,
    monsters: string[],
) {
    return {
        name,
        monsters,
    };
}

export interface MonsterInfo {
    monster: {
        "name": string,
        "size": string,
        "type": string,
        "subtype": string,
        "alignment": string,
        "armor_class": number,
        "armor_desc": string,
        "hit_points": number,
        "hit_dice": string,
        "speed": {
            "walk": number
        },
        "strength": number,
        "dexterity": number,
        "constitution": number,
        "intelligence": number,
        "wisdom": number,
        "charisma": number
    }
}


function Row(props: { row: ReturnType<typeof createData> }) { // Will need to be called by map, passing in number of rooms
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [monsterData, setMonsterData] = React.useState<MonsterInfo>();
    const classes = useRowStyles();

    const onClickMonster = (name: string) => {
        const url = 'https://api.open5e.com/monsters/?name=' + name;

        fetch(url).then(result => {
            return result.json();
            // @ts-ignore todo I'm not entirely sure how to remove this error.
        }).then(data => setMonsterData(data.results[0] ? {monster: data.results[0]} : null))
        setModalVisible(true)
    }

    return (
        <React.Fragment>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
                // style={{alignItems: "center", backgroundColor: '#ffffff', justifyContent: "center", width: '300'}}
            >
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{
                        width: 300
                    }}>
                        <MonsterData monster={monsterData?.monster}/>
                        <Button
                            title={'Close'}
                            onPress={() => setModalVisible(false)}/>
                    </View>
                </View>
            </Modal>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                    {row.name}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow style={{ position: "relative", top: 0, width: '100%', display: "flex", flexDirection: "column" }}>
                                        {row.monsters.map((m => (
                                            <TableCell>{<TableCell>{<Button onPress={() => onClickMonster(m.split(' ')[1])}
                                                                            title={m}/>}</TableCell>}</TableCell>
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


function fillRooms(rooms: number[][][]): string[] {
    let row: string[] = [];
    for (var i: number = 0; i < rooms.length; i++) {
        row[i] = "Room: " + i;
    }
    return row;
}


// The callBackFunction is to be passed into the JSX elements onPush to ensure that when they are pushed we can trigger
// the visibility on the DM side.

const ROOM_SIZE = 10;
const MAP_ROOM_ROWS = 3;
const MAP_ROOM_COLS = 4;
const height = ROOM_SIZE * MAP_ROOM_ROWS;
const width = ROOM_SIZE * MAP_ROOM_COLS;
const ENTRANCE_PROBABILITY = 0.7;
const ROOM_GROW_PROBABILITY = 0.42;

//todo double doors.
const DOUBLE_DOORS = false;


// The callBackFunction is to be passed into the JSX elements onPush to ensure that when they are pushed we can trigger
// the visibility on the DM side.

interface mapProps {
    mapData: MapData,
    imagePressFunction: React.MouseEventHandler<HTMLImageElement>,
    showFog: boolean,
    mapTheme: string,
    maxWidth: number,
    maxHeight: number,
}

export interface roomRows {
    name: string,
    monsters: string[]
}

/**
 * Map component. The very meat of this file.
 * At the moment, it just composes a 2d array of images...
 * @param props
 * @returns map 'style'.
 */
export default function map(props: mapProps) {
    const [rowr, setRowr] = useState<roomRows[]>([]);
    const mapStyle = function (width: number, height: number) {
        return {
            margin: 'auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(' + width + ',max-content)',
            gridTemplateRows: 'repeat(' + height + ',max-content)',
            gridGap: '0px'
        }
    }


    const widthNum = 40;
    const heightNum = 30;

    const data = props.mapData;

    const parseMonsterData = (monsterData: [number, [number, string][]][]) => {
        console.log("MONSTER DATA");
        console.log(monsterData);
        const rooms: roomRows[] = []
        if (monsterData) {
            for (let i = 0; i < monsterData.length; i++) {
                const monstersInRoom: string[] = []
                for (let j = 0; j < monsterData[i][1].length; j++) {
                    monstersInRoom.push("[" + monsterData[i][1][j][0] + "] " + monsterData[i][1][j][1]);
                }
                rooms.push(createData("Room " + monsterData[i][0], monstersInRoom));
            }
        }
        return rooms;
    }

    useEffect(() => {
        setRowr(parseMonsterData(props.mapData.monsters))
    }, [props.mapData.monsters]);

    const images = makeImageArray(data.map, data.visibility, props.imagePressFunction, props.showFog, data.theme);

    return (
        <div id="page">
            <div id="left" style={mapStyle(MAP_ROOM_COLS * ROOM_SIZE, MAP_ROOM_ROWS * ROOM_SIZE)}>
                <section style={{ overflow: 'hidden', borderStyle: 'solid', borderColor: 'gray' }}>
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
                                <TableCell style={{textAlign:'center'}}>Room</TableCell>
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
