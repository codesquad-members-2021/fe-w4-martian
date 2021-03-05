import { drawCircle, renderNumbers } from "./render.js";
import { dom } from "./dom.js";
import {angleList} from "./angles.js";


const MESSAGE_FROM_EARTH = "hello";

const getHexFromMsg = (msg) => {

    const engArray = Array.from(msg);
    const decArray = engArray.map((el) => el.charCodeAt(0));
    const hexArray = decArray.map((el) => el.toString(16))
    const hexStr = hexArray.join("");

    return hexStr;
}

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
    const SECONDS = 3000;
    setInterval(() => {
        let currentMode = dom.modeInfo.str.innerHTML
        if (currentMode === "수신모드") receiveMsg(MESSAGE_FROM_EARTH)  // 5초에 한 번씩 이 함수가 실행..
        else clearInterval();
    }, SECONDS);
}

const receiveMsg = (msg) => {                  
    let hexMsg = getHexFromMsg(msg);       // 5초에 한 번씩 이 함수가 실행..
    const time = () => {
        setTimeout(() => {

            console.log(hexMsg);    // 이 내부가 실행될때마다 앞자리가 하나씩 짤린 hexMsg를 리턴받자.. 
                                    // 잘린 앞자리는 rotateArrow(여기) 로..
            // time();              // setTimeout 재귀
        },0);
    }
    time();
}

const rotateArrow = (char) => {

    console.log(char)         //angleList[msg]

}

const runSendMode = () => {
    //   console.log("sendMode run")
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