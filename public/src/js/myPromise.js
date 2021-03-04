import { go, pipe } from './util/util.js';

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

export default MyPromise;
