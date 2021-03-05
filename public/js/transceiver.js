import { $ } from "./selectors";

//문자열을 아스키코드 배열로 반환하는 함수
const str2ascArr = (str = input) => {
    let hexArr = [];
    str.split("").forEach(v => {
        let ascII2hex = v.charCodeAt().toString(16);
        hexArr.push(ascII2hex);
    });
    return hexArr
}

//아스키코드를 16진수(0xOO)형태로 만들어 주는 함수
const asc2hex = (ascArr) => {
    let asc2hexArr = [];
    ascArr.forEach(v => asc2hexArr.push(String.fromCharCode("0x" + v)));
    return asc2hexArr
};

//배열을 하나씩 쪼개는 함수
const devideArr = (hexArr) => { return hexArr.join("").split("").filter(v => v !== ",") };

//문자열을 n개씩 쪼개는 함수
const devideText = (str, n) => {
    let devidedByN = [];
    for (let i = 0; i <= str.length - n; i += n) {
        devidedByN.push(str.slice(i, i + n))
    }
    return devidedByN
};


//배열을 인덱스마다 일정 시간 간격으로 innerHTML 해주는 함수
const printData = ({ target, data, delayTime }) => {
    for (let i = 0; i < data.length; i++) {
        setTimeout(() => {
            target.innerHTML += data[i]
        }, delayTime * i)
    }
};

//innerHTML이 다 끝났을때, 버튼을 활성화시켜주는 함수
const activateButton = ({ button, totalDelayTime }) => {
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, totalDelayTime)
    })
        .then(() => { button.disabled = false })
};

//버튼을 누르면 , 해석본을 innerHTML해주는 함수
const printInterpretation = ({ target, button, data }) => {
    button.addEventListener('click', function () {
        target.innerHTML = data.join("");
    })
};

//인풋 keyup시 target에 16진수로 바로 출력해주는 함수
const printSendMessage = ({ input, sendMessage, target }) => {
    input.addEventListener("keyup", () => {
        target.innerHTML = str2ascArr(sendMessage).join("")
    })
};

//해석된 16진수를 버튼을 누르면 송수신정보에 출력하는 함수
const printToEarthMessage = () => {
    $.sendMessageButton.addEventListener('click', () => {
        $.sendReceiveMessage.innerHTML =
            printData({
                target: $.sendReceiveMessage,
                data: $.interpretedSendMessage.innerHTML,
                delayTime: 500
            });
    })
};

export { str2ascArr, asc2hex, devideArr, devideText, printData, activateButton, printInterpretation, printSendMessage, printToEarthMessage }

