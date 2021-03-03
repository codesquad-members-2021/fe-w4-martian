import { communicate } from "./communication/communicate.js";
<<<<<<< HEAD
<<<<<<< HEAD
import { hexadecimals, selectors } from "./util.js";
import { getRoulette } from "./roulette.js";

const { sendToEarthButton, sentContentHex, receivedContentHex, translatorButton, receivedContentText } = selectors;
=======
// import Chart from "chart.js";
import { drawRoulette } from "./chart.js";
=======
import { hexadecimals } from "./util.js";
// import { drawRoulette } from "./chart.js";
import { getRoulette } from "./roulette.js";
import MyPromise from "./Promise.js";
>>>>>>> 32c4567 ([Add] Promise)

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

<<<<<<< HEAD
const width = 500;
const height = 500;

<<<<<<< HEAD
const myRoulette = document.querySelector("#myRoulette");
myRoulette.innerHTML = getRoulette(Math.floor(hexadecimals.length / 2));
=======
drawRoulette(width, height);
>>>>>>> e63811c ([Create] Roulette)
=======
const myRoulette = document.querySelector("#myRoulette");
myRoulette.innerHTML = getRoulette(Math.floor(hexadecimals.length / 2));
>>>>>>> 32c4567 ([Add] Promise)
