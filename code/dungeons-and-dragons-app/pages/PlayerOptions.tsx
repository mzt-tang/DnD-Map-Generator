import {ActivityIndicator, View} from "react-native";
import React, {useState} from "react";
import SmallMenuButton from "../components/SmallMenuButton";
import SmallBackButton from "../components/SmallBackButton"
import CodeInput from "../components/CodeInput";
import {Typography} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        headerTextStyle: {
            color: "#EA9DE4"
        },
    }),
);

const PlayerOptions = () => {
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const classes = useStyles();

    const activityIndicator = <ActivityIndicator size="large" color="#00ff00"/>;

    return (
        <View>
            <div className={"backgroundImage"}>
                <div className={"playerOptionBox"}>
                    <Typography className={classes.headerTextStyle} variant={"h2"}>
                        Player Options
                    </Typography>
                    <CodeInput defaultText={""} labelText={"Enter a Game Code Here"} onCodeChange={setCode}/>
                    {loading ? activityIndicator : <View/>}
                    <div className={"playerOptionButtonDiv"}>
                        <SmallBackButton buttonString={"Back"} buttonRoute={"/home"}/>
                        <SmallMenuButton buttonString={"Join game"} buttonRoute={"/player"} code={() => code}
                                         creatingNewGame={false} disabled={loading} onclick={setLoading}/>
                    </div>
                </div>
            </div>
        </View>
    );
}
export default PlayerOptions
