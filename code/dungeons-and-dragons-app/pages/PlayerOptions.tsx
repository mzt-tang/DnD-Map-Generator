import {View} from "react-native";
import React from "react";
import LargeButton from "../components/LargeButton";
import CodeInput from "../components/CodeInput";
import {Typography} from "@material-ui/core";


const PlayerOptions = () => {
    return (
        <View>
            <div className={"backgroundImage"} >
                <div className={"playerOptionBox"} >
                    <Typography variant={"h2"}>
                        Player Options
                    </Typography>
                    <CodeInput defaultText={"123"} labelText={"Enter a Game Code Here*"} helperText={"*Required"} />
                    <LargeButton buttonString={"Join game"} buttonRoute={"/player"} />
                </div>
            </div>
        </View>
    );
}
export default PlayerOptions
