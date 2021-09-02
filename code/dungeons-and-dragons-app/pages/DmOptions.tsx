import {View} from "react-native";
import React from "react";
import {Typography} from "@material-ui/core";
import ThemeSelect from "../components/ThemeSelect";
import CodeInput from "../components/CodeInput";
import SmallMenuButton from "../components/SmallMenuButton";
import SmallBackButton from "../components/SmallBackButton";


const DmOptions = () => {

    let code : string = "";

    function handleCodeChange(newcode : string){
        code = newcode;
    }

    function fetchCode() : string {
        return code;
    }

    let characters = "abcdefghijklmnopqrstuvwxyz";
    let charactersLength : number = 26;
    let codeLength : number = 5;

    function genRandomCode() : string {
        let result : string = '';
        for ( var i = 0; i < codeLength; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    return (
        <View>
            <div className={"backgroundImage"} >
                <div className={"dmOptionBox"} >
                    <Typography variant={"h2"} className={"dmTitle"}>
                        Dungeon Master Options
                    </Typography>
                    <div className={"dmOptionLeft"}>
                        <Typography variant={"h4"} className={"dmSubtitle"}>
                            Load Existing Game
                        </Typography>
                        <CodeInput defaultText={""} labelText={"Enter a Game Code Here"} onCodeChange={handleCodeChange} />
                        <div className={"loadGameButtons"}>
                            <SmallBackButton buttonString={"Back"} buttonRoute={""} />
                            <SmallMenuButton buttonString={"Load Game"} buttonRoute={"/dm"} code={fetchCode}/>
                        </div>
                    </div>
                    <div className={"dmOptionRight"}>
                        <Typography variant={"h4"} className={"dmSubtitle"}>
                            New Game
                        </Typography>
                        <ThemeSelect themeList={["Caves","Dungeon","Underground Mansion"]} />
                        <div className={"createButton"}>
                            <SmallMenuButton buttonString={"Create"} buttonRoute={"/dm"} code={genRandomCode}/>
                        </div>
                    </div>
                </div>
            </div>
        </View>
    );
}
export default DmOptions
