import {View} from "react-native";
import React from "react";
import LargeButton from "../components/LargeButton";


const PlayerOptions = () => {
    return (
        <View>
            <h1>
                Player Options
            </h1>
            <LargeButton buttonString={"Join game"} buttonRoute={"/player"} />
        </View>
    );
}
export default PlayerOptions
