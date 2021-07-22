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

    for (let i:number = 0; i < props.width; i++) {
        //  row
        let row : JSX.Element[] = []
        for (let j:number = 0; j < props.height; j++) {
            //  col
            // numbers should reference a tile in images
            let num = props.tiles[i][j];
            let imagelink = props.images[num]
            if (num == 0){

                if (i == 0 || j == 0 || i == props.width-1 || j == props.height-1){
                    imagelink = props.images[12]
                }

                if (i > 0 && j > 0 && i < props.width-1 && j < props.height-1){
                    // Need to check tiles left, right, above, below, above left, above right, below left, below right

                    // Checks for tiles in the corners, if there is one floor tile in one corner only
                    // Check for three tiles, in a corner formation around the current tile
                    if (props.tiles[i-1][j] == 1 && props.tiles[i-1][j-1] == 1 && props.tiles[i][j-1] == 1){
                        imagelink = props.images[3]
                    }
                    else if (props.tiles[i-1][j] == 1 && props.tiles[i-1][j+1] == 1 && props.tiles[i][j+1] == 1) {
                        imagelink = props.images[6]
                    }
                    else if (props.tiles[i+1][j] == 1 && props.tiles[i+1][j-1] == 1 && props.tiles[i][j-1] == 1) {
                        imagelink = props.images[4]
                    }
                    else if (props.tiles[i+1][j] == 1 && props.tiles[i+1][j+1] == 1 && props.tiles[i][j+1] == 1) {
                        imagelink = props.images[5]
                    }// Checks for if there are floor tiles adjacent to the current tile
                    else if (props.tiles[i-1][j] == 1){
                        imagelink = props.images[8]
                    }
                    else if (props.tiles[i+1][j] == 1){
                        imagelink = props.images[7]
                    }
                    else if (props.tiles[i][j-1] == 1){
                        imagelink = props.images[9]
                    }
                    else if (props.tiles[i][j+1] == 1){
                        imagelink = props.images[10]
                    }
                    else if (props.tiles[i-1][j-1] == 1 && props.tiles[i-1][j] == 0 && props.tiles[i-1][j+1] == 0 && props.tiles[i][j-1] == 0 && props.tiles[i][j+1] == 0 && props.tiles[i+1][j-1] == 0 && props.tiles[i+1][j+1] == 0) {
                        imagelink = props.images[5]
                    }
                    else if (props.tiles[i+1][j-1] == 1 && props.tiles[i-1][j] == 0 && props.tiles[i-1][j+1] == 0 && props.tiles[i][j-1] == 0 && props.tiles[i][j+1] == 0 && props.tiles[i-1][j-1] == 0 && props.tiles[i+1][j+1] == 0){
                        imagelink = props.images[6]
                    }
                    else if (props.tiles[i-1][j+1] == 1 && props.tiles[i-1][j] == 0 && props.tiles[i-1][j-1] == 0 && props.tiles[i][j-1] == 0 && props.tiles[i][j+1] == 0 && props.tiles[i+1][j-1] == 0 && props.tiles[i+1][j+1] == 0){
                        imagelink = props.images[4]
                    }
                    else if (props.tiles[i+1][j+1] == 1 && props.tiles[i-1][j] == 0 && props.tiles[i-1][j+1] == 0 && props.tiles[i][j-1] == 0 && props.tiles[i][j+1] == 0 && props.tiles[i+1][j-1] == 0 && props.tiles[i-1][j-1] == 0){
                        imagelink = props.images[3]
                    }
                    else {
                        let countCorners = 0;
                        if (props.tiles[i-1][j-1] == 1) {
                            countCorners++;
                        }
                        if (props.tiles[i+1][j-1] == 1) {
                            countCorners++;
                        }
                        if (props.tiles[i-1][j+1] == 1) {
                            countCorners++;
                        }
                        if (props.tiles[i+1][j+1] == 1) {
                            countCorners++;
                        }

                        if (countCorners > 0) {
                            imagelink = props.images[11]
                        }
                    }

                    // Check and count how many corner tiles there are around the current tile, if there are more than two, 
                    // and none of the other conditions are met, put in another tile type.

                }
            }
            row.push(imagelink)
        }
        rows.push(row)
    }

    return (
        <div className="grid-display" style={mapStyle(props.width,props.height)}>{rows}</div>
    );

}



export default GridOther
