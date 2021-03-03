import { go, pipe } from './util/util.js';

class MyPromise {
  constructor(fn) {
    this.value;
    this.cbList = [];
    this.fn = fn(this.resolve, this.reject);
    setTimeout(() => {
      if (this.fn()) this.value = pipe(...this.cbList)(this.value);
    }, 0);
  }
  then(cb) {
    this.cbList.push(cb);
    return this;
  }
  resolve(value) {
    this.value = value;
    return true;
  }
  reject() {
    console.error('rejected');
    return false;
  }
}
// class MyPromise {
//   constructor(initValue, delay) {
//     this.initValue = initValue;
//     this.cbList = [];
//     this.initValue.forEach((v, idx) => {
//       setTimeout(() => {
//         const fns = pipe(...this.cbList);
//         fns(v, idx);
//       }, delay * idx);
//     });
//   }
//   then(cb) {
//     this.cbList.push(cb);
//     return this;
//   }
// }

// export default MyPromise;
