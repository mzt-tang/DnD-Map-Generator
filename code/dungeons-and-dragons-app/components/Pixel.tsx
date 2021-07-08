import React from 'react';


import Image1 from '../assets/TLCorner.png';
import Image2 from '../assets/BLCorner.png';
import Image3 from '../assets/BRCorner.png';
import Image4 from '../assets/TRCorner.png';
import Image5 from '../assets/WallBottom.png';
import Image6 from '../assets/WallTop.png';
import Image7 from '../assets/WallLeft.png';
import Image8 from '../assets/WallRight.png';
import Image9 from '../assets/Floor.png';
import Image10 from '../assets/Light.png';
import Image11 from '../assets/Dark.png';

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
    <img className="grid_img" src={Image11}/>
]

interface pixelProps {
    imageNumber: number
}

export default function pixel(props:pixelProps) {
    return (
        <div id="pixel">
            {images[props.imageNumber]}
        </div>
    )

}