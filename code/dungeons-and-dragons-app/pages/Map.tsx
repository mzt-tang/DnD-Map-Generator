import React from 'react';
import { View } from 'react-native';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import {GridList, GridListTile} from "@material-ui/core";

const tileData = [
    {
        img: '../assets/icon.png',
        author: 'michael',
        cols: 2,
        featured: true,
    },

    {
        img: 'icon.png',
        author: 'michael',
        cols: 2,
        featured: true,
    }

]

function render(x : string) {
    let imgSource = require(x);
    return (
        <View>
            <img src ={imgSource} />
        </View>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
        },
        gridList: {
            width: 500,
            height: 450,
        },
    }),
);

const Map = () => {
    const classes = useStyles();

    return (
        <View>
            <GridList cellHeight={160} className={classes.gridList} cols={3}>
                {tileData.map(tile => (
                    <GridListTile key={tile.img} cols={tile.cols || 1}>
                        render({tile.img});
                        <img src={tile.img}/>
                    </GridListTile>
                ))}
            </GridList>

        </View>
    );
}

export default Map
