// import {getCanvas} from '/js/canvas.js';
// getCanvas();

import {transmission} from "./transmission.js"

const receptInp = document.querySelector(".recept__inp");
const receptBtn = document.querySelector(".recept__btn");

const sendInp = document.querySelector(".send__inp");
const sendBtn = document.querySelector(".send__btn");
const sendTr = document.querySelector(".send__trans");

const senders = {sendInp, sendBtn, sendTr};
const receptors = {receptInp, receptBtn};

transmission(senders,receptors);
