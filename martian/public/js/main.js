import { communicate } from "./communication/communicate.js";
import { hexadecimals } from "./util.js";
// import { drawRoulette } from "./chart.js";
import { getRoulette } from "./roulette.js";
import MyPromise from "./Promise.js";

// const receivedContent = document.querySelector(".receivedContent");
const translatorButton = document.querySelector(".translate__button");
const sentContentHex = document.querySelector(".sentContent__hex");
// const sentContentText = document.querySelector(".sentContent__text");
// text도 화면에 보여주기??
const sendToEarthButton = document.querySelector(".sendContent__button");
const receivedContentHex = document.querySelector(".receivedContent__hex");
const receivedContentText = document.querySelector(".receivedContent__text");

const senders = { sentContentHex, sendToEarthButton };
const receivers = { receivedContentHex, translatorButton, receivedContentText };

communicate(senders, receivers);

const myRoulette = document.querySelector("#myRoulette");
myRoulette.innerHTML = getRoulette(Math.floor(hexadecimals.length / 2));
