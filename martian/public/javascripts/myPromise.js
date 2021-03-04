export default class MyPromise {
  constructor(initialStr) {
    this.cbList = [];

    setTimeout(() => {
      console.log(
        this.cbList.reduce((acc, cur) => {
          return cur(acc);
        }, initialStr)
      );
    }, 2000);
  }

  then(cb) {
    this.cbList.push(cb);
    return this;
  }
}
