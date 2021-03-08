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
    fn(this.resolve.bind(this), this.reject.bind(this));
  }
  then(cb) {
    this.cbList.push(cb);
    return this;
  }
  catch(cb) {
    if (this.isStatus(STATUS.REJECTED)) {
      this.errCbList.push(cb);
      this.cbList = [];
    }
    return this;
  }
  resolve(value) {
    if (!this.isStatus(STATUS.REJECTED)) {
      this.setStatus(STATUS.FULFILLED);
      setTimeout(() => {
        if (!this.isStatus(STATUS.REJECTED)) {
          pipe(...this.cbList)(value);
        }
      }, 0);
    }
    return this;
  }
  reject(value) {
    if (!this.isStatus(STATUS.FULFILLED)) {
      this.setStatus(STATUS.REJECTED);
      setTimeout(() => {
        if (!this.errCbList.length) throw Error('UnhandledPromiseRejectionWarning:', value);
        else if (!this.cbList.length) pipe(...this.errCbList)(value);
        else if (this.cbList.length) pipe(...this.errCbList, ...this.cbList)(value);
      }, 0);
    }
    return this;
  }
  setStatus(status) {
    this.status = status;
  }
  isStatus(status) {
    return this.status === status;
  }
}

export default MyPromise;
