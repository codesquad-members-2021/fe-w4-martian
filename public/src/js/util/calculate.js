import { pipe } from './util.js';

const hexCode = {
  10: 'A',
  11: 'B',
  12: 'C',
  13: 'D',
  14: 'E',
  15: 'F'
};

const charToDec = (char) => char.charCodeAt();
const decToChar = (code) => String.fromCharCode(code);

const decToHex = (dec) => {
  let hex = '';
  while (dec) {
    const mod = dec % 16;
    if (mod > 10) hex = hexCode[mod] + hex;
    else hex = mod + hex;
    dec = Math.floor(dec / 16);
  }
  return hex;
};
const hexToDec = (hex) => {
  let dec = (hex + '')
    .split('')
    .reverse()
    .reduce((acc, cur, idx) => {
      if (cur > 10) acc += hexCode[cur] * Math.pow(16, idx);
      else acc += cur * Math.pow(16, idx);
      return acc;
    }, 0);
  return dec;
};

const charToHex = pipe(charToDec, decToHex);
const hexToChar = pipe(hexToDec, decToChar);
