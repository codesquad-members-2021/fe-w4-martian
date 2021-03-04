import _, { setCanvasInfo, createTransceiverParts } from './util.js';
import {createCanvas} from "./canvasController.js";
import setCommunicate from "./communication/eventRegister.js";

const marsCanvas = _.$('.mars-transceiver');
const marsCanvasColor = '#42023F';
const marsArrowImage = _.$('.mars .transceiver__view img');

const earthCanvas = _.$('.earth-transceiver');
const earthCanvasColor = '#1693DC';
const earthArrowImage = _.$('.earth .transceiver__view img');

const marsCanvasInfo = setCanvasInfo(marsCanvas, marsCanvasColor, marsArrowImage);
const earthCanvasInfo = setCanvasInfo(earthCanvas, earthCanvasColor, earthArrowImage);
createCanvas(marsCanvasInfo);
createCanvas(earthCanvasInfo);


const marsTransceiverReceiveWrap = _.$(".mars .transceiver__control__receive");
const marsTransceiverSendWrap = _.$(".mars .transceiver__control__send");
const earthTransceiverReceiveWrap = _.$(".earth .transceiver__control__receive");
const earthTransceiverSendWrap = _.$(".earth .transceiver__control__send");

const marsTransceiverParts = createTransceiverParts(marsTransceiverReceiveWrap, marsTransceiverSendWrap, marsCanvasInfo);
const earthTransceiverParts = createTransceiverParts(earthTransceiverReceiveWrap, earthTransceiverSendWrap, earthCanvasInfo);
setCommunicate(marsTransceiverParts, earthTransceiverParts);
setCommunicate(earthTransceiverParts, marsTransceiverParts);