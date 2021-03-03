import _ from './util.js';

// 영문자, 숫자 체크 (한글자씩)
const checkChar = (char) => {
    const regExr = /([A-Za-z0-9])/g;
    return char.length === 1 ? regExr.test(char) : false;
};

// 예외 키 처리
const checkKeyCode = (keyCode) => {
    // Backspace(8), Tab(9), Space(32), 왼쪽방향키(37), 오른쪽방향키(39), Delete(46)
    const excludeKeyCode = [8, 9, 32, 37, 39, 46];
    return excludeKeyCode.indexOf(keyCode) > -1;
};

// 한글 제거 
// (checkChar에서 한글 제대로 못 잡음.. 한글일 때 target.key가 Process라는 값으로 들어옴)
const deleteHangel = (target) => {
    const regExrHangel = /[\ㄱ-ㅎㅏ-ㅣ가-힣]/g;
    if (regExrHangel.test(target.value))
        target.value = target.value.replace(regExrHangel, '');
};

// 10진수 -> 16진수, 16진수 -> 10진수
const decToHex = (dec) => Number(dec).toString(16);
const hexToDec = (hex) => parseInt(hex, 16);

// 텍스트 -> 16진수
const charToHex = (char, delimiter = "") => `${decToHex(char.charCodeAt(0))}${delimiter}`;

// 발신정보입력(input):  keydown event
const sendContentInputKeyDownEvent = (sendContentInput) => {
    _.addEvent(sendContentInput, 'keydown', (e) =>
        sendContentInputKeyDownEventHandler(e),
    );
};
const sendContentInputKeyDownEventHandler = (e) => {
    const { key, target, keyCode } = e;
    deleteHangel(target);
    if (checkKeyCode(keyCode)) return;

    e.preventDefault();
    if (!checkChar(key)) return;
    target.value += key;
};

// 발신정보입력(btn):  click event
const sendToEarthBtnClickEvent = (sendToEarthBtn, sendContentInput) => {
    _.addEvent(sendToEarthBtn, 'click', () =>
        sendToEarthBtnClickEventHandler(sendContentInput),
    );
};

const sendToEarthBtnClickEventHandler = (sendContentInput) => {
    let sendContentValue = sendContentInput.value;
    if (sendContentValue.length === 0) return;

    const arrSendContent = sendContentValue.split('');
    const convertResult = arrSendContent.reduce((result, curr, idx) => {        
        const delim = (arrSendContent.length-1 === idx) ? "" : "|";
        const currToHex = charToHex(curr, delim);
        result += currToHex;
        return result;
    }, '');

    sendContentInput.value = convertResult;
};

// convertCommunication, 최종 실행용 
const convertCommunication = (transceiverParts) => {
    const {
        receiveContentInput,
        translateBtn,
        sendContentInput,
        sendToEarthBtn,
    } = transceiverParts;

    sendContentInputKeyDownEvent(sendContentInput);
    sendToEarthBtnClickEvent(sendToEarthBtn, sendContentInput);
};

export default convertCommunication;