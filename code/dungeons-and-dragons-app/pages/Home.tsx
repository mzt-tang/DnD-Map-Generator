import React, { useState } from 'react';
import {View} from "react-native";
import LargeButton from "../components/LargeButton";
import {Typography} from "@material-ui/core";


const Home = () => {
    return (
        <View>
            <div className={"backgroundImage"}>
                <div className={"homeBox"}>
                    <Typography variant={"h2"} className={"homeTitle"}>
                        What are you ..?
                    </Typography>
                    <div className={"homeButtons"}>
                        <LargeButton buttonString={"Player"} buttonRoute={"/playeroptions"} leftAndRightPadding={110}/>
                        <LargeButton buttonString={"Dungeon Master"} buttonRoute={"/dmoptions"} leftAndRightPadding={25}/>
                    </div>
                </div>
            </div>
        </View>

    );
}

export default Home

