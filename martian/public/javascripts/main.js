import { drawCircle, renderNumbers } from "./render.js";
import { dom } from "./dom.js";

const MESSAGE_FROM_EARTH = "hello";

const toggleMode = (event, trigger, target, buttonList) => {
    trigger.addEventListener(`${event}`, function () {
        changeInnerHtml(target, "수신모드", "발신모드");
        disableButton(target, buttonList);
        initInput([dom.hexInfo.input, dom.strInfo.input]);
        runMode(dom.modeInfo.str.innerHTML);
    });
}

const changeInnerHtml = (dom, before, after) => {
    dom.innerHTML = (dom.innerHTML === before) ? after : before;
    return dom.innerHTML;
}

const disableButton = (target, buttonList) => {
    if (target.innerHTML === "수신모드") {
        buttonList.forEach((el) => el.disabled = true);
    } else {
        buttonList.forEach((el) => {
            if (el.className === "hex_info_submit") el.disabled = true;
            else el.disabled = false;
        });
    }
}

const initInput = (inputList) => {
    inputList.forEach((el) => el.value = "");
}


const rotateObject = (event, target, angle) => {
    target.addEventListener(`${event}`, () => {
        angle += 0.0625;
        target.style.transform = `rotate(${angle}turn)`;
        console.log(angle);
    })
}

const runMode = (mode) => {
    
    if (mode === "수신모드") runReceiveMode();
    else runSendMode();
}

const runReceiveMode = () => {
    
    const SECONDS = 1000; 
    setInterval(() => {
        let currentMode = dom.modeInfo.str.innerHTML
        if(currentMode !== "수신모드") clearInterval();
        else receiveMsg(MESSAGE_FROM_EARTH);
    }, SECONDS);
}

const runSendMode = () => {
  
}

const receiveMsg = (msg) => {
    // console.log(msg);
}

const init = () => {
    const ROTATE_ANGLE = 0.03;

    drawCircle();
    renderNumbers();
    toggleMode("click", dom.modeInfo.button, dom.modeInfo.str, [dom.hexInfo.button, dom.strInfo.button]);
    rotateObject("click", dom.arrow, ROTATE_ANGLE);
    runMode(dom.modeInfo.str.innerHTML);
   
}
init();