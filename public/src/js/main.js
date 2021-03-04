import MyPromise from './myPromise.js';
import { arrowRotate } from './arrow.js';
import { renderPlate, blingText } from './canvas.js';
import { setInputValue, makeBtnAble, translateForSend } from './domControl.js';
import { stringToHexArr } from './util/calculate.js';
import { _, pipe, asyncForEach, promiseDelay } from './util/util.js';
const { log } = console;
const BLANK = ' ';
const receiveBox = _.$('.receive>input');
const sendBox = _.$('.send>input');
const translateBtn = _.$('.receive>button');
const sendBtn = _.$('.send>button');

//초기 원판 render

const init = () => {
  renderPlate();
  translateBtn.addEventListener('click', translateForSend.bind(null, receiveBox, sendBox));
  sendBtn.addEventListener('click', sendMessageToEarth);
};

const isLastIdx = (idx, arr) => idx === arr.length - 1;
const getSendBoxValue = () => sendBox.value;
const initReceiveBox = () => (receiveBox.value = '');

// 한단어의 16진수를 처리하는 함수 / 이름이 마땅히..생각이 안나네요
const dealChar = async (value, idx, arr) => {
  await promiseDelay({ value, idx }, idx === 0 ? 0 : 5000)
    .then(({ value, idx }) => {
      if (isLastIdx(idx, arr)) {
        setTimeout(() => {
          blingText({ idx: null, clear: true }); //글자 깜빡임 interval 제거
          makeBtnAble(translateBtn);
        }, 5000);
      }
      return value;
    })
    .then((value) => {
      const chars = value.split('');
      asyncForEach(dealHex, chars);
    });
};

//16진수 하나를 처리하는 함수 /
const dealHex = async (value, idx, arr) => {
  await promiseDelay({ value, idx }, idx === 0 ? 0 : 2000).then(({ value, idx }) => {
    arrowRotate(value);
    setInputValue(value, receiveBox);
    blingText({ value, clear: false });
    if (isLastIdx(idx, arr)) setInputValue(BLANK, receiveBox);
  });
};

const sendMessage = pipe(stringToHexArr, asyncForEach(dealChar));

const sendMessageToEarth = () => {
  initReceiveBox();
  const word = getSendBoxValue();
  sendMessage(word);
};

init();
sendMessage('he');
