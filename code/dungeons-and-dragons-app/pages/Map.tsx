import React from 'react';
import { View } from 'react-native';

// Import styles
import '../styles/style.css'
import GridOther from "../components/GridOther";

const Home = () => {

    const images : JSX.Element[] = [<img className="grid_img" src="https://pngimg.com/uploads/square/square_PNG24.png"/>]
    const tiles : number[][] = [[0,0],[0,0]]

    return (
        <View>
            <GridOther width={2} height={2} images={images} tiles={tiles} />
        </View>
    );
}
export default Home
