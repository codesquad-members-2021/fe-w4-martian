class MyPromise {
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

console.log('start');

new MyPromise('hello').then((v) => v + ' world').then((v) => v + ' and crong');

console.log('end');
