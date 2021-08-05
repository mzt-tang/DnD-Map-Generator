import {View} from "react-native";
import React from "react";
import LargeButton from "../components/LargeButton";
import CodeInput from "../components/CodeInput";
import {Typography} from "@material-ui/core";


const PlayerOptions = () => {
    return (
        <View>
            <div className={"container"} >
                <div className={"playerOptionBox"} >
                    <Typography variant={"h2"}>
                        Player Options
                    </Typography>
                    <CodeInput defaultText={"123"} labelText={"Input Game Code"} />
                    <LargeButton buttonString={"Join game"} buttonRoute={"/player"} />
                </div>
            </div>
        </View>
    );
}
export default PlayerOptions
