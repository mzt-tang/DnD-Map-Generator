import Image1 from "../assets/Dark.png";
import Image2 from "../assets/Light.png";
import Image3 from "../assets/New Tile Assets/floor_e.png";
import Image4 from "../assets/New Tile Assets/floor_w.png";
import Image5 from "../assets/New Tile Assets/floor_n.png";
import Image6 from "../assets/New Tile Assets/floor_s.png";
import Image7 from "../assets/New Tile Assets/floor_se.png";
import Image8 from "../assets/New Tile Assets/floor_sw.png";
import Image9 from "../assets/New Tile Assets/floor_ne.png";
import Image10 from "../assets/New Tile Assets/floor_nw.png";
import Image11 from "../assets/New Tile Assets/floor_e2.png";
import Image12 from "../assets/New Tile Assets/floor_w2.png";
import Image13 from "../assets/New Tile Assets/floor_n2.png";
import Image14 from "../assets/New Tile Assets/floor_s2.png";
import Image15 from "../assets/New Tile Assets/floor_se2.png";
import Image16 from "../assets/New Tile Assets/floor_sw2.png";
import Image17 from "../assets/New Tile Assets/floor_ne2.png";
import Image18 from "../assets/New Tile Assets/floor_nw2.png";
import Image19 from "../assets/New Tile Assets/floor_ns.png";
import Image20 from "../assets/New Tile Assets/floor_ew.png";
import Image21 from "../assets/New Tile Assets/floor_default.png";
import Image22 from "../assets/New Tile Assets/wall.png";
import Image23 from "../assets/New Tile Assets/wood_floor_default.png";
import Image24 from "../assets/New Tile Assets/dungeon_wall.png";
import Image25 from "../assets/New Tile Assets/dungeon_floor_e.png";
import React, {MouseEventHandler} from "react";
import {Text} from "react-native";

const getImages = () => {
    return [
        <img className="grid_img" src={Image1}/>,
        <img className="grid_img" src={Image2}/>,
        <img className="grid_img" src={Image3}/>,
        <img className="grid_img" src={Image4}/>,
        <img className="grid_img" src={Image5}/>,
        <img className="grid_img" src={Image6}/>,
        <img className="grid_img" src={Image7}/>,
        <img className="grid_img" src={Image8}/>,
        <img className="grid_img" src={Image9}/>,
        <img className="grid_img" src={Image10}/>,
        <img className="grid_img" src={Image11}/>,
        <img className="grid_img" src={Image12}/>,
        <img className="grid_img" src={Image13}/>,
        <img className="grid_img" src={Image14}/>,
        <img className="grid_img" src={Image15}/>,
        <img className="grid_img" src={Image16}/>,
        <img className="grid_img" src={Image17}/>,
        <img className="grid_img" src={Image18}/>,
        <img className="grid_img" src={Image19}/>,
        <img className="grid_img" src={Image20}/>,
        <img className="grid_img" src={Image21}/>,
        <img className="grid_img" src={Image22}/>,
    ]
}


export const getImageWithId = (id : string, index : number, userClicked: MouseEventHandler<HTMLImageElement>,theme:string) : JSX.Element  => {
    switch (index){
        case 0:  return <img className="grid_img" src={Image1} id={id} onClick={userClicked}/>
        case 1:  return <img className="grid_img" src={Image2} id={id} onClick={userClicked}/>
        case 2:  return <img className="grid_img" src={theme == "Caves" ? Image3 : Image25} id={id} onClick={userClicked}/>
        case 3:  return <img className="grid_img" src={Image4} id={id} onClick={userClicked}/>
        case 4:  return <img className="grid_img" src={Image5} id={id} onClick={userClicked}/>
        case 5:  return <img className="grid_img" src={Image6} id={id} onClick={userClicked}/>
        case 6:  return <img className="grid_img" src={Image7} id={id} onClick={userClicked}/>
        case 7:  return <img className="grid_img" src={Image8} id={id} onClick={userClicked}/>
        case 8:  return <img className="grid_img" src={Image9} id={id} onClick={userClicked}/>
        case 9:  return <img className="grid_img" src={Image10} id={id} onClick={userClicked}/>
        case 10: return <img className="grid_img" src={Image11} id={id} onClick={userClicked}/>
        case 11: return <img className="grid_img" src={Image12} id={id} onClick={userClicked}/>
        case 12: return <img className="grid_img" src={Image13} id={id} onClick={userClicked}/>
        case 13: return <img className="grid_img" src={Image14} id={id} onClick={userClicked}/>
        case 14: return <img className="grid_img" src={Image15} id={id} onClick={userClicked}/>
        case 15: return <img className="grid_img" src={Image16} id={id} onClick={userClicked}/>
        case 16: return <img className="grid_img" src={Image17} id={id} onClick={userClicked}/>
        case 17: return <img className="grid_img" src={Image18} id={id} onClick={userClicked}/>
        case 18: return <img className="grid_img" src={Image19} id={id} onClick={userClicked}/>
        case 19: return <img className="grid_img" src={Image20} id={id} onClick={userClicked}/>
        case 20: return <img className="grid_img" src={Image21} id={id} onClick={userClicked}/>
        case 21: return <img className="grid_img" src={theme == "Caves" ? Image22 : theme == "Underground Mansion" ? Image23 : Image24} id={id} onClick={userClicked}/>
        default: return <Text>Error</Text>
    }
}
export default getImages();
