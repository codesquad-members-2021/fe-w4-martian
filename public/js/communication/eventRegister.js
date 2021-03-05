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

    if (anotherReceiveInput.value.length > 0) anotherReceiveInput.value = '';

    const resultData = sendContentValue
        .split('')
        .map((v) => charToHex(v).toUpperCase())
        .join(' ');
    sendHiddenInput.dataset.send = resultData;
};

// dataset.send(data-send) 속성이 바뀌는 걸 감지하기 위해 MutationObserver 사용
const setMutationObserver = (node, nodeAttrName) => {
    const observer = new MutationObserver((mutations) => 
        mutations.forEach((mutation) => {
            const { type, attributeName } = mutation;
            if (type == 'attributes' && attributeName === nodeAttrName)
                console.log(`${nodeAttrName} change`);            
        })
    );
    observer.observe(node, { attributes: true });
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

    setInterval(() =>  console.log(sendHiddenInput.dataset.send) , 5000);

    // setMutationObserver(sendHiddenInput);
};

export default setCommunicate;
