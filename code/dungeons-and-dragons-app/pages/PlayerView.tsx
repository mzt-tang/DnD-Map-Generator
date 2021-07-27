import React, {ChangeEvent, useEffect, useState} from 'react';
import { View } from 'react-native';
import { db } from "../firebaseConfig";
import firebase from 'firebase';
import Image1 from "../assets/Dark.png";
import Image2 from "../assets/Light.png";
import Image3 from "../assets/TLCorner.png";
import Image4 from "../assets/BLCorner.png";
import Image5 from "../assets/BRCorner.png";
import Image6 from "../assets/TRCorner.png";
import Image7 from "../assets/WallBottom.png";
import Image8 from "../assets/WallTop.png";
import Image9 from "../assets/WallLeft.png";
import Image10 from "../assets/WallRight.png";
import Image11 from "../assets/Floor.png";
import GridOther from "../components/GridOther";
import '../styles/style.css'


const PlayerView = () => {

    const[map, setMap] = useState([[0]]);
    const[size, setSize] = useState(25); // set the tile size?

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
                This is the player view
            </h1>
        </View>
    );
}
    return (
        <View>
            <h1>
                This is the player view with updated map
                <div className={'map'}>
                <GridOther width={map[0].length} height={map.length} images={images} tiles={map}/>
                </div>
            </h1>
        </View>
    );
}
export default PlayerView
