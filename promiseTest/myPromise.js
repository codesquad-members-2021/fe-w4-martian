const { log } = console;
const arr = [1, 2, 3, 4, 5];
const getDelay = (v, time) => new Promise((resolve) => setTimeout(() => resolve(v), time));

const cbFn = async (acc, v) => {
  const res = await getDelay(v, 1000);
  log('acc+res:', acc + res);
  return acc + res;
};

const reduceAsync = async (cbFn, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const x of iter) {
    acc = await cbFn(acc, x);
  }
  return acc;
};

const print = async () => {
  const sum = await reduceAsync(cbFn, arr);
  log('sum: ', sum);
};

print();
