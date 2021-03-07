import { _ } from "./util";
import { moveArrow } from "./arrow"

const str2ascArr = (str = input) => {
    let hexArr = [];
    str.split("").forEach(v => {
        let ascII2hex = v.charCodeAt().toString(16);
        hexArr.push(ascII2hex);
    });
    return hexArr
}

const asc2hex = (ascArr) => {
    let asc2hexArr = [];
    ascArr.forEach(v => asc2hexArr.push(String.fromCharCode("0x" + v)));
    return asc2hexArr
};

const devideArr = (hexArr) => { return hexArr.join("").split("").filter(v => v !== ",") };

const devideText = (str, n) => {
    let devidedByN = [];
    for (let i = 0; i <= str.length - n; i += n) {
        devidedByN.push(str.slice(i, i + n))
    }
    return devidedByN
};

const printData = ({ target, data, delayTime }) => {
    for (let i = 0; i < data.length; i++) {
        setTimeout(() => {
            const innerHtml = new Promise((resolve) => {
                target.innerHTML += data[i];
                resolve();
            })
            innerHtml
                .then(moveArrow())
        }, delayTime * i)
    }
};

const activateButton = ({ button, totalDelayTime }) => {
    new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, totalDelayTime)
    })
        .then(() => { button.disabled = false })
};

const printInterpretation = ({ target, data }) => {
    target.innerHTML = asc2hex(data).join("");
};

const printSendMessage = ({ sendMessage, target }) => {
    target.innerHTML = str2ascArr(sendMessage).join("")
};

export { str2ascArr, asc2hex, devideArr, devideText, printData, activateButton, printInterpretation, printSendMessage }

