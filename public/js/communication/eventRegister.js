import _ from '../util.js';
import {charToHex, hexToChar} from './convert.js';
import { sendTimer } from './timer.js';

// 이벤트 등록 ------------------------------------------------------------------------
// 송수신 정보(button): click event
const translateBtnClickEvent = (translateBtn, receiveContentInput) => {
    _.addEvent(translateBtn, 'click', () =>
        translateBtnClickEventHandler(receiveContentInput)
    );
};
const translateBtnClickEventHandler = (receiveContentInput) => {
    let receiveContentValue = receiveContentInput.value;
    if (receiveContentValue.length === 0) return;
    receiveContentInput.value =  receiveContentValue.split(" ").map((v) => hexToChar(v)).join('');    
};

// 발신정보입력(input):  keyup event
const sendContentInputKeyUpEvent = (sendContentInput, receiveContentInput) => {
    _.addEvent(sendContentInput, 'keyup', (e) =>
        sendContentInputKeyUpEventHandler(e, receiveContentInput),
    );
};
const sendContentInputKeyUpEventHandler = ({target}, receiveContentInput) => { 
    const sendContentValue = target.value;       
    const arrCovertHex = sendContentValue.split('').map((v) => charToHex(v).toUpperCase() );    
    receiveContentInput.value = arrCovertHex.join(' ');
};

// 발신정보입력(btn):  click event
const sendBtnClickEvent = (sendBtn, sendContentInput, anotherReceiveContentInput) => {
    _.addEvent(sendBtn, 'click', () =>
        sendBtnClickEventHandler(sendContentInput, anotherReceiveContentInput),
    );
};
const sendBtnClickEventHandler = (sendContentInput, anotherReceiveContentInput) => {
    let sendContentValue = sendContentInput.value;
    if (sendContentValue.length === 0) return;
    
    if (anotherReceiveContentInput.value.length > 0) 
        anotherReceiveContentInput.value = '';
    const convertHex = sendContentValue.split('').map((v) => charToHex(v).toUpperCase()).join(" ");
    
    let startCharPos = 0;
    const timeout = 2000;    
    sendTimer(convertHex, anotherReceiveContentInput, startCharPos, timeout)
        .then((ok) => console.log(ok))
        .catch((err) => console.error(err.message));
};

// [F] setCommunicate, 최종 실행용  ------------------------------------------------------------------------
const setCommunicate = (transceiverParts, anotherTransceiverParts) => {
    const { receiveContentInput, translateBtn, sendContentInput, sendBtn } = transceiverParts;
    const { receiveContentInput: anotherReceiveContentInput } = anotherTransceiverParts;

    translateBtnClickEvent(translateBtn, receiveContentInput);    
    sendContentInputKeyUpEvent(sendContentInput, receiveContentInput);
    sendBtnClickEvent(sendBtn, sendContentInput, anotherReceiveContentInput);  
};

export default setCommunicate;