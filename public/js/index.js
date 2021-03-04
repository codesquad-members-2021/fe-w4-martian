import _, { setCanvasAndColor, createTransceiverParts } from './util.js';
import createCanvas from "./createCanvas.js";
import setCommunicate from "./communication/eventRegister.js";

const marsCanvas = setCanvasAndColor(_.$('.mars-transceiver'), '#42023F');
const earthCanvas = setCanvasAndColor(_.$('.earth-transceiver'), '#1693DC');
createCanvas(marsCanvas);
createCanvas(earthCanvas);

const marsTransceiverReceiveWrap = _.$(".mars .transceiver__control__receive");
const marsTransceiverSendWrap = _.$(".mars .transceiver__control__send");
const earthTransceiverReceiveWrap = _.$(".earth .transceiver__control__receive");
const earthTransceiverSendWrap = _.$(".earth .transceiver__control__send");

const marsTransceiverParts = createTransceiverParts(marsTransceiverReceiveWrap, marsTransceiverSendWrap);
const earthTransceiverParts = createTransceiverParts(earthTransceiverReceiveWrap, earthTransceiverSendWrap);
setCommunicate(marsTransceiverParts, earthTransceiverParts);
setCommunicate(earthTransceiverParts, marsTransceiverParts);