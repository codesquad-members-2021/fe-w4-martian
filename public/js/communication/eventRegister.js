import _ from '../util.js';
import {charToHex, hexToChar} from '../convert.js';
import { sendMessageAnotherPlanet } from './communicate.js';

// 이벤트 등록 ------------------------------------------------------------------------
// 송수신 정보, 해석하기(btn): click event
const translateBtnClickEvent = (translateBtn, receiveContentInput) => {
    _.addEvent(translateBtn, 'click', (e) =>
        translateBtnClickEventHandler(e, receiveContentInput)
    );
};
const translateBtnClickEventHandler = ({target}, receiveContentInput) => {
    let receiveContentValue = receiveContentInput.value;
    if (receiveContentValue.length === 0) return;
    receiveContentInput.value =  receiveContentValue.split(" ").map((v) => hexToChar(v)).join(''); 
    target.disabled = true;   
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

// 발신정보입력, 다른행성으로 메시지보내기(btn):  click event
const sendBtnClickEvent = (sendBtn, sendContentInput, anotherTransceiverParts) => {
    _.addEvent(sendBtn, 'click', () =>
        sendBtnClickEventHandler(sendContentInput, anotherTransceiverParts),
    );
};

const sendBtnClickEventHandler = (sendContentInput, anotherTransceiverParts) => {
    const {
        receiveContentInput: anotherReceiveInput,
        canvasInfo: anotherCanvasInfo,
        translateBtn: anotherTranslateBtn, 
    } = anotherTransceiverParts;

    let sendContentValue = sendContentInput.value;
    if (sendContentValue.length === 0) return;
    
    if (anotherReceiveInput.value.length > 0) 
        anotherReceiveInput.value = '';
     
    const infoFromPlanet = {
        anotherCanvasInfo,
        anotherInput: anotherReceiveInput,
        resultText: sendContentValue.split('').map((v) => charToHex(v).toUpperCase()).join(" "),
        charPos: 0
    };

    const timeout = 2000;    
    sendMessageAnotherPlanet(infoFromPlanet, timeout)
        .then(() => anotherTranslateBtn.disabled = false)
        .catch((err) => console.error(err.message));
};

// [F] setCommunicate, 최종 실행용  ------------------------------------------------------------------------
const setCommunicate = (transceiverParts, anotherTransceiverParts) => {
    const { receiveContentInput, translateBtn, sendContentInput, sendBtn } = transceiverParts;

    translateBtnClickEvent(translateBtn, receiveContentInput);    
    sendContentInputKeyUpEvent(sendContentInput, receiveContentInput);
    sendBtnClickEvent(sendBtn, sendContentInput, anotherTransceiverParts);  
};

export default setCommunicate;