import {View} from "react-native";
import React from "react";
import LargeButton from "../components/LargeButton";
import {Typography} from "@material-ui/core";


const DmOptions = () => {
    return (
        <View>
            <div className={"backgroundImage"} >
            <Typography variant={"h2"}>
                Player Options
            </Typography>
            <LargeButton buttonString={"Load existing game"} buttonRoute={"/dm"} />
            <LargeButton buttonString={"Create new game"} buttonRoute={"/dm"} />
            </div>
        </View>
    );
}
export default DmOptions
