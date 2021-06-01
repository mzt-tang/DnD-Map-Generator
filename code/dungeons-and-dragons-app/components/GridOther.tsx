import React from 'react';


// We establish Props as our "Parameters" for the GridOther
interface GridOtherProps {
    width : number,
    height : number,
    images : JSX.Element[],
    tiles : number[][]
}

const GridOther = (props : GridOtherProps) => {


    const mapStyle = function(width: number, height: number)
    {
        return {
            margin: 'auto',
            display: 'grid',
            gridTemplateColumns: 'repeat('+width+',max-content)',
            gridTemplateRows: 'repeat('+height+',max-content)',
            gridGap: '0px'
        }
    }

    let rows : JSX.Element[][] = []
    props.tiles.forEach(function(e1 : number[],index : number){
        //  row
        let row : JSX.Element[] = []
        e1.forEach(function(e2:number,index2:number){
            //  col
            // numbers should reference a tile in images
            const imagelink = props.images[e2]
            row.push(imagelink)

        })
        rows.push(row)
    })

    return (
        <div className="grid-display" style={mapStyle(props.width,props.height)}>{rows}</div>
    );

}



export default GridOther
