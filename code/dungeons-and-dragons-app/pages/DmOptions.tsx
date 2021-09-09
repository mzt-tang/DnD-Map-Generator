import { View, Pressable, Text } from "react-native";
import React, { useState } from "react";
import { Typography, Radio } from "@material-ui/core";
import ThemeSelect from "../components/ThemeSelect";
import CodeInput from "../components/CodeInput";
import SmallMenuButton from "../components/SmallMenuButton";
import SmallBackButton from "../components/SmallBackButton";


const DmOptions = () => {
    const [theme, setTheme] = useState("Caves");
    console.log(theme)
    return (
        <View>
            <div className={"backgroundImage"} >
                <div className={"dmOptionBox"} >
                    <Typography variant={"h2"} className={"dmTitle"}>
                        Dungeon Master Options
                    </Typography>
                    <div className={"dmOptionLeft"}>
                        <Typography variant={"h4"} className={"dmSubtitle"}>
                            Load Exisiting Game
                        </Typography>
                        <CodeInput defaultText={""} labelText={"Enter a Game Code Here"} />
                        <div className={"loadGameButtons"}>
                            <SmallBackButton buttonString={"Back"} buttonRoute={""} />
                            <SmallMenuButton buttonString={"Load Game"} buttonRoute={"/dm"} buttonProp={""} />
                        </div>
                    </div>
                    <div className={"dmOptionRight"}>
                        <Typography variant={"h4"} className={"dmSubtitle"}>
                            New Game
                        </Typography>

                        <ThemeSelect themeList={["Caves", "Dungeon", "Underground Mansion"]} onChange={setTheme} theme={theme} />
                        <div className={"createButton"}>
                            <SmallMenuButton buttonString={"Create"} buttonRoute={"/dm"} buttonProp={theme} />
                            {console.log(theme)}
                        </div>
                        

                    </div>
                </div>
            </div>
        </View>
    );
}
export default DmOptions
