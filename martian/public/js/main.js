import { communicate } from "./communication/communicate.js";
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

const senders = { sentContentHex, sendToEarthButton };
const receivers = { receivedContentHex, translatorButton, receivedContentText };

communicate(senders, receivers);
// myChart;

const width = 500;
const height = 500;

drawRoulette(width, height);
