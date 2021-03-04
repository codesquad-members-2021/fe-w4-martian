import MyPromise from '../myPromise.js';

export const go = (arg, ...fns) => fns.reduce((res, fn) => fn(res), arg);

export const pipe = (fn, ...fns) => (...args) => go(fn(...args), ...fns);

export const _ = {
  $: function (selector, base = document) {
    return base.querySelector(selector);
  },
  $all: function (selector, base = document) {
    return base.querySelectorAll(selector);
  },
};

export async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    const result = await callback(array[index], index, array);
  }
}

export const promiseDelay = (value, delay) => new MyPromise((resolve, rej) => setTimeout(() => resolve(value), delay));
