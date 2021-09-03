import React, { useState } from 'react';
import { View, Pressable, Text } from "react-native";
import LargeButton from "../components/LargeButton";
import '../styles/style.css'
import { Typography } from "@material-ui/core";


const Home = () => {

    const [theme, setTheme] = useState("cave");

    return (
        <View>
            <div className={"container"}>
                <div className={"homeButtons"}>
                    <LargeButton buttonString={"DM View"} buttonRoute={"/playeroptions"} leftAndRightPadding={110} buttonProps={theme} />
                    <LargeButton buttonString={"Player View"} buttonRoute={"/dmoptions"} leftAndRightPadding={25} buttonProps={""} />
                    <Pressable onPress={() => setTheme("sand")}>
                        <Text>Sand Theme</Text>
                    </Pressable>
                </div>
            </div>
        </View>
    )
}

export default Home
