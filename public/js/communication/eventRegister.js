import _ from '../util.js';
import { charToHex, hexToChar } from '../convert.js';
import { sendMessageAnotherPlanet } from './communicate.js';

// 이벤트 등록 ------------------------------------------------------------------------
// 송수신 정보, 해석하기(btn): click event
const translateBtnClickEvent = (translateBtn, receiveContentInput) => {
    _.addEvent(translateBtn, 'click', (e) =>
        translateBtnClickEventHandler(e, receiveContentInput),
    );
};
const translateBtnClickEventHandler = ({ target }, receiveContentInput) => {
    let receiveContentValue = receiveContentInput.value;
    if (receiveContentValue.length === 0) return;
    receiveContentInput.value = receiveContentValue
        .split(' ')
        .map((v) => hexToChar(v))
        .join('');
    target.disabled = true;
};

// 발신정보입력(input):  keyup event
const sendContentInputKeyUpEvent = (sendContentInput, receiveContentInput) => {
    _.addEvent(sendContentInput, 'keyup', (e) =>
        sendContentInputKeyUpEventHandler(e, receiveContentInput),
    );
};
const sendContentInputKeyUpEventHandler = ({ target }, receiveContentInput) => {
    const sendContentValue = target.value;
    const arrCovertHex = sendContentValue
        .split('')
        .map((v) => charToHex(v).toUpperCase());
    receiveContentInput.value = arrCovertHex.join(' ');
};

// 발신정보입력, 다른행성으로 메시지보내기(btn):  click event
const sendBtnClickEvent = (transceiverParts, anotherTransceiverParts) => {
    const { sendBtn, sendContentInput, sendHiddenInput } = transceiverParts;
    const { receiveContentInput: anotherReceiveInput } = anotherTransceiverParts;

    _.addEvent(sendBtn, 'click', () =>
        sendBtnClickEventHandler(sendContentInput, sendHiddenInput, anotherReceiveInput)
    );
};

const sendBtnClickEventHandler = (sendContentInput, sendHiddenInput, anotherReceiveInput) => {
    let sendContentValue = sendContentInput.value;
    if (sendContentValue.length === 0) return;

    if (anotherReceiveInput.value.length > 0) 
        anotherReceiveInput.value = '';

    const resultData = sendContentValue
        .split('')
        .map((v) => charToHex(v).toUpperCase())
        .join(' ');
    sendHiddenInput.dataset.send = resultData;
};

// 몇 초마다 수신 체크 (5초마다 수신확인)
const checkReceive = (sendHiddenInput, anotherTransceiverParts, interval) => {
    setInterval(() => {                
        if (!sendHiddenInput.dataset.send) return;
        
        const {
            receiveContentInput: anotherReceiveInput,
            canvasInfo: anotherCanvasInfo,
            translateBtn: anotherTranslateBtn, 
        } = anotherTransceiverParts;

        const infoFromPlanet = {
            anotherCanvasInfo,
            anotherInput: anotherReceiveInput,
            resultData: sendHiddenInput.dataset.send,
            charPos: 0
        };
        sendHiddenInput.dataset.send = '';
    
        const timeout = 2000;    
        sendMessageAnotherPlanet(infoFromPlanet, timeout)
            .then(() => anotherTranslateBtn.disabled = false)
            .catch((err) => console.error(err.message));

    }, interval);
};

// [F] setCommunicate, 최종 실행용  ------------------------------------------------------------------------
const setCommunicate = (transceiverParts, anotherTransceiverParts) => {
    const {
        receiveContentInput,
        translateBtn,
        sendContentInput,
        sendHiddenInput,
    } = transceiverParts;

    translateBtnClickEvent(translateBtn, receiveContentInput);
    sendContentInputKeyUpEvent(sendContentInput, receiveContentInput);
    sendBtnClickEvent(transceiverParts, anotherTransceiverParts);
    
    const checkReceiveIntervalTime = 5000;
    checkReceive(sendHiddenInput, anotherTransceiverParts, checkReceiveIntervalTime);
};

export default setCommunicate;
