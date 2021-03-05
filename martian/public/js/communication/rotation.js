import { hexadecimals, selectors, rotationState, times } from "../util.js";
import MyPromise from "../Promise.js";

const getEndPoint = (array, target) => array.findIndex((item) => item.toString() === target);

const capital = (letter) => letter.toUpperCase();

const findTarget = (elements, capital) => Object.entries(elements).find((item) => item[1].dataset.id === capital);

const getHTMLElements = (className) => document.querySelectorAll(`.${className}`);

const getDistance = ({ state, key }, endPoint) => {
  const distance = endPoint - state[key];
  const absDistance = Math.abs(distance);
  return { distance, absDistance };
};

const turnAsDirection = ({ state, key }, element, { distance, absDistance }) => {
  let currDegree = state[key];
  if (absDistance > rotationState.maxDistance)
    currDegree = distance <= 0 ? turnArrow(hexadecimals.length - absDistance, currDegree, element, true) : turnArrow(hexadecimals.length - absDistance, currDegree, element, false);
  if (absDistance <= rotationState.maxDistance) currDegree = distance <= 0 ? turnArrow(absDistance, currDegree, element, false) : turnArrow(absDistance, currDegree, element, true);
  return currDegree;
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

const lightOn = (target, className) => target[1].classList.add(className);

const lightOut = (target) => target[1].classList.remove("light");

const adela = (f, ...fns) => (...args) =>
  args.length
    ? f(
        ...fns.reduce((acc, fn, i) => {
          acc.push(fn(args[i]));
          return acc;
        }, [])
      )
    : f(...fns);

const rotateRoulette = (letter, i, isLast) =>
  new MyPromise((resolve, reject) =>
    setTimeout(() => {
      if (rotationState.pastTarget) lightOut(rotationState.pastTarget);
      const endPoint = getEndPoint(hexadecimals, capital(letter));
      const target = adela(findTarget, getHTMLElements, capital)("line__text", letter);
      const diff = adela(getDistance, { state: rotationState, key: "currPoint" }, endPoint)();
      const direction = adela(turnAsDirection, { state: rotationState, key: "currDeg" }, selectors.arrow, diff)();
      !isLast ? lightOn(target, "light") : lightOn(target, "last");
      rotationState.pastTarget = target;
      rotationState.currDeg = direction;
      rotationState.currPoint = endPoint;
      resolve(capital(letter));
    }, times.send * (i + 1))
  );

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

export { rotateRoulette };
