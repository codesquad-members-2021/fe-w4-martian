const foo = (delayTime) => {
    return new Promise((resolve, reject) => {  // Promise 대신에 MyPromise 를 넣어도 똑같이 동작하는 코드 만들기
        setTimeout(() => resolve('completed'), delayTime);
    });
}

foo(2000).then((result) => console.log(result));


class MyPromise {
    constructor(executorCb) {
        executorCb(this.resolve, this.reject);
    }

    resolve() {

    }

    reject() {

    }

    then() {

    }
}

/*------------------------------------------*/


// 1. Producer
// when new Promise is created, the executor runs automatically.
let da = 1;
const promise = new Promise((resolve, reject) => {
    console.log('doing something');
    if (da === 0) {
        setTimeout(() => {
            resolve("goody");
        }, 2000);
    } else {
        setTimeout(() => {
            reject(new Error('da is 1'));
        }, 2000);
    }
});



// 2. Consumer
promise
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error(error);
    })
    .finally(() => {
        console.log("promise end");
    });


// 3. Promise Chaining
const workingPromise = new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000);
    console.log("first resolve initiated");
});

workingPromise
    .then(result => result * 2)
    .then(result => result * 3)
    .then(result => {
        return new Promise((resolve, reject) => {
            console.log("almost there!");
            setTimeout(() => resolve(result - 1), 1000);
        });
    })
    .then(result => {
        console.log(result)
        console.log("chaining finished");
    });

    // "first resolve initiated"
// (1 sec)
// "almost there!"
// (1 sec)
// 5
// "chaining finished"



// 4. Error Handling
const getCow = () =>
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(`🐮`), 1000); // 소를 데려오기 1초
    });
const getMeat = (cow) =>
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(`${cow} => 🥩`), 1000);	// 도축 1초
    });
const getBurger = (meat) =>
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(`${meat} => 🍔`), 1000);	// 햄버거 쌓기 1초
    });


    getCow()									// 소를 데려온다.
    .then(result => getMeat(result))		// 데려온 result 를 고기로 만든다.
    .then(result => getBurger(result))		// 고기가 된 result로 버거를 만든다.
    .then(result => console.log(result))	// 결과를 출력한다.
    .catch(result => console.error(`error from ${result}`));
