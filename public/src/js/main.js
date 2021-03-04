import MyPromise from './myPromise.js';
import { arrowRotate } from './arrow.js';
import { renderPlate, blingText } from './canvas.js';
import { setReceiveBox, makeBtnAble, translateForSend } from './domControl.js';
import { getHexIdx, stringToHexArr } from './util/calculate.js';
import { _, asyncForEach, promiseDelay } from './util/util.js';
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

const isFirstIdx = (idx) => idx === 0;
const isLastIdx = (idx, arr) => idx === arr.length - 1;
const getSendBoxValue = () => sendBox.value;
const initReceiveBox = () => {
  receiveBox.value = '';
};
//prettier-ignore
const sendMessage = async (word) => {
  const parsedWord = stringToHexArr(word);
  asyncForEach(parsedWord, async (value, idx) => {
    await promiseDelay({ value, idx }, idx === 0 ? 0 : 5000)
      .then(({ value, idx }) => {
        if (!isFirstIdx(idx)) setReceiveBox(BLANK, receiveBox); //글자 하나당 receiveBox에 띄어쓰기 추가(맨처음 제외)
        if (isLastIdx(idx, parsedWord)) {
          setTimeout(() => {
            blingText({ idx: null, clear: true }); //글자 깜빡임 interval 제거
            makeBtnAble(translateBtn);
          }, 5000);
        }
        return value;
      })
      .then((value) => {
        const chars = value.split('');
        asyncForEach(chars, async (value, idx) => {
          await promiseDelay( value, idx === 0 ? 0 : 2000)
          .then((value) => {
            arrowRotate(value);
            setReceiveBox(value, receiveBox);
            blingText({ value, clear: false });
          });
        });
      });
  });
};

const sendMessageToEarth = () => {
  initReceiveBox();
  const word = getSendBoxValue();
  sendMessage(word);
};

init();
sendMessage('hk');
