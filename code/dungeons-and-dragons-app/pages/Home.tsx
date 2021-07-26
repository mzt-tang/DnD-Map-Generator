import React, { useState } from 'react';
import {View} from "react-native";
import LargeButton from "../components/LargeButton";


const Home = () => {


    return (
        <View>
            <div>
                <LargeButton buttonString={"DM View"} buttonRoute={"/dm"}/>
                <LargeButton buttonString={"Player View"} buttonRoute={"/player"}/>
            </div>
        </View>

    );
}

export default Home
