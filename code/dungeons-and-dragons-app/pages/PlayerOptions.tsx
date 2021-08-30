import {View} from "react-native";
import React from "react";
import SmallMenuButton from "../components/SmallMenuButton";
import SmallBackButton from "../components/SmallBackButton"
import CodeInput from "../components/CodeInput";
import {Typography} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        headerTextStyle: {
            color: "#EA9DE4"
        },
    }),
);

const PlayerOptions = () => {
    const classes = useStyles();

    let code : string = "";

    function handleCodeChange(newcode : string){
        code = newcode;
    }

    return (
        <View>
            <div className={"backgroundImage"} >
                <div className={"playerOptionBox"} >
                    <Typography className={classes.headerTextStyle} variant={"h2"}>
                        Player Options
                    </Typography>
                    <CodeInput defaultText={""} labelText={"Enter a Game Code Here"} onCodeChange={handleCodeChange}/>
                    <div className={"playerOptionButtonDiv"}>
                        <SmallBackButton buttonString={"Back"} buttonRoute={"/home"} />
                        <SmallMenuButton buttonString={"Join game"} buttonRoute={"/player"} code={code}/>
                    </div>
                </div>
            </div>
        </View>
    );
}
export default PlayerOptions
