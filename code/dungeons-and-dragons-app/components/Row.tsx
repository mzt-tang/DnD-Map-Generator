import { PinDropSharp } from '@material-ui/icons';
import React, { useState } from 'react';
import Pixel from '../components/Pixel';


interface rowProps {
    width:number
    imageNumber:number
    images:JSX.Element[]
}

export default function row(props:rowProps) {
    var pixels = []
    for(var i:number = 0; i < props.width; i++) {
        pixels.push(<Pixel imageNumber={props.imageNumber}/>)
    }
    return (
        <div id='rows'>
            {pixels}
        </div>
    )
    
}