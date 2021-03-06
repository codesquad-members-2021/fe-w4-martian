<<<<<<< HEAD
import { communicate } from "./communication/communication.js";
=======
import { communicate } from "./communication/communicate.js";
<<<<<<< HEAD
>>>>>>> ac5db29 (Merge Conflicts)
import { hexadecimals, selectors } from "./util.js";
import { drawRoulette } from "./roulette.js";

const { sendToEarthButton, sentContentHex, receivedContentHex, translatorButton, receivedContentText } = selectors;
=======
// import Chart from "chart.js";
import { drawRoulette } from "./chart.js";

// const receivedContent = document.querySelector(".receivedContent");
const translatorButton = document.querySelector(".translate__button");
const sentContentHex = document.querySelector(".sentContent__hex");
// const sentContentText = document.querySelector(".sentContent__text");
// text도 화면에 보여주기??
const sendToEarthButton = document.querySelector(".sendContent__button");
const receivedContentHex = document.querySelector(".receivedContent__hex");
const receivedContentText = document.querySelector(".receivedContent__text");

>>>>>>> e63811c ([Create] Roulette)
const senders = { sentContentHex, sendToEarthButton };
const receivers = { receivedContentHex, translatorButton, receivedContentText };
communicate(senders, receivers);
// myChart;

const width = 500;
const height = 500;

<<<<<<< HEAD
const myRoulette = document.querySelector("#myRoulette");
<<<<<<< HEAD
myRoulette.innerHTML = drawRoulette(Math.floor(hexadecimals.length / 2));
=======
myRoulette.innerHTML = getRoulette(Math.floor(hexadecimals.length / 2));
=======
drawRoulette(width, height);
>>>>>>> e63811c ([Create] Roulette)
>>>>>>> ac5db29 (Merge Conflicts)
