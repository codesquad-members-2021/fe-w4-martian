import _ from './util.js';
import createCanvas from "./createCanvas.js";
import convertCommunication from "./convert.js";

const canvas = _.$('#circular');
createCanvas(canvas);

const transceiverReceiveWrap = _.$(".transceiver__control__receive");
const transceiverSendWrap = _.$(".transceiver__control__send");

const transceiverParts = {
    receiveContentInput: _.$("input", transceiverReceiveWrap),
    translateBtn: _.$("button", transceiverReceiveWrap),
    sendContentInput: _.$(".send__text", transceiverSendWrap),
    sendContentCovert: _.$(".send__text--convert", transceiverSendWrap),
    sendToEarthBtn: _.$("button", transceiverSendWrap),
};

convertCommunication(transceiverParts);