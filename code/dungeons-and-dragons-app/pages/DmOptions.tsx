import {View} from "react-native";
import React from "react";
import LargeButton from "../components/LargeButton";
import {Typography} from "@material-ui/core";
import ThemeSelect from "../components/ThemeSelect";


const DmOptions = () => {
    return (
        <View>
            <div className={"backgroundImage"} >
                <div className={"dmOptionBox"} >
                    <Typography variant={"h2"}>
                        Dungeon Master Options
                    </Typography>
                    <LargeButton buttonString={"Load existing game"} buttonRoute={"/dm"} />
                    <ThemeSelect themeList={["Caves","Dungeon","Underground Mansion"]} />
                    <LargeButton buttonString={"Create new game"} buttonRoute={"/dm"} />
                    <LargeButton buttonString={"Back"} buttonRoute={""} />
                </div>
            </div>
        </View>
    );
}
export default DmOptions
