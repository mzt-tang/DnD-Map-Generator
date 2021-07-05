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

                    if (props.tiles[i-1][j-1] == 1 && props.tiles[i-1][j] == 0 && props.tiles[i-1][j+1] == 0 && props.tiles[i][j-1] == 0 && props.tiles[i][j+1] == 0 && props.tiles[i+1][j-1] == 0 && props.tiles[i+1][j+1] == 0) {
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

                    if (props.tiles[i-1][j] == 1){
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

                    // all above the only surrounding floor tiles? - yes then wall up tile
                    // all below tiles only surrounding floor tiles? - yes then wall below tile
                    // all left tiles only surrounding floor tiles? - yes then wall left tile
                    // all right tiles only surrounding floor tiles? - yes then wall right tile

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
                    }

                    // all left and above tiles the only surrouding floor tiles? - yes then corner top left tile
                    // all left and below tiles only surrounding floor tiles? - yes then corner below left tile
                    // all right and above tiles only surrounding floor tiles? - yes then corner above right tile
                    // all right and below tiles only surrounding floor tiles? - yes then corner below right tile

                    // bottom right the only floor tile? - yes then corner top left tile
                    // bottom left the only floor tile? - yes then corner top right tile
                    // top right the only floor tile? - yes then corner below left tile
                    // top left the only floor tile? - yes then corner below right tile
                }
            }
            row.push(imagelink)
        }
        rows.push(row)
    }

    //props.tiles.forEach(function(e1 : number[],index : number){
        //  row
      //  let row : JSX.Element[] = []
      //  e1.forEach(function(e2:number,index2:number){
            //  col
            // numbers should reference a tile in images
      //      const imagelink = props.images[e2]
      //      row.push(imagelink)

      //  })
      //  rows.push(row)
    //})

    return (
        <div className="grid-display" style={mapStyle(props.width,props.height)}>{rows}</div>
    );

}



export default GridOther
