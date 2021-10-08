import Image1 from "../assets/Dark.png";
import Image2 from "../assets/Light.png";
import Image3 from "../assets/Tile Images/floor_e.png";
import Image4 from "../assets/Tile Images/floor_w.png";
import Image5 from "../assets/Tile Images/floor_n.png";
import Image6 from "../assets/Tile Images/floor_s.png";
import Image7 from "../assets/Tile Images/floor_se.png";
import Image8 from "../assets/Tile Images/floor_sw.png";
import Image9 from "../assets/Tile Images/floor_ne.png";
import Image10 from "../assets/Tile Images/floor_nw.png";
import Image11 from "../assets/Tile Images/floor_e2.png";
import Image12 from "../assets/Tile Images/floor_w2.png";
import Image13 from "../assets/Tile Images/floor_n2.png";
import Image14 from "../assets/Tile Images/floor_s2.png";
import Image15 from "../assets/Tile Images/floor_se2.png";
import Image16 from "../assets/Tile Images/floor_sw2.png";
import Image17 from "../assets/Tile Images/floor_ne2.png";
import Image18 from "../assets/Tile Images/floor_nw2.png";
import Image19 from "../assets/Tile Images/floor_ns.png";
import Image20 from "../assets/Tile Images/floor_ew.png";
import Image21 from "../assets/Tile Images/floor_default.png";
import Image22 from "../assets/Tile Images/wall.png";
import Image23 from "../assets/Tile Images/wood_floor_default.png";
import Image24 from "../assets/Tile Images/dungeon_wall.png";
import Image26 from "../assets/Tile Images/dungeon_floor_e.png";
import Image27 from "../assets/Tile Images/dungeon_floor_w.png";
import Image28 from "../assets/Tile Images/dungeon_floor_n.png";
import Image29 from "../assets/Tile Images/dungeon_floor_s.png";
import Image30 from "../assets/Tile Images/dungeon_floor_se.png";
import Image31 from "../assets/Tile Images/dungeon_floor_sw.png";
import Image32 from "../assets/Tile Images/dungeon_floor_ne.png";
import Image33 from "../assets/Tile Images/dungeon_floor_nw.png";
import Image34 from "../assets/Tile Images/dungeon_floor_e2.png";
import Image35 from "../assets/Tile Images/dungeon_floor_w2.png";
import Image36 from "../assets/Tile Images/dungeon_floor_n2.png";
import Image37 from "../assets/Tile Images/dungeon_floor_s2.png";
import Image38 from "../assets/Tile Images/dungeon_floor_se2.png";
import Image39 from "../assets/Tile Images/dungeon_floor_sw2.png";
import Image40 from "../assets/Tile Images/dungeon_floor_ne2.png";
import Image41 from "../assets/Tile Images/dungeon_floor_nw2.png";
import Image42 from "../assets/Tile Images/dungeon_floor_ns.png";
import Image43 from "../assets/Tile Images/dungeon_floor_ew.png";
import Image44 from "../assets/Tile Images/wood_floor_entrance.png";
import Image45 from "../assets/Tile Images/wood_floor_exit.png";
import Image46 from "../assets/Tile Images/wall_entrance.png";
import Image47 from "../assets/Tile Images/wall_exit.png";
import Image48 from "../assets/Tile Images/dungeon_entrance.png";
import Image49 from "../assets/Tile Images/dungeon_exit.png";
import Image50 from "../assets/Tile Images/wall-skull.png";
import Image51 from "../assets/Tile Images/wall-rock.png";
import Image52 from "../assets/Tile Images/wood_floor_pillar.png"
import Image53 from "../assets/Tile Images/wood_floor_cracked.png"
import Image54 from "../assets/Tile Images/dungeon_wall_cracked.png"

import Overlay0 from "../assets/Overlay/overlay0.png"
import Overlay1 from "../assets/Overlay/overlay1.png"
import Overlay2 from "../assets/Overlay/overlay2.png"
import Overlay3 from "../assets/Overlay/overlay3.png"
import Overlay4 from "../assets/Overlay/overlay4.png"
import Overlay5 from "../assets/Overlay/overlay5.png"
import Overlay6 from "../assets/Overlay/overlay6.png"
import Overlay7 from "../assets/Overlay/overlay7.png"
import Overlay8 from "../assets/Overlay/overlay8.png"
import Overlay9 from "../assets/Overlay/overlay9.png"

 import React, {MouseEventHandler} from "react";

import {Text} from "react-native";

export const getImageWithId = (id : string, index : number, userClicked: MouseEventHandler<HTMLImageElement>,theme:string, width:number, height:number) : JSX.Element  => {
    switch (index){
        case 0:  return <img className="grid_img" src={Image1} id={id} onClick={userClicked} style={{width:width, height:height}}/>
        case 1:  return <img className="grid_img" src={Image2} id={id} onClick={userClicked} style={{width:width, height:height}}/>
        case 2:  return <img className="grid_img" src={theme == "Dungeon" ? Image26 : Image3} id={id} onClick={userClicked} style={{width:width, height:height}}/>
        case 3:  return <img className="grid_img" src={theme == "Dungeon" ? Image27 : Image4} id={id} onClick={userClicked} style={{width:width, height:height}}/>
        case 4:  return <img className="grid_img" src={theme == "Dungeon" ? Image28 : Image5} id={id} onClick={userClicked} style={{width:width, height:height}}/>
        case 5:  return <img className="grid_img" src={theme == "Dungeon" ? Image29 : Image6} id={id} onClick={userClicked} style={{width:width, height:height}}/>
        case 6:  return <img className="grid_img" src={theme == "Dungeon" ? Image30 : Image7} id={id} onClick={userClicked} style={{width:width, height:height}}/>
        case 7:  return <img className="grid_img" src={theme == "Dungeon" ? Image31 : Image8} id={id} onClick={userClicked} style={{width:width, height:height}}/>
        case 8:  return <img className="grid_img" src={theme == "Dungeon" ? Image32 : Image9} id={id} onClick={userClicked} style={{width:width, height:height}}/>
        case 9:  return <img className="grid_img" src={theme == "Dungeon" ? Image33 : Image10} id={id} onClick={userClicked} style={{width:width, height:height}}/>
        case 10: return <img className="grid_img" src={theme == "Dungeon" ? Image34 : Image11} id={id} onClick={userClicked} style={{width:width, height:height}}/>
        case 11: return <img className="grid_img" src={theme == "Dungeon" ? Image35 : Image12} id={id} onClick={userClicked} style={{width:width, height:height}}/>
        case 12: return <img className="grid_img" src={theme == "Dungeon" ? Image36 : Image13} id={id} onClick={userClicked} style={{width:width, height:height}}/>
        case 13: return <img className="grid_img" src={theme == "Dungeon" ? Image37 : Image14} id={id} onClick={userClicked} style={{width:width, height:height}}/>
        case 14: return <img className="grid_img" src={theme == "Dungeon" ? Image38 : Image15} id={id} onClick={userClicked} style={{width:width, height:height}}/>
        case 15: return <img className="grid_img" src={theme == "Dungeon" ? Image39 : Image16} id={id} onClick={userClicked} style={{width:width, height:height}}/>
        case 16: return <img className="grid_img" src={theme == "Dungeon" ? Image40 : Image17} id={id} onClick={userClicked} style={{width:width, height:height}}/>
        case 17: return <img className="grid_img" src={theme == "Dungeon" ? Image41 : Image18} id={id} onClick={userClicked} style={{width:width, height:height}}/>
        case 18: return <img className="grid_img" src={theme == "Dungeon" ? Image42 : Image19} id={id} onClick={userClicked} style={{width:width, height:height}}/>
        case 19: return <img className="grid_img" src={theme == "Dungeon" ? Image43 : Image20} id={id} onClick={userClicked} style={{width:width, height:height}}/>
        case 20: return <img className="grid_img" src={Image21} id={id} onClick={userClicked} style={{width:width, height:height}}/>
        case 21: return <img className="grid_img" src={theme == "Caves" ? Image22 : theme == "Underground Mansion" ? Image23 : Image24} id={id} onClick={userClicked} style={{width:width, height:height}}/>
        case 22: return <img className="grid_img" src={theme == "Caves" ? Image46 : theme == "Underground Mansion" ? Image44 : Image48} style={{width:width, height:height}} />
        case 23: return <img className="grid_img" src={theme == "Caves" ? Image47 : theme == "Underground Mansion" ? Image45 : Image49} style={{width:width, height:height}} />
        case 24: return <img className="grid_img" src={theme == "Caves" ? Image50 : theme == "Underground Mansion" ? Image52 : Image54} id={id} onClick={userClicked} style={{width:width, height:height}}/>
        case 25: return <img className="grid_img" src={theme == "Caves" ? Image51 : theme == "Underground Mansion" ? Image53 : Image54} id={id} onClick={userClicked} style={{width:width, height:height}}/>
        case 26: return <img className="grid_img" src={Overlay0} id={id} onClick={userClicked} style={{width:width, height:height}}/>
        case 27: return <img className="grid_img" src={Overlay1} id={id} onClick={userClicked} style={{width:width, height:height}}/>
        case 28: return <img className="grid_img" src={Overlay2} id={id} onClick={userClicked} style={{width:width, height:height}}/>
        case 29: return <img className="grid_img" src={Overlay3} id={id} onClick={userClicked} style={{width:width, height:height}}/>
        case 30: return <img className="grid_img" src={Overlay4} id={id} onClick={userClicked} style={{width:width, height:height}}/>
        case 31: return <img className="grid_img" src={Overlay5} id={id} onClick={userClicked} style={{width:width, height:height}}/>
        case 32: return <img className="grid_img" src={Overlay6} id={id} onClick={userClicked} style={{width:width, height:height}}/>
        case 33: return <img className="grid_img" src={Overlay7} id={id} onClick={userClicked} style={{width:width, height:height}}/>
        case 34: return <img className="grid_img" src={Overlay8} id={id} onClick={userClicked} style={{width:width, height:height}}/>
        case 35: return <img className="grid_img" src={Overlay9} id={id} onClick={userClicked} style={{width:width, height:height}}/>




        default: return <Text>Error</Text>
    }
}

