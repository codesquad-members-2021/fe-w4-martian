import { rotateArrow } from './arrow.js';
import { renderBlingText, renderPlate } from './canvas.js';
import { HexArrToString, stringToHexArr, getHexIdx, hexCodeArr } from './util/calculate.js';
import { go, _ } from './util/util.js';
const { log } = console;

const receiveBox = _.$('.receive>input');

//초기 원판 render
renderPlate();

//초기 전송 단어
const word = 'he';

//1. 문자=>hex Arr
const parsedWord = stringToHexArr(word); //go(word,stringToHexArr)

//2. 5초-2초 간격으로 나누기
for (let i = 0; i < parsedWord.length; i++) {
  setTimeout(() => {
    new Promise((res, rej) => {
      if (i !== 0) receiveText(' ', receiveBox);
      res(parsedWord[i]);
    }).then((res) => {
      const chars = parsedWord[i].split('');
      for (let j = 0; j < chars.length; j++) {
        new Promise((res, rej) => {
          setTimeout(() => {
            res(chars[j]);
          }, 2000 * j);
        })
          .then(arrowRotate)
          .then((idx) => {
            const hexValue = hexCodeArr[idx];
            receiveText(hexValue, receiveBox);
            return idx;
          })
          .then(blingText);
      }
    });
    clearBling();
  }, 5000 * i);
}

//3. 화살표 회전
let beforeIdx = 0;
const arrowRotate = (idx) => {
  const targetIdx = getHexIdx(idx);
  rotateArrow(beforeIdx, targetIdx);
  beforeIdx = targetIdx;
  return targetIdx;
};

//4. 수신 box에 입력하기

const receiveText = (value, inputBox) => {
  inputBox.value += value;
};

// 5. 글자 반짝이기
let renderTimer = null;
let blingTimer = null;
const blingText = (idx) => {
  if (blingTimer || renderTimer) clearBling(blingTimer, renderTimer);
  blingTimer = setInterval(renderBlingText.bind(this, idx), 200);
  renderTimer = setInterval(renderPlate, 400);
};

const clearBling = (blingTimer, renderTimer) => {
  clearInterval(blingTimer);
  clearInterval(renderTimer);
  renderPlate();
};
