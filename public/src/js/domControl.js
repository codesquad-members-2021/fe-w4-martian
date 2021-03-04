import { _ } from './util/util.js';
import { hexArrToString, getHexIdx } from './util/calculate.js';

const arrow = _.$('.arrow');
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

const isRightDir = (idx, targetIdx) => {
  const length = 16;
  const rightDir = Math.abs(idx - targetIdx);
  const leftDir = targetIdx > idx ? length + idx - targetIdx : length - idx + targetIdx;
  return rightDir < leftDir;
};

//dir이 true이면 시계방향
const getAngle = (targetIdx, dir) => {
  const defaultAngle = 11.5;
  const oneAngle = 360 / 16;
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
  return targetIdx;
};

/*
역할:16진수 받기
    16진수에 인덱스를 가져와서 rotateArrow(화살표 돌려주기)
    이전 위치 업데이트
*/
export const arrowRotate = initArrowRotate();
