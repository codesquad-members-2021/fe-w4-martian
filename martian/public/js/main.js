import { communicate } from "./communication/communication.js";
import { hexadecimals, selectors } from "./util.js";
import { drawRoulette } from "./roulette.js";

const { sendToEarthButton, sentContentHex, receivedContentHex, translatorButton, receivedContentText } = selectors;
const senders = { sentContentHex, sendToEarthButton };
const receivers = { receivedContentHex, translatorButton, receivedContentText };
communicate(senders, receivers);

const myRoulette = document.querySelector("#myRoulette");
myRoulette.innerHTML = drawRoulette(Math.floor(hexadecimals.length / 2));
