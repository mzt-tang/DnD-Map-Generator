import { Button, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { View } from 'react-native';
import CustomAppBar from '../Components/CustomAppBar';
import ContactButton from '../Components/ContactButton';

const Home = () => {

    // var count : number = 0; // Even though this is a mutable variable, the return will not recognise this.
    const [count, setCount] = useState(0); //This is a hook, allowing for dynamic changes to the display

    return (
        <View>

        </View>
    );
}

export default Home
