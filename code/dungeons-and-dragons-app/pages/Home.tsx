import React, { useState } from 'react';
import { View, Pressable, Text } from "react-native";
import LargeButton from "../components/LargeButton";
import '../styles/style.css'
import { Typography } from "@material-ui/core";


const Home = () => {
    return (
        <View>
            <div className={"container"}>
                <div className={"homeButtons"}>
                    <LargeButton buttonString={"DM View"} buttonRoute={"/dmoptions"} leftAndRightPadding={110} buttonProps={""} />
                    <LargeButton buttonString={"Player View"} buttonRoute={"/playeroptions"} leftAndRightPadding={25} buttonProps={""} /> 
                </div>
            </div>
        </View>
    )
}

export default Home
