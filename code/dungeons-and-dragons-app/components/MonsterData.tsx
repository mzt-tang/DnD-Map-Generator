import React from "react";
import {View, Text} from "react-native";
import {MonsterInfo} from "./Map";



const MonsterData = (props : MonsterInfo | undefined) => {
    if(props === undefined || props.monster === undefined){
        return <View><Text>Waiting for monster data</Text></View>
    }

    return (
        <View>
            <table>
                <tbody>
                <tr>
                    <td>
                        <div className="td_head">name</div>
                    </td>
                    <td>
                        <div className="td_row_even">{props.monster.name}</div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className="td_head">size</div>
                    </td>
                    <td>
                        <div className="td_row_even">{props.monster.size}</div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className="td_head">type</div>
                    </td>
                    <td>
                        <div className="td_row_even">{props.monster.type}</div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className="td_head">subtype</div>
                    </td>
                    <td>
                        <div className="td_row_even">{props.monster.subtype}</div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className="td_head">alignment</div>
                    </td>
                    <td>
                        <div className="td_row_even">{props.monster.alignment}</div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className="td_head">armor_class</div>
                    </td>
                    <td>
                        <div className="td_row_even">{props.monster.armor_class}</div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className="td_head">armor_desc</div>
                    </td>
                    <td>
                        <div className="td_row_even">{props.monster.armor_desc}</div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className="td_head">hit_points</div>
                    </td>
                    <td>
                        <div className="td_row_even">{props.monster.hit_points}</div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className="td_head">hit_dice</div>
                    </td>
                    <td>
                        <div className="td_row_even">{props.monster.hit_dice}</div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className="td_head">strength</div>
                    </td>
                    <td>
                        <div className="td_row_even">{props.monster.strength}</div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className="td_head">dexterity</div>
                    </td>
                    <td>
                        <div className="td_row_even">{props.monster.dexterity}</div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className="td_head">constitution</div>
                    </td>
                    <td>
                        <div className="td_row_even">{props.monster.constitution}</div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className="td_head">intelligence</div>
                    </td>
                    <td>
                        <div className="td_row_even">{props.monster.intelligence}</div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className="td_head">wisdom</div>
                    </td>
                    <td>
                        <div className="td_row_even">{props.monster.wisdom}</div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className="td_head">charisma</div>
                    </td>
                    <td>
                        <div className="td_row_even">{props.monster.charisma}</div>
                    </td>
                </tr>
                </tbody>
            </table>
        </View>
    )
}

export default MonsterData
