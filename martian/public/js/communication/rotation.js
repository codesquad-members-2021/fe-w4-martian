import { hexadecimals, selectors, rotationState, times } from "../util.js";
import MyPromise from "../Promise.js";

const getEndPoint = (array, target) => {
  const index = array.findIndex((item) => item.toString() === target[1].dataset.id);
  // console.log(`target:`);
  // console.log(target);
  // console.log(`index: ${index}`);
  return index;
};

const capital = (letter) => letter.toUpperCase();

const findTarget = (capital, elements) => Object.entries(elements).find((item) => item[1].dataset.id === capital);

const getHTMLElements = (className) => document.querySelectorAll(`.${className}`);

const calculateDistance = ({ state, key }, endPoint) => {
  // console.log(`endPoint: ${endPoint}`);
  // console.log(`currPoint: ${state[key]}`);
  const distance = endPoint - state[key];
  const absDistance = Math.abs(distance);
  // console.log(`dist: ${distance}, abs:${absDistance}`);
  return { distance, absDistance, endPoint };
};

const turnAsDirection = ({ state, key, element }, { distance, absDistance, endPoint }) => {
  // console.log("hello");
  // console.log({ state, key, element });
  // console.log({ distance, absDistance });
  let currDegree = state[key];
  if (absDistance > rotationState.maxDistance) currDegree = distance <= 0 ? turnArrow(hexadecimals.length - absDistance, currDegree, element, true) : turnArrow(hexadecimals.length - absDistance, currDegree, element, false);
  if (absDistance <= rotationState.maxDistance) currDegree = distance <= 0 ? turnArrow(absDistance, currDegree, element, false) : turnArrow(absDistance, currDegree, element, true);
  // console.log(`=== ${currDegree}, ${endPoint} ===`);
  return { currDegree, endPoint };
};

const turnArrow = (movingCount, currDegree, element, isClockWise) => {
  element.style.transition = `${times.transition}ms`;
  if (isClockWise) {
    element.style.transform = `translate3d(-50%, -50%, 0) rotate(${currDegree + movingCount * rotationState.oneDeg}deg)`;
    currDegree += movingCount * rotationState.oneDeg;
  }
  if (!isClockWise) {
    element.style.transform = `translate3d(-50%, -50%, 0) rotate(${currDegree - movingCount * rotationState.oneDeg}deg)`;
    currDegree -= movingCount * rotationState.oneDeg;
  }
  return currDegree;
};

const lightOn = (target, className) => {
  target[1].classList.add(className);
  return target;
};

const lightOut = (target) => (target ? target[1].classList.remove("light") : null);

// const adela = (f, ...fns) => (...args) =>
//   args.length
//     ? f(
//         ...fns.reduce((acc, fn, i) => {
//           acc.push(fn(args[i]));
//           return acc;
//         }, [])
//       )
//     : f(...fns);

// const rotateRoulette = (letter, i, isLast) =>
//   new MyPromise((resolve, reject) =>
//     setTimeout(() => {
//       if (rotationState.pastTarget) lightOut(rotationState.pastTarget);
//       const endPoint = getEndPoint(hexadecimals, capital(letter));
//       const target = adela(findTarget, getHTMLElements, capital)("line__text", letter);
//       const diff = adela(getDistance, { state: rotationState, key: "currPoint" }, endPoint)();
//       const direction = adela(turnAsDirection, { state: rotationState, key: "currDeg", element: selectors.arrow }, diff)();
//       !isLast ? lightOn(target, "light") : lightOn(target, "last");
//       rotationState.pastTarget = target;
//       rotationState.currDeg = direction;
//       rotationState.currPoint = endPoint;
//       resolve(capital(letter));
//     }, times.send * (i + 1))
//   );

// const rotateRoulette = (letter, i, isLast) => {
//   const promise = new MyPromise((resolve, reject) => {
//     setTimeout(() => {
//       const endPoint = getEndPoint(hexadecimals, capital(letter));
//       const target = adela(findTarget, getHTMLElements, capital)("line__text", letter);
//       const distance = adela(getDistance, { state: rotateState, key: "currPoint" }, endPoint)();
//       const currDegree = adela(turnAsDirection, { state: rotateState, key: "currDeg" }, selectors.arrow, distance)();
//       !isLast ? onLight(target, "light") : onLight(target, "last");
//       rotateState.currDeg = currDegree;
//       rotateState.currPoint = endPoint;
//       resolve(target);
//     }, times.send * (i + 1));
//   }).then((target) => setTimeout(() => offLight(target), times.send * (i + 1)));

//   return promise.then(() => capital(letter));
// };

// getEndPoint
// 1. hexadecimals에서 target이랑 같은 값의 인덱스를 찾음
// target -> getEndPoint(hexadecimals, target)

// getDistance
// 1. endPoint를 받아서
// 2. state[key]와 연산함
// 3. {distance, absDistance}를 반환함
// 4. 반한된 {distance, absDistance}는 turnAsDirection을 하는데 사용

// turnAsDirection
// 1. {distance, absDistance}를 받고
// 2. element도 받고
// 3. state, key도 받아서 연산함
// 4. turnArrow를 안에서 호출
// => turnAsDirection(turnArrow)

// 1. letter, i를 받음
// 2. letter를 가지고 -> target을 찾음 (이를 위해 먼저 capital 함)
// 3. target을 찾아서 -> endPoint를 찾음
// 4. endPoint를 찾아서 -> 거리를 계산함
// 5. 거리를 계산해서 -> 화살표를 돌림

// 1. capital(letter)
// 2. findTarget(element, capital(letter))
// 3. endPoint(hexadecimals, findTarget(element, capital(letter)))
// 4. calculateDistance({state, key}, endPoint(hexadecimals, findTarget(element, capital(letter))))
// 5. turnAsDirection({state, key, element}, calculateDistance())

const go = (arg, ...fns) =>
  fns.reduce((acc, fn) => {
    // console.log(fn);
    // console.log(typeof fn);
    return fn(acc);
  }, arg);

const go1 = (f) => (a) => (b) => f(a, b);
// const adela = (f, ...fns) => f(...fns);
// acc = capital
const findTargetElementOfLetter = (capital) => go1(findTarget)(capital)(go("line__text", getHTMLElements));
// findTarget(capital, getHTMLElements("line__text"))
const getEndPointInHexs = (target) => go1(getEndPoint)(hexadecimals)(target);
const lightOnTarget = (target) => go1(lightOn)(target)("light");
const updateState = (key, newValue) => {
  // console.log(`-------- ${key} ---------`);
  // console.log(newValue);
  switch (key) {
    case "currPoint":
      rotationState.currPoint = newValue.endPoint;
      break;
    case "currDeg":
      rotationState.currDeg = newValue.currDegree;
      break;
    case "pastTarget":
      rotationState.pastTarget = newValue;
      break;
  }
  return newValue;
};
const updateCurrPoint = (newValue) => go1(updateState)("currPoint")(newValue);
const updateCurrDeg = (newValue) => go1(updateState)("currDeg")(newValue);
const updatePastTarget = (newValue) => go1(updateState)("pastTarget")(newValue);
const calculateDistanceOfLetters = (endPoint) => go1(calculateDistance)({ state: rotationState, key: "currPoint" })(endPoint);
const turnArrowAsDirection = (distance) => go1(turnAsDirection)({ state: rotationState, key: "currDeg", element: selectors.arrow })(distance);

// const lightOutPastPoint = (pastTarget) => go1(lightOut)(pastTarget)()

// const findTarget2 = (capital) => findTarget(capital, go("line__text", getHTMLElements));
// const getEndPoint2 = (target) => go(hexadecimals, getEndPoint(target));
// const calculateDistance2 = (endPoint) => go({ state: rotationState, key: "currPoint" }, calculateDistance(endPoint));
// const turnAsDirection2 = (distance) => go({ state: rotationState, key: "currDeg", element: selectors.arrow }, turnAsDirection(distance));

const rotate = (letter, i, isLast) =>
  go(
    letter,
    capital,
    findTargetElementOfLetter,
    updatePastTarget,
    lightOnTarget,
    getEndPointInHexs,
    calculateDistanceOfLetters,
    turnArrowAsDirection,
    updateCurrDeg,
    updateCurrPoint
    // go(hexadecimals, getEndPoint),
    // go({ state: rotationState, key: "currPoint" }, calculateDistance),
    // go({ state: rotationState, key: "currDeg", element: selectors.arrow }, turnAsDirection)
  );

const rotateRoulette = (letter, i) =>
  new MyPromise((resolve, reject) => {
    setTimeout(() => {
      lightOut(rotationState.pastTarget);
      rotate(letter, i);
      resolve(capital(letter));
    }, times.send * (i + 1));
  });

// .then((res) => {
// setTimeout(() => {
//     lightOut(rotationState.pastTarget);
//     return capital(letter);
//   }, times.send * (i + 1));
// });

// const getHexArray = (n) => [...Array(n).keys().toString(n)];

// findTarget(letter)
//   .then((target) => getEndPoint(hexadecimals, target))
//   .then((endPoint) => calculateDistance({ state, key }, endPoint))
//   .then((distObj) => turnAsDirection(distObj));

// turnAsDirection({ state, key }, element, calculateDistance({ state, key }, getEndPoint(getHexArray(16), findTarget(letter))));

export { rotateRoulette };
