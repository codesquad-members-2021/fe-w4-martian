const { log } = console;
const go = (arg, ...fns) => fns.reduce((res, fn) => fn(res), arg);

const pipe = (fn, ...fns) => (...args) => go(fn(...args), ...fns);

const charToDec = (char) => char.charCodeAt();
const decToChar = (code) => String.fromCharCode(code);

const hexCode = {
  10: 'A',
  11: 'B',
  12: 'C',
  13: 'D',
  14: 'E',
  15: 'F'
};
// const decToHex = (dec) => {
//   let hex = '';
//   while (dec) {
//       const mod = dec%16;
//       hex +=
//   }
// };

export const _ = {
  $: function (selector, base = document) {
    return base.querySelector(selector);
  },
  $all: function (selector, base = document) {
    return base.querySelectorAll(selector);
  }
};
