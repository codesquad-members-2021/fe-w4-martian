import { drawCircle, renderNumbers } from "./render.js";
import { dom } from "./dom.js";
import { angleList } from "./angles.js";
import { getHexFromMsg, getEngFromHex, getIdxFromChar } from "./convert.js";

const MESSAGE_FROM_EARTH = "hello";
let hexMsg = getHexFromMsg(MESSAGE_FROM_EARTH);


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



const runMode = (mode) => {
    if (mode === "수신모드") runReceiveMode();
    else runSendMode();
}


const runReceiveMode = () => {

    timer(1000, "수신모드");
}

const activeBtn = (button) => {
    button.disabled = false;
}


const rotateArrow = (char) => {
    const idx = getIdxFromChar(char);
    dom.arrow.style.transform = `rotate(` + angleList[idx] + `turn)`;

}

const updateHexInfo = (char) => {

    dom.hexInfo.input.value += char;

    if (dom.hexInfo.input.value.length % 3 === 0) {
        dom.hexInfo.input.value = dom.hexInfo.input.value.slice(0, -1);
        dom.hexInfo.input.value += " " + char;
    }
}

const updateRealtimeStr = () => {
    setTimeout(() => {
        dom.strInfo.str.innerHTML = getHexFromMsg(dom.strInfo.input.value);
        updateRealtimeStr();
    }, 0);
}

const timer = (seconds, mode) => {
    setTimeout(() => {
        const firstChar = hexMsg.slice(0, 1);
        hexMsg = hexMsg.substring(1);
        if (dom.modeInfo.str.innerHTML !== mode) return;
        if (firstChar !== "") {
            rotateArrow(firstChar);
            updateHexInfo(firstChar);
            timer(1000, mode);
        } else {
            clearTimeout();
            activeBtn(dom.hexInfo.button);
        }

    }, seconds);
}

const runSendMode = () => {
    console.log("sendMode run");


    dom.strInfo.button.addEventListener('click', () => {
        hexMsg = dom.strInfo.str.innerHTML;

        timer(1000, "발신모드");
    });
}

const onEvent = (target, event, func) => {
        target.addEventListener(`${event}`, () => {
            func();
        });
    }

    const translate = () => {
        const message = getEngFromHex(dom.hexInfo.input.value);

        alert(message);
    }

    const init = () => {
        onEvent(dom.hexInfo.button, 'click', translate);
        drawCircle();
        renderNumbers();
        toggleMode("click", dom.modeInfo.button, dom.modeInfo.str, [dom.hexInfo.button, dom.strInfo.button]);
        runMode(dom.modeInfo.str.innerHTML);
        updateRealtimeStr();
    }

    init();