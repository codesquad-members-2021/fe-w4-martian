const mult5 = value => value * 5;
const add = x => y => x + y;
const compose = (f, g) => x => f(g(x));
const mult5AfterAdd10 = compose(mult5, add(10));



const mult5AfterAdd10 = compose(mult5, add(10));

const result = mult5AfterAdd10(1);

console.log(result);