//arrow
import { _ } from './util/util.js';
import { getHexIdx } from './util/calculate.js';

const arrow = _.$('.arrow');

const isRightDir = (idx, targetIdx) => {
  const length = 16;
  const rightDir = Math.abs(idx - targetIdx);
  const leftDir = targetIdx > idx ? length + idx - targetIdx : length - idx + targetIdx;
  return rightDir < leftDir;
};

//dir이 true이면 시계방향
const getAngle = (targetIdx, dir) => {
  const oneAngle = 360 / 16;
  const defaultAngle = oneAngle / 2;
  let angle = defaultAngle + targetIdx * oneAngle;
  return dir ? angle : angle - 360;
};

const rotateArrow = (idx, targetIdx) => {
  const dir = isRightDir(idx, targetIdx);
  const arrowAngle = getAngle(targetIdx, dir);
  arrow.style.transform = `rotate(${arrowAngle}deg)`;
};

const initArrowRotate = (beforeIdx = 0) => (value) => {
  const targetIdx = getHexIdx(value);
  rotateArrow(beforeIdx, targetIdx);
  beforeIdx = targetIdx;
  return { value, idx: targetIdx };
};

/*
역할:16진수 받기
    16진수에 인덱스를 가져와서 rotateArrow(화살표 돌려주기)
    이전 위치 업데이트
*/
export const arrowRotate = initArrowRotate();

//dom control

import { _ } from './util/util.js';
import { hexCodeArr, hexArrToString } from './util/calculate.js';

const BLANK = ' ';

//수신 box에 입력하기
export const setReceiveBox = (idx, inputBox) => {
  if (idx === BLANK) inputBox.value += BLANK;
  else inputBox.value += hexCodeArr[idx];
  return idx;
};
//수신 박스 able로 만들기
export const makeBtnAble = (btn) => (btn.disabled = false);

//발신박스에 넣기
const setSendBox = (value, sendBox) => {
  sendBox.value = value;
};

const translateHex = (value) => {
  const hexArr = value.split(BLANK);
  return hexArrToString(hexArr);
};

export const translateForSend = (receiveBox, sendBox) => {
  const value = receiveBox.value;
  const translatedStr = translateHex(value);
  setSendBox(translatedStr, sendBox);
};

export const getinputValue = (input) => input.value;
export const initInput = (input) => {
  input.value = '';
};

//main

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
  sendBtn.addEventListener('click', sendMessageToEarth);
};

const isFirstIdx = (idx) => idx === 0;
const isLastIdx = (idx, arr) => idx === arr.length - 1;
const getinputValue = (input) => input.value;
const initInput = (input) => {
  input.value = '';
};

const sendMessage = (word) => {
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

const sendMessageToEarth = () => {
  initReceiveBox();
  const word = getSendBoxValue();
  sendMessage(word);
};

init();
sendMessage('h');
