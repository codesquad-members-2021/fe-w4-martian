import MyPromise from './myPromise.js';
import { rotateArrow } from './arrow.js';
import { renderBlingText, renderPlate } from './canvas.js';
import { hexArrToString, stringToHexArr, getHexIdx, hexCodeArr } from './util/calculate.js';
import { go, _ } from './util/util.js';
const { log } = console;

const receiveBox = _.$('.receive>input');
const translateBtn = _.$('.receive>button');
const sendBox = _.$('.send>input');

translateBtn.addEventListener('click', translate);

//초기 원판 render
renderPlate();

//초기 전송 단어
const word = 'he';

//1. 문자=>hex Arr
const parsedWord = stringToHexArr(word); //go(word,stringToHexArr)
log(parsedWord);

//2. 5초-2초 간격으로 진행
new MyPromise(parsedWord, 5000)
  .then((value, idx) => {
    if (idx !== 0) setReceiveBox(' ', receiveBox); //글자 하나당 receiveBox에 띄어쓰기 추가(맨처음 제외)
    if (idx === parsedWord.length - 1) {
      setTimeout(() => {
        blingText({ idx: null, clear: true }); //글자 깜빡임 interval 제거 (마지막일 때)
        makeBtnAble(translateBtn);
      }, 5000);
    }
    return value;
  })
  .then((hex) => {
    const chars = hex.split('');
    new MyPromise(chars, 2000)
      .then(arrowRotate)
      .then((idx) => setReceiveBox(idx, receiveBox))
      .then((idx) => blingText.call(null, { idx, clear: false }));
  });

//3. 화살표 회전 -arrow.js
const initArrowRotate = (beforeIdx = 0) => (hex) => {
  const targetIdx = getHexIdx(hex);
  rotateArrow(beforeIdx, targetIdx);
  beforeIdx = targetIdx;
  return targetIdx;
};

const arrowRotate = initArrowRotate();

//4. 수신 box에 입력하기
const setReceiveBox = (idx, inputBox) => {
  if (idx === ' ') inputBox.value += ' ';
  else inputBox.value += hexCodeArr[idx];
  return idx;
};
//수신 박스 able로 만들기
const makeBtnAble = (btn) => (btn.disabled = false);

// 5. 글자 반짝이기
const initBlingText = (renderTimer = null, blingTimer = null) => ({ idx, clear = false }) => {
  console.log(clear);
  if (blingTimer || renderTimer) clearBling(blingTimer, renderTimer);
  if (!clear) {
    blingTimer = setInterval(renderBlingText.bind(this, idx), 200);
    renderTimer = setInterval(renderPlate, 400);
  }
};

const blingText = initBlingText();

const clearBling = (blingTimer, renderTimer) => {
  clearInterval(blingTimer);
  clearInterval(renderTimer);
  renderPlate();
};

//6. 해석하기

function translate() {
  const value = receiveBox.value;
  const translatedStr = translateHex(value);
  setSenddBox(translatedStr, sendBox);
}

const translateHex = (value) => {
  const hexArr = value.split(' ');
  return hexArrToString(hexArr);
};

const setSenddBox = (value, sendBox) => {
  sendBox.value = value;
};
