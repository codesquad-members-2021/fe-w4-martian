const { log } = console;
const go = (arg, ...fns) => fns.reduce((res, fn) => fn(res), arg);
const pipe = (fn, ...fns) => (...args) => go(fn(...args), ...fns);

class MyPromise {
  constructor(fn) {
    this.value;
    this.state = 'pending';
    this.cbList = [];
    fn(this.resolve.bind(this), this.reject.bind(this));
  }
  then(cb) {
    this.cbList.push(cb);
    return this;
  }
  resolve(value) {
    this.value = value;
    this.state = 'fulfilled';
    if (this.state === 'fulfilled') {
      setTimeout(() => {
        this.value = pipe(...this.cbList)(this.value);
      }, 0);
    }
    return this;
  }
  reject() {
    this.state = 'rejected';
    setTimeout(() => {
      throw Error();
      console.error('rejected');
    }, 0);
  }
}

new MyPromise((res, rej) => {
  setTimeout(() => {
    res(1);
  }, 1000);
})
  .then((v) => v + 1)
  .then((v) => v + 2)
  .then(log);

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
