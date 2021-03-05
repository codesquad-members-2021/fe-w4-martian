import MyPromise from '../myPromise.js';

export const go = (arg, ...fns) => fns.reduce((res, fn) => fn(res), arg);

export const pipe = (fn, ...fns) => (...args) => go(fn(...args), ...fns);

const curry = (fn) => (arg, ...args) => (args.length ? fn(arg, ...args) : (...args) => fn(arg, ...args));

export const _ = {
  $: function (selector, base = document) {
    return base.querySelector(selector);
  },
  $all: function (selector, base = document) {
    return base.querySelectorAll(selector);
  },
};

export const asyncForEach = curry(async (callback, array, ...args) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array, ...args);
  }
});

export const promiseDelay = ({ value, delay }) =>
  new Promise((resolve, rej) => setTimeout(() => resolve(value), delay));
