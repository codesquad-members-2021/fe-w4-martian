import _ from './util.js';
import createCanvas from "./createCanvas.js";
import convertCommunication from "./convert.js";

const canvas = _.$('#circular');
createCanvas(canvas);

const transceiverReceiveWrap = _.$(".transceiver__control__receive");
const transceiverSendWrap = _.$(".transceiver__control__send");

const transceiverParts = {
    receiveContentHex: _.$("input", transceiverReceiveWrap),
    translateBtn: _.$("button", transceiverReceiveWrap),
    sendContentHex: _.$("input", transceiverSendWrap),
    sendToEarthBtn: _.$("button", transceiverSendWrap),
};

convertCommunication(transceiverParts);