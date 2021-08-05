import {View} from "react-native";
import React from "react";
import LargeButton from "../components/LargeButton";
import {Typography} from "@material-ui/core";


const DmOptions = () => {
    return (
        <View>
            <Typography variant={"h2"}>
                Player Options
            </Typography>
            <LargeButton buttonString={"Load existing game"} buttonRoute={"/dm"} />
            <LargeButton buttonString={"Create new game"} buttonRoute={"/dm"} />
        </View>
    );
}
export default DmOptions
