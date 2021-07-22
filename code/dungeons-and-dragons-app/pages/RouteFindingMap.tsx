import React, { useState } from 'react';

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

import Pixel from '../components/Pixel';
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
            <Map images={images} />
        </div>
    );
}