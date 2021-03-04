import MyPromise from './myPromise.js';
import { arrowRotate } from './arrow.js';
import { renderPlate, blingText } from './canvas.js';
import { setReceiveBox, makeBtnAble, translateForSend } from './domControl.js';
import { stringToHexArr } from './util/calculate.js';
import { _ } from './util/util.js';
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
  sendBtn.addEventListener('click', marsToEarth);
};

const isFirstIdx = (idx) => idx === 0;
const isLastIdx = (idx, arr) => idx === arr.length - 1;

const earthToMars = (word) => {
  const parsedWord = stringToHexArr(word);
  parsedWord.forEach((value, idx) => {
    new MyPromise((res, rej) => {
      setTimeout(() => {
        res({ value, idx });
      }, 5000 * idx);
    })
      .then(({ value, idx }) => {
        if (!isFirstIdx(idx)) setReceiveBox(BLANK, receiveBox); //글자 하나당 receiveBox에 띄어쓰기 추가(맨처음 제외)
        return { value, idx };
      })
      .then(({ value, idx }) => {
        if (isLastIdx(idx, parsedWord)) {
          setTimeout(() => {
            blingText({ idx: null, clear: true }); //글자 깜빡임 interval 제거
            makeBtnAble(translateBtn);
          }, 5000);
        }
        return value;
      })
      .then((hex) => {
        const chars = hex.split('');
        chars.forEach((value, idx) => {
          new MyPromise((res, rej) => {
            setTimeout(() => {
              res(value);
            }, 2000 * idx);
          })
            .then(arrowRotate)
            .then((idx) => setReceiveBox(idx, receiveBox))
            .then((idx) => blingText.call(null, { idx, clear: false }));
        });
      });
  });
};

const marsToEarth = () => {
  initReceiveBox();
};

const getSendBoxValue = () => {};

const initReceiveBox = () => {
  receiveBox.value = '';
};

init();
earthToMars('h');
