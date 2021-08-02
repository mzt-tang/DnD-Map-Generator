import React, {ChangeEvent, useEffect, useState} from 'react';
import { View } from 'react-native';
import { db } from "../FirebaseConfig";
import firebase from 'firebase';

import Grid from "../components/Grid";
import '../styles/style.css'

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



const PlayerView = () => {

    const[map, setMap] = useState([[0]]);
    const[size, setSize] = useState(25); //todo set the tile size?

    //todo figure out a better way to init firebase
    const database = db;


    // Get map from firebase.

    function updateMap(tiles : number[][]){
        setMap(tiles);
    }

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

    useEffect(() => {
        //Connect to Real Time Database
        const playerViewDatabase = firebase.database().ref().child('maps').child('Map');
        const tileSize = firebase.database().ref().child('tileSize');

        // Update view
        playerViewDatabase.on('value', map => updateMap(map.val()));
        tileSize.on('value', size => console.log(size.val()));

    }, []);


    //todo return based on map.. return loading screen if map empty, otherwise display map.
if (map.length == 1) {
    return (
        <View>
            <h1>
                Waiting for map to generate
            </h1>
        </View>
    );
}
    return (
        <View>
            <h1>
                <div className={'map'}>
                <Grid width={map[0].length} height={map.length} images={images} tiles={map}/>
                </div>
            </h1>
        </View>
    );
}
export default PlayerView
