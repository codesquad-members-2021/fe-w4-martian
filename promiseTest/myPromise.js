const { log } = console;
<<<<<<< HEAD
const arr = [1, 2, 3, 4, 5];
const getDelay = (v, time) => new Promise((resolve) => setTimeout(() => resolve(v), time));

<<<<<<< HEAD
const cbFn = async (acc, v) => {
  const res = await getDelay(v, 1000);
  log('acc+res:', acc + res);
  return acc + res;
};

const reduceAsync = async (cbFn, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const x of iter) {
    acc = await cbFn(acc, x);
  }
  return acc;
};
=======
=======
const go = (arg, ...fns) => fns.reduce((res, fn) => fn(res), arg);
const pipe = (fn, ...fns) => (...args) => go(fn(...args), ...fns);
>>>>>>> aa48666... Refactor. asyncForEach, promiseDelay 적용
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
<<<<<<< HEAD
>>>>>>> 12aa611... Feat. MyPromise Class
=======
}

async function asyncForEach(callback, array) {
  for (let index = 0; index < array.length; index++) {
    const result = await callback(array[index], index, array);
  }
}

<<<<<<< HEAD
// test();

new Promise((res) => {
  setTimeout(() => {
    res(1);
  }, 1000);
})
  .then((v) => {
    log(v + 1);
    setTimeout(() => {
      return v + 1;
    }, 1000);
  })
  .then((v) => {
    setTimeout(() => {
      log(v + 1);
      return v + 1;
    }, 1000);
  })
  .then(log);
=======
test();
>>>>>>> Kyle

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
>>>>>>> aa48666... Refactor. asyncForEach, promiseDelay 적용

const print = async () => {
  const sum = await reduceAsync(cbFn, arr);
  log('sum: ', sum);
};

print();
