import React, { useState } from 'react';
import {View, Pressable,Text} from "react-native";
import LargeButton from "../components/LargeButton";
import '../styles/style.css'


const Home = () => {

    const [theme,setTheme] = useState("cave");

    return (
        <View>
            <div className={"container"}>
            <div className={"homeButtons"}>
                <LargeButton buttonString={"DM View"} buttonRoute={"/dm"} buttonProps={theme}/>
                <LargeButton buttonString={"Player View"} buttonRoute={"/player"} buttonProps={""}/>
                <Pressable onPress={() => setTheme("sand")}>
                    <Text>Sand Theme</Text>
                </Pressable>
            </div>
            </div>

        </View>

    );
}

export default Home
