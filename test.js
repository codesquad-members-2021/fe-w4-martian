const foo = (delayTime) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('완료');
    }, delayTime);
  });

class MyPromise {
  constructor(initString) {
    this.initString = initString;
    this.cbList = [];
<<<<<<< HEAD
    console.log('여기는 동기니까 맨처음!');
    setTimeout(() => {
      console.log('얘는 마지막에 테스크큐에서 나온다!');
=======
<<<<<<< HEAD
    console.log('여기는 동기니까 맨처음!');
    setTimeout(() => {
      console.log('얘는 마지막에 테스크큐에서 나온다!');
=======
    console.log('이사이는?');
    setTimeout(() => {
>>>>>>> 91dc7404182e35c6e6d7fdaf68bca5e026677fd6
>>>>>>> Kyle
      const fullString = this.cbList.reduce((res, fn) => fn(res), this.initString);
      console.log(fullString);
    }, 0);
  }
  then(cb) {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> Kyle
    console.log('----------------------');
    console.log(this);
    this.cbList.push(cb);
    console.log(this);
    console.log('----------------------');
<<<<<<< HEAD
=======
=======
    this.cbList.push(cb);
    console.log(cb);
>>>>>>> 91dc7404182e35c6e6d7fdaf68bca5e026677fd6
>>>>>>> Kyle
    return this;
  }
}

console.log('start');
new MyPromise('hello').then((v) => v + ' world').then((v) => v + ' and Kyle');
console.log('end');
