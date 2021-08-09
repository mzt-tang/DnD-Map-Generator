import React, { useState } from 'react';
import {View} from "react-native";
import LargeButton from "../components/LargeButton";
import '../styles/style.css'
import {Typography} from "@material-ui/core";


const Home = () => {



    return (
        <View>
            <div className={"backgroundImage"}>
                <div className={"homeButtons"}>
                    <Typography variant={"h2"}>
                        What are you ..?
                    </Typography>
                     <LargeButton buttonString={"Player"} buttonRoute={"/playeroptions"} />
                     <LargeButton buttonString={"Dungeon Master"} buttonRoute={"/dmoptions"}/>
                </div>
            </div>
        </View>

    );
}

export default Home
