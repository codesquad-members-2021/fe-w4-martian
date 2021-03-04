import { renderPlate, blingText } from './canvas.js';
import { arrowRotate, setInputValue, makeBtnAble, translateForSend } from './domControl.js';
import { stringToHexArr } from './util/calculate.js';
import { _, pipe, asyncForEach, promiseDelay } from './util/util.js';
const { log } = console;
const BLANK = ' ';
const receiveBox = _.$('.receive>input');
const sendBox = _.$('.send>input');
const translateBtn = _.$('.receive>button');
const sendBtn = _.$('.send>button');

//초기 원판 render

const isLastIdx = (idx, arr) => idx === arr.length - 1;
const getSendBoxValue = () => sendBox.value;
const initReceiveBox = () => (receiveBox.value = '');

//마지막까지 다돌면 하는 셋팅
const finishSetting = () => {
  setTimeout(() => {
    blingText({ idx: null, clear: true }); //글자 깜빡임 interval 제거
    makeBtnAble(translateBtn);
  }, 5000);
};

// 한단어의 16진수를 처리하는 forEach 콜백함수 / 이름이 마땅히..생각이 안나네요
/*
질문:
현재 부모? Promise에서의 idx(index) 값을 37번줄의 비동기 프로미스콜백함수에서 사용하게 하는 방법은 뭐가 있을지...?
*/
const dealChar = async (value, idx, arr) => {
  await promiseDelay({ value, idx }, idx === 0 ? 0 : 5000)
    .then(({ value, idx }) => {
      const chars = value.split('');
      asyncForEach(dealHex, chars);
      return { idx };
    })
    .then(({ idx }) => {
      if (isLastIdx(idx, arr)) finishSetting();
    });
};

//16진수 하나를 처리하는 forEach 콜백함수
const dealHex = async (value, idx, arr) => {
  await promiseDelay({ value, idx }, idx === 0 ? 0 : 2000).then(({ value, idx }) => {
    arrowRotate(value);
    setInputValue(value, receiveBox);
    blingText({ value, clear: false });
    if (isLastIdx(idx, arr)) setInputValue(BLANK, receiveBox);
  });
};

//원판 렌더링 및 이벤트
const init = () => {
  renderPlate();
  translateBtn.addEventListener('click', translateForSend.bind(null, receiveBox, sendBox));
  sendBtn.addEventListener('click', sendMessageToEarth);
};
//문자 -> 실행
const sendMessage = pipe(stringToHexArr, asyncForEach(dealChar));
//input박스 문자 가져오기 -> sendMessage
const sendMessageToMars = pipe(getSendBoxValue, sendMessage);

const sendMessageToEarth = () => {
  initReceiveBox();
  sendMessageToMars();
};

init();
sendMessage('he');
