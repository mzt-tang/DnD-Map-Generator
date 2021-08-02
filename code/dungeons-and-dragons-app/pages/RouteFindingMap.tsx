import React, { useState } from 'react';

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

import Map from '../components/Map';

export default function routeFindingMap () {

    const [north, setNorth] = useState([0,0])
    const [no,setNo] = useState(1)
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
    var room : number[][] = [
        [8,8,8,8,8,8,8,8,8,8],
        [8,9,9,9,9,9,9,9,9,8],
        [8,9,9,9,9,9,9,9,9,8],
        [8,9,9,9,9,9,9,9,9,8],
        [8,9,9,9,9,9,9,9,9,8],
        [8,9,9,9,9,9,9,9,9,8],
        [8,9,9,9,9,9,9,9,9,8],
        [8,9,9,9,9,9,9,9,9,8],
        [8,8,8,8,8,8,8,8,8,8],
    ]

    return (
        <div id='route'>
            <Map images={images} ALL_ROOMS={[]} />
        </div>
    );
}
