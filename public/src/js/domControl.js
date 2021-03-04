import { _ } from './util/util.js';
import { hexArrToString } from './util/calculate.js';

const BLANK = ' ';

//input box에 입력하기
export const setInputValue = (value, inputBox) => (inputBox.value += value);

//수신 박스 able로 만들기
export const makeBtnAble = (btn) => (btn.disabled = false);

const translateHex = (value) => {
  const hexArr = value.split(BLANK);
  return hexArrToString(hexArr);
};

export const translateForSend = (receiveBox, sendBox) => {
  const value = receiveBox.value;
  const translatedStr = translateHex(value);
  setInputValue(translatedStr, sendBox);
};

export const getinputValue = (input) => input.value;
export const initInput = (input) => {
  input.value = '';
};
