import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Image1 from '../assets/TLCorner.png';
import Image2 from '../assets/BLCorner.png';
import Image3 from '../assets/BRCorner.png';
import Image4 from '../assets/TRCorner.png';
import Image5 from '../assets/WallBottom.png';
import Image6 from '../assets/WallTop.png';
import Image7 from '../assets/WallLeft.png';
import Image8 from '../assets/WallRight.png';
import Image9 from '../assets/Floor.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
      margin: 0,
    },
    gridList: {
      width: 1500,
      height: 900,
      padding: 0,
    },
  }),
);

class TileData {

    map(arg0: (tile: any) => JSX.Element): React.ReactNode {
        throw new Error('Method not implemented.');
    }

    img: string = Image1;
    cols: number = 1;

    constructor(type: number) {
        if (type == 1){
            this.img = Image1;
        }
        else if (type == 2){
            this.img = Image2;
        }
        else if (type == 3){
            this.img = Image1;
        }
        else if (type == 4){
            this.img = Image1;
        }
        else if (type == 5){
            this.img = Image1;
        }
        else if (type == 6){
            this.img = Image1;
        }
        else if (type == 7){
            this.img = Image1;
        }
        else if (type == 8){
            this.img = Image1;
        }
        else if (type == 9){
            this.img = Image1;
        }
    }
    
}

function fill(tileData: TileData[]) {
    for (let i = 0; i < (40*25); i++){
        tileData[i] = new TileData(1);
    }
}

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *     cols: 2,
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function ImageGridList() {
  const classes = useStyles();

  const tileData1: TileData[] = [];

    fill(tileData1);

  return (
    <div className={classes.root}>
      <GridList cellHeight={32} className={classes.gridList} cols={40}>
        {tileData1.map((tile) => (
          <GridListTile key={tile.img} cols={tile.cols}>
            <img src={tile.img} alt={""} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
