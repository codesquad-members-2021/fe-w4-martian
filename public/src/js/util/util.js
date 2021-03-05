<<<<<<< HEAD
import MyPromise from '../myPromise.js';

export const go = (arg, ...fns) => fns.reduce((res, fn) => fn(res), arg);

export const pipe = (fn, ...fns) => (...args) => go(fn(...args), ...fns);

const curry = (fn) => (arg, ...args) => (args.length ? fn(arg, ...args) : (...args) => fn(arg, ...args));
=======
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
>>>>>>> 91dc7404182e35c6e6d7fdaf68bca5e026677fd6

export const _ = {
  $: function (selector, base = document) {
    return base.querySelector(selector);
  },
  $all: function (selector, base = document) {
    return base.querySelectorAll(selector);
<<<<<<< HEAD
  },
};

export const asyncForEach = curry(async (callback, array) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
});

export const promiseDelay = ({ value, delay }) =>
  new MyPromise((resolve, rej) => setTimeout(() => resolve(value), delay));
=======
  }
};
>>>>>>> 91dc7404182e35c6e6d7fdaf68bca5e026677fd6
