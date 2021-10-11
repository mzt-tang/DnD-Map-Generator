import React from 'react';
import {View} from "react-native";
import LargeButton from "../components/LargeButton";
import {Typography} from "@material-ui/core";
import {useFonts} from 'expo-font';

const Home = () => {
    let [fontsLoaded] = useFonts({
        'Title': require('../assets/Fonts/DraconisBold-qZxd6.ttf'),
    });
    return (
        <View>
            <div className={"backgroundImage"}>
                <div className={"homeBox"}>
                    <Typography variant={"h2"} className={"homeTitle"} style={{fontFamily: 'Title', fontSize: 100}}>
                        What are you ..?
                    </Typography>
                    <div className={"homeButtons"}>
                        <LargeButton buttonString={"Player"} buttonRoute={"/playeroptions"} leftAndRightPadding={110}
                                     buttonProps={''}/>
                        <LargeButton buttonString={"Dungeon Master"} buttonRoute={"/dmoptions"} leftAndRightPadding={25}
                                     buttonProps={''}/>
                    </div>
                </div>
            </div>
        </View>

    );
}

export default Home

