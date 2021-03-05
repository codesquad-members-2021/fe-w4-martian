import { _ } from './util.js';
import { hexToDec } from './calculate.js';
import {
  canvas,
  ctx,
  getFigure,
  insertText,
  strokeFigure,
} from './drawTransceiver.js';

async function moveTransceiverArrow([...enCodedStrs]) {
  const delay = 3000;
  const msgLength = enCodedStrs.length;

  for (let i = 0; i < msgLength; i += 1) {
    const str = await delayPromise(enCodedStrs[i], delay);
    printEncodedTxt(enCodedStrs, i);
    pointAndBlink(str);

    //화살표가 모든 문자를 가리킨 이후 3초 후 인풋창을 초기화 해준다.
    if (i === msgLength - 1) {
      changeBtnStatus();
    }
  }
}

function delayPromise(enCodedStrs, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(enCodedStrs), delay);
  });
}

function printEncodedTxt(enCodedStrs, idx) {
  const { encodedInput } = getInputs();
  const encodedText = enCodedStrs.slice(0, idx + 1).join('');
  encodedInput.value = encodedText;
}

function changeBtnStatus() {
  const { translateBtn } = getBtns();
  translateBtn.disabled = false;
}

function pointAndBlink(str) {
  const screen = _.$('.main__screen > span');
  if (str === ',') {
    screen.textContent = '다음 문자를 기다리고 있습니다.';
    return;
  }
  screen.textContent = '문자 출력중';

  // 더 가까운 쪽으로 가기 위해 currentDeg 값을 구해준다. - 아직 미구현
  //   const currentDeg = arrow.me.style.transform.match(/\d{0,3}\.\d{0,2}/g);

  const arrow = {
    me: _.$('.arrow'),
    arcDeg: 22.5,
    defalutDeg: 11.25,
    pointedNum: hexToDec(str),
  };
  const movingDeg = getMovingDeg(arrow);
  rotateArrow(arrow.me, movingDeg);

  let count = 0;
  const blink = setInterval(() => {
    blinkText(arrow);
    count += 1;
    if (count === 2) clearInterval(blink);
  }, 1000);
}

function getMovingDeg({ defalutDeg, arcDeg, pointedNum }) {
  return defalutDeg + arcDeg * pointedNum;
}

function rotateArrow(arrow, movingDeg) {
  arrow.style.transform = `rotate(${movingDeg}deg)`;
}

function blinkText(arrow) {
  const figure = getFigure(canvas);
  paintPointedStr(arrow, figure);
  initTransceiver(figure);
}

function paintPointedStr({ pointedNum, arcDeg }, figure) {
  figure.degree = arcDeg * pointedNum;
  figure.arcDegree = arcDeg;
  ctx.beginPath();
  ctx.moveTo(figure.width / 2, figure.height / 2);
  ctx.lineWidth = '2';
  ctx.strokeStyle = '#f39c12';
  insertText(figure, pointedNum);
}

function initTransceiver(figure) {
  setTimeout(() => {
    strokeFigure(figure);
  }, 500);
}

function getInputs() {
  const inputMsg = _.$('.transmit__input');
  const encodedInput = _.$('.receive__input');
  return { inputMsg, encodedInput };
}

function getBtns() {
  const translateBtn = _.$('.translate');
  const checkMsgBtn = _.$('.receive-check__btn');
  return { translateBtn, checkMsgBtn };
}

// function initInputValue(inputs) {
//   inputs.forEach((input) => (input.value = ''));
// }

export { moveTransceiverArrow, getBtns, getInputs };
