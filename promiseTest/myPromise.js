const { log } = console;
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

new MyPromise((res, rej) => {
  setTimeout(() => {
    res(1);
    rej();
  }, 1000);
})
  .then((v) => v + 1)
  .then((v) => v + 2)
  .then(log)
  .catch(() => {
    log('error');
  });
>>>>>>> 12aa611... Feat. MyPromise Class

const print = async () => {
  const sum = await reduceAsync(cbFn, arr);
  log('sum: ', sum);
};

print();
