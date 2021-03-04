import { renderPlate, blingText } from './canvas.js';
import {
  arrowRotate,
  setInputValue,
  getInputValue,
  initInputValue,
  makeBtnAble,
  translateForSend,
} from './domControl.js';
import { stringToHexArr } from './util/calculate.js';
import { _, pipe, asyncForEach, promiseDelay } from './util/util.js';
const BLANK = ' ';
const receiveBox = _.$('.receive>input');
const sendBox = _.$('.send>input');
const translateBtn = _.$('.receive>button');
const sendBtn = _.$('.send>button');

const isLastIdx = (idx, arr) => idx === arr.length - 1;

//마지막까지 다돌면 하는 셋팅
const finishSetting = () => {
  setTimeout(() => {
    blingText({ idx: null, clear: true }); //글자 깜빡임 interval 제거
    makeBtnAble(translateBtn);
  }, 5000);
};

// 한단어의 16진수를 처리하는 forEach 콜백함수 / 이름이 마땅히..생각이 안나네요
const dealChar = async (value, idx, arr) => {
  await promiseDelay({
    value: { value, idx, arr },
    delay: idx === 0 ? 0 : 5000,
  }).then(({ value, idx, arr }) => {
    console.log(value);
    const charArray = value.split('');
    asyncForEach(dealHex, charArray);
    if (isLastIdx(idx, arr)) finishSetting();
  });
};

//16진수 하나를 처리하는 forEach 콜백함수
const dealHex = async (value, idx, arr) => {
  await promiseDelay({
    value: { value, idx },
    delay: idx === 0 ? 0 : 2000,
  }).then(({ value, idx }) => {
    arrowRotate(value);
    setInputValue(value, receiveBox);
    blingText({ value, clear: false });
    if (isLastIdx(idx, arr)) setInputValue(BLANK, receiveBox);
  });
};
//수신 박스 able로 만들기
const makeBtnAble = (btn) => (btn.disabled = false);

//인자로문자 -> 실행
const sendMessage = pipe(stringToHexArr, asyncForEach(dealChar));
//input박스 문자 가져오기 -> sendMessage
const sendMessageToMars = pipe(getInputValue, sendMessage);

const sendMessage = pipe(stringToHexArr, asyncForEach(dealChar));

const sendMessageToEarth = () => {
  initInputValue(receiveBox);
  sendMessageToMars(sendBox);
};

//원판 렌더링 및 이벤트
const init = () => {
  renderPlate();
  translateBtn.addEventListener('click', translateForSend.bind(null, receiveBox, sendBox));
  sendBtn.addEventListener('click', sendMessageToEarth);
};

init();
sendMessage('hello');
