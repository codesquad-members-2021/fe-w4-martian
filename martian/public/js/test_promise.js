import MyPromise from './MyPromise.js'


console.log("start");

new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve("hello");
    }, 1000);
})
    .then((v) => v + ' world')
    .then((v) => v + ' and crong')
    .then((v) => v + ' wonder how long chaining will increase')
    .then((v) => console.log('output : ' + v))

console.log("end");

const cb1 = () => new MyPromise((resolve, reject) => {
    setTimeout(() => {
        console.log('cb1');
        resolve('cb1');
    }, 5000)
})
const cb2 = (v) => new MyPromise((resolve, reject) => {
    setTimeout(() => {
        console.log(v + ' -> cb2');
        resolve(v + ' -> cb2');
    }, 2000)
})
const cb3 = (v) => new MyPromise((resolve, reject) => {
    setTimeout(() => {
        console.log(v + ' -> cb3');
        resolve(v + ' -> cb3');
    }, 2000)
})
const cb4 = (v) => setTimeout(() => {
    console.log(v + ' -> cb4');
}, 3000)

cb1().then(cb2).then(cb3).then(cb4);


const firstPromise = new MyPromise( (resolve, reject) => {
    setTimeout(()=> resolve(1),2000);
 });
 firstPromise
 .then( (data2)=> {
   return new MyPromise( (resolve) => setTimeout(()=> resolve(data2 + 1),2000));
 }).then( (result)=> console.log('final', result));
 