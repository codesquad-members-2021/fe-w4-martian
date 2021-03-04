const { log } = console;
const go = (arg, ...fns) => fns.reduce((res, fn) => fn(res), arg);
const pipe = (fn, ...fns) => (...args) => go(fn(...args), ...fns);
class MyPromise {
  constructor(fn) {
    this.cbList = [];
    this.errCbList = [];
    this.status;
    fn(this.resolve.bind(this), this.reject.bind(this));
  }
  then(cb) {
    this.cbList.push(cb);
    return this;
  }
  catch(cb) {
    this.errCbList.push(cb);
  }
  resolve(value) {
    if (this.status !== 'rejected') {
      this.status = 'fulfilled';
      pipe(...this.cbList)(value);
    }
    return this;
  }
  reject() {
    if (this.status !== 'fulfilled') {
      this.status = 'rejected';
      if (this.errCbList.length) pipe(...this.errCbList)();
      else console.error('rejected');
    }
    return this;
  }
}

const k = [1, 2, 3, 4, 5, 6, 7, 8];

async function test() {
  const promiseFunction = (v) => new MyPromise((resolve) => setTimeout(() => resolve(v), 1000));

  // for (let i = 0; i < k.length; i++) {
  //   const res = await promiseFunction(i);
  //   console.log(res);
  // }

  asyncForEach(k, async (v, idx) => {
    await promiseFunction(v).then(log);
    // console.log(res);
  });
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    const result = await callback(array[index], index, array);
  }
}

test();

// new MyPromise((res, rej) => {
//   setTimeout(() => {
//     res(1);
//     rej();
//   }, 1000);
// })
//   .then((v) => v + 1)
//   .then((v) => v + 2)
//   .then(log)
//   .catch(() => {
//     log('error');
//   });

// console.log('start');
// new MyPromise((res, rej) => res('hello'))
//   .then((v) => v + ' world')
//   .then((v) => v + ' and Kyle')
//   .then(log);
// console.log('end');

// new Promise((res, rej) => {
//   setTimeout(() => {
//     rej('error');
//     res(1);
//   }, 1000);
// }).then(log);
