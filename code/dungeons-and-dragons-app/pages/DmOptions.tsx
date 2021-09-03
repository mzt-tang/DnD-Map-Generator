import {View, Pressable, Text} from "react-native";
import React, {useState} from "react";
import {Typography} from "@material-ui/core";
import ThemeSelect from "../components/ThemeSelect";
import CodeInput from "../components/CodeInput";
import SmallMenuButton from "../components/SmallMenuButton";
import SmallBackButton from "../components/SmallBackButton";


const DmOptions = () => {
    const [theme,setTheme] = useState("cave");
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
                        <CodeInput defaultText={""} labelText={"Enter a Game Code Here"}/>
                        <div className={"loadGameButtons"}>
                            <SmallBackButton buttonString={"Back"} buttonRoute={""} />
                            <SmallMenuButton buttonString={"Load Game"} buttonRoute={"/dm"} buttonProp={""} />
                        </div>
                    </div>
                    <div className={"dmOptionRight"}>
                        <Typography variant={"h4"} className={"dmSubtitle"}>
                            New Game
                        </Typography>
                        <Pressable onPress={() => setTheme("basement")}>
                            <Text>Basement</Text>
                        </Pressable>
                        <Pressable onPress={() => setTheme("cave")}>
                            <Text>Cave</Text>
                        </Pressable>
                        <ThemeSelect themeList={["Caves","Dungeon","Underground Mansion"]} />
                        <div className={"createButton"}>
                            <SmallMenuButton buttonString={"Create"} buttonRoute={"/dm"} buttonProp={theme}/>
                        </div>
                    </div>
                </div>
            </div>
        </View>
    );
}
export default DmOptions
