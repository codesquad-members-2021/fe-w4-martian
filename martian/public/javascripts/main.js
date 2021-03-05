const dom = {
    hexInfo: {
        input : document.querySelector(".hex_info_input"),
        button : document.querySelector(".hex_info_submit")
    },
    
    strInfo: {
        input : document.querySelector(".str_info_input"),
        button : document.querySelector(".str_info_submit")
    },
    
    modeInfo: {
        mode : document.querySelector(".current_mode"),
        button : document.querySelector(".toggle_mode")
    },
    
    arrow: document.querySelector(".material-icons")
}

import { drawCircle, renderNumbers } from "./render.js";
import { rotateObject } from "./rotateObj.js";
import { toggleMode } from "./manageState.js";


drawCircle();
renderNumbers();



const ANGLE = 0.03;
const buttonList = [dom.hexInfo.button, dom.strInfo.button];

toggleMode("click", dom.modeInfo.button, dom.modeInfo.mode, buttonList); 
rotateObject("click", dom.arrow, ANGLE);




