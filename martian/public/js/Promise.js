import { _ } from "./util.js";
export default class MyPromise {
  constructor(fn) {
    this.cbList = [];
    this.catchCb = (e) => {
      throw e;
    };
    // fulfilled, rejected
    this.state = "pending";

    setTimeout(() => {
      try {
        this.state = "fulfilled";
        fn(_.pipe(...this.cbList), this.catchCb);
      } catch (e) {
        this.state = "rejected";
        this.catchCb(e);
      }
    }, 0);
  }

  then(callback) {
    this.cbList.push(callback);
    return this;
  }
  catch = (callback) => {
    this.catchCb = callback;
    return this;
  };
}
