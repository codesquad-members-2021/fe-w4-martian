import _ from './util.js';
import createCanvas from "./createCanvas.js";
import convertCommunication from "./convert.js";

const marsCanvas = {
    canvas: _.$('.mars-transceiver'),
    color: '#42023F',
};
const earthCanvas = {
    canvas: _.$('.earth-transceiver'),
    color: "#1693DC",
};
createCanvas(marsCanvas);
createCanvas(earthCanvas);

const marsTransceiverReceiveWrap = _.$(".mars .transceiver__control__receive");
const marsTransceiverSendWrap = _.$(".mars .transceiver__control__send");

const marsTransceiverParts = {
    receiveContentInput: _.$(".received__text", marsTransceiverReceiveWrap),
    translateBtn: _.$(".translate__btn", marsTransceiverReceiveWrap),
    sendContentInput: _.$(".send__text", marsTransceiverSendWrap),    
    sendBtn: _.$(".send__btn", marsTransceiverSendWrap),
};

const earthTransceiverReceiveWrap = _.$(".earth .transceiver__control__receive");
const earthTransceiverSendWrap = _.$(".earth .transceiver__control__send");
const earthTransceiverParts = {
    receiveContentInput: _.$(".received__text", earthTransceiverReceiveWrap),
    translateBtn: _.$(".translate__btn", earthTransceiverReceiveWrap),
    sendContentInput: _.$(".send__text", earthTransceiverSendWrap),    
    sendBtn: _.$(".send__btn", earthTransceiverSendWrap),
};
convertCommunication(marsTransceiverParts);
convertCommunication(earthTransceiverParts);
