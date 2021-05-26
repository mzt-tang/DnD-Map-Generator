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

            {/*Displays the AppBar (Header Bar*/}
            <CustomAppBar headerLabel="Contact" />

            {/*Displays the Button to send you to the Contact Page*/}
            <ContactButton />

            {/*Displays the Incremented Count*/}
            <Typography variant="h6">
                {count} {/*Note that the Variable is in parentheses, since it is a variable*/}
            </Typography>

            {/*Create the Increment Button*/}
            <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    // count++; // Don't use count, as this is a "const"
                    setCount(count+1); // Use the method defined in the hook instead
                    console.log(count)
                }
                }>
                Increment
            </Button>

        </View>
    );
}

export default Home
