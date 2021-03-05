import { pipe } from './util/util.js';

const STATUS = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
};

class MyPromise {
  constructor(fn) {
    this.cbList = [];
    this.errCbList = [];
    this.status = STATUS.PENDING;
    setTimeout(() => {
      fn(this.resolve.bind(this), this.reject.bind(this));
    }, 0);
  }
  then(cb) {
    this.cbList.push(cb);
    return this;
  }
  catch(cb) {
    this.errCbList.push(cb);
  }
  resolve(value) {
    if (this.status !== STATUS.REJECTED) {
      this.status = STATUS.FULFILLED;
      pipe(...this.cbList)(value);
    }
    return this;
  }
  reject() {
    if (this.status !== STATUS.FULFILLED) {
      this.status = STATUS.REJECTED;
      if (this.errCbList.length) pipe(...this.errCbList)();
      else console.error(STATUS.REJECTED);
    }
    return this;
  }
}

export default MyPromise;
