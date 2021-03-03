import _ from './util.js';

const checkChar = (char) => {
    const regExr = /([A-Za-z])/g;
    return (char.length === 1) ? regExr.test(char) : false;
};

const decToHex = (dec) => Number(dec).toString(16);
const hexToDec = (hex) => parseInt(hex, 16);
const charToHex = (char) => decToHex(char.charCodeAt(0));

const sendContentInputKeyDownEvent = (sendContentInput, sendContentCovert) => {
    _.addEvent(sendContentInput, 'keydown', (e) =>
        sendContentInputKeyDownEventHandler(e, sendContentCovert),
    );
}
const sendContentInputKeyDownEventHandler = ({code, key}, sendContentCovert) => {    
    if (!checkChar(key)) return;        
    sendContentCovert.value += `${(charToHex(key))} `;

};

const convertCommunication = (transceiverParts) => {
    const {
        receiveContentInput,  
        translateBtn,
        sendContentInput,     
        sendContentCovert,
        sendToEarthBtn,
    } = transceiverParts;

    sendContentInputKeyDownEvent(sendContentInput, sendContentCovert);    
};

export default convertCommunication;
