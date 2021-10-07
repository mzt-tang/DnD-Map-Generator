import {View, Pressable, Text, ActivityIndicator} from "react-native";
import React, {useState} from "react";
import {Typography, Radio} from "@material-ui/core";
import ThemeSelect from "../components/ThemeSelect";
import CodeInput from "../components/CodeInput";
import SmallMenuButton from "../components/SmallMenuButton";
import SmallBackButton from "../components/SmallBackButton";
import GenRandomCode from "../utility/GenRandomCode";
import { useFonts } from 'expo-font';

const DmOptions = () => {

    let [fontsLoaded] = useFonts({
        'Title': require('../assets/Fonts/DraconisBold-qZxd6.ttf'),
      });

    const [theme, setTheme] = useState("Caves");
    const [code, setCode] = useState('')
    const [loading, setLoading] = useState(false);

    const activityIndicator = <ActivityIndicator size={60} color="#00ff00" style={{padding: 10}}/>;

    function genRandomCode(): string {
        return GenRandomCode()
    }

    return (
        <View>
            <div className={"backgroundImage"}>
                <div className={"dmOptionBox"}>
                    <Typography variant={"h2"} className={"dmTitle"} style={{fontFamily:'Title'}}>
                        Dungeon Master Options
                    </Typography>
                    <div className={"dmOptionLeft"}>
                        <Typography variant={"h4"} className={"dmSubtitle"} style={{fontFamily:'Title'}}>
                            Load Existing Game
                        </Typography>
                        <CodeInput defaultText={""} labelText={"Enter a Game Code Here"} onCodeChange={setCode}/>
                        {loading ? activityIndicator : <View/>}
                        <div className={"loadGameButtons"}>
                            <SmallBackButton buttonString={"Back"} buttonRoute={""}/>
                            <SmallMenuButton buttonString={"Load Game"} buttonRoute={"/dm"} code={() => code}
                                             buttonProp={""} creatingNewGame={false} disabled={loading}
                                             onclick={setLoading}/>
                        </div>
                    </div>
                    <div className={"dmOptionRight"}>
                        <Typography variant={"h4"} className={"dmSubtitle"} style={{fontFamily:'Title'}}>
                            New Game
                        </Typography>

                        <ThemeSelect themeList={["Caves", "Dungeon", "Underground Mansion"]} onChange={setTheme}
                                     theme={theme}/>
                        <div className={"createButton"}>
                            <SmallMenuButton buttonString={"Create"} buttonRoute={"/dm"} code={genRandomCode}
                                             buttonProp={theme} creatingNewGame={true}/>
                        </div>


                    </div>
                </div>
            </div>
        </View>
    );
}
export default DmOptions
