import {View} from "react-native";
import React from "react";
import LargeButton from "../components/LargeButton";


const DmOptions = () => {
    return (
        <View>
            <h1>
                Dm Options
            </h1>
            <LargeButton buttonString={"Load existing game"} buttonRoute={"/dm"} />
            <LargeButton buttonString={"Create new game"} buttonRoute={"/dm"} />
        </View>
    );
}
export default DmOptions
