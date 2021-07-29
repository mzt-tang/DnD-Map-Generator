import React, { useState } from 'react';
import {View} from "react-native";
import LargeButton from "../components/LargeButton";
import '../styles/style.css'


const Home = () => {



    return (
        <View>
            <div className={"container"}>
            <div className={"homeButtons"}>
                <LargeButton buttonString={"DM View"} buttonRoute={"/dm"}/>
                <LargeButton buttonString={"Player View"} buttonRoute={"/player"}/>
            </div>
            </div>
        </View>

    );
}

export default Home
