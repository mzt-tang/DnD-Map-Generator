import {View} from "react-native";
import React from "react";
import SmallMenuButton from "../components/SmallMenuButton";
import CodeInput from "../components/CodeInput";
import {Typography} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        headerTextStyle: {
            color: "#Eddded"
        },
    }),
);

const PlayerOptions = () => {
    const classes = useStyles();

    return (
        <View>
            <div className={"backgroundImage"} >
                <div className={"playerOptionBox"} >
                    <Typography className={classes.headerTextStyle} variant={"h2"}>
                        Player Options
                    </Typography>
                    <CodeInput defaultText={""} labelText={"Enter a Game Code Here"} helperText={"*Required"} />
                    <div>
                        
                        <SmallMenuButton buttonString={"Join game"} buttonRoute={"/player"} />
                    </div>
                </div>
            </div>
        </View>
    );
}
export default PlayerOptions
