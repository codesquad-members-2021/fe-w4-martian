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
