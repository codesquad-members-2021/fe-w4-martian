import { go, pipe } from './util.js';

//prettier-ignore
const hexCodeArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

const charToDec = (char) => char.charCodeAt();
const decToChar = (code) => String.fromCharCode(code);

const decToHex = (dec) => {
  let hex = '';
  while (dec) {
    const mod = dec % 16;
    hex = mod > 10 ? hexCode[mod] + hex : mod + hex;
    dec = Math.floor(dec / 16);
  }
  return hex;
};
const hexToDec = (hex) => {
  let dec = (hex + '')
    .split('')
    .reverse()
    .reduce((acc, cur, idx) => {
      acc += getHexIdx(cur) * Math.pow(16, idx);
      return acc;
    }, 0);
  return dec;
};

const charToHex = pipe(charToDec, decToHex);

export const stringToHexArr = (str) => str.split('').map((v) => charToHex(v));

export const getHexIdx = (val) => hexCodeArr.indexOf(val);
export const getHexValue = (idx) => hexCodeArr[idx];
