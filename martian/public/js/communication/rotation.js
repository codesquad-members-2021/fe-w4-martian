import { hexadecimals, selectors, rotationState, times } from "../util.js";
import MyPromise from "../Promise.js";

const curry = (f) => (a, ...bs) => (bs.length ? f(a, ...bs) : (...cs) => f(a, ...cs));

const go = (arg, ...fns) => fns.reduce((acc, fn) => fn(acc), arg);

const pipe = (...fns) => (a) => fns.reduce((acc, fn) => fn(acc), a);

const getEndPoint = (array, target) => {
  const endPoint = array.findIndex((item) => item.toString() === target[1].dataset.id);
  return { endPoint, target };
};

const capital = (letter) => letter.toUpperCase();

const getHTMLElements = (className) => document.querySelectorAll(`.${className}`);

const calculateDistance = ({ state, key }, { endPoint, target }) => {
  const distance = endPoint - state[key];
  const absDistance = Math.abs(distance);

  return { distance, absDistance, endPoint, target };
};

const transformElement = (degree) => `translate3d(-50%, -50%, 0) rotate(${degree}deg)`;

const turnAsDirection = ({ state, key, element }, distanceInfo) => {
  const { distance, absDistance, endPoint, target } = distanceInfo;
  let currDegree = state[key];
  if (absDistance > rotationState.maxDistance) currDegree = distance <= 0 ? turnArrow(hexadecimals.length - absDistance, currDegree, element, true) : turnArrow(hexadecimals.length - absDistance, currDegree, element, false);
  if (absDistance <= rotationState.maxDistance) currDegree = distance <= 0 ? turnArrow(absDistance, currDegree, element, false) : turnArrow(absDistance, currDegree, element, true);
  // console.log(`=== ${currDegree}, ${endPoint} ===`);
  return { currDegree, endPoint, target };
};

const turnArrow = (movingCount, currDegree, element, isClockWise) => {
  element.style.transition = `${times.transition}ms`;
  if (isClockWise) {
    element.style.transform = transformElement((currDegree += movingCount * rotationState.oneDeg));
  }
  if (!isClockWise) {
    element.style.transform = transformElement((currDegree -= movingCount * rotationState.oneDeg));
  }
  return currDegree;
};

const lightOn = (target, className) => {
  target[1].classList.add(className);
  return target;
};

const lightOut = (target) => (target ? target[1].classList.remove("light") : null);

const findTargetElementOfLetter = curry((letter, elements) => Object.entries(elements).find((item) => item[1].dataset.id === letter.toUpperCase()));
const findEndPointLocationInHexs = curry((array, target) => {
  const endPoint = array.findIndex((item) => item.toString() === target[1].dataset.id);
  return { endPoint, target };
});
const lightOnTarget = curry((classname, target) => {
  target[1].classList.add(classname);
  return target;
});

const updateState = curry((key, newValue) => {
  switch (key) {
    case "currPoint":
      rotationState.currPoint = newValue.endPoint;
      break;
    case "currDeg":
      rotationState.currDeg = newValue.currDegree;
      break;
    case "pastTarget":
      rotationState.pastTarget = newValue.target;
      break;
  }
  return newValue;
});

const updateWholeState = pipe(
  updateState("currPoint"), //
  updateState("currDeg"), //
  updateState("pastTarget")
);
updateWholeState(newValue);

const calculateDistanceToEndPoint = curry(({ state, key }, { endPoint, target }) => {
  const distance = endPoint - state[key];
  const absDistance = Math.abs(distance);

  return { distance, absDistance, endPoint, target };
});

const turnArrowAsDirection = curry(({ state, key, element }, distanceInfo) => {
  const { distance, absDistance, endPoint, target } = distanceInfo;
  let currDegree = state[key];
  if (absDistance > rotationState.maxDistance) currDegree = distance <= 0 ? turnArrow(hexadecimals.length - absDistance, currDegree, element, true) : turnArrow(hexadecimals.length - absDistance, currDegree, element, false);
  if (absDistance <= rotationState.maxDistance) currDegree = distance <= 0 ? turnArrow(absDistance, currDegree, element, false) : turnArrow(absDistance, currDegree, element, true);
  return { currDegree, endPoint, target };
});

const rotate = (letter) =>
  go(
    "line__text",
    getHTMLElements,
    findTargetElementOfLetter(letter),
    // updatePastTarget,
    lightOnTarget("light"),
    findEndPointLocationInHexs(hexadecimals),
    calculateDistanceToEndPoint({ state: rotationState, key: "currPoint" }),
    turnArrowAsDirection({ state: rotationState, key: "currDeg", element: selectors.arrow }),
    updateWholeState
    // go(hexadecimals, getEndPoint),
    // go({ state: rotationState, key: "currPoint" }, calculateDistance),
    // go({ state: rotationState, key: "currDeg", element: selectors.arrow }, turnAsDirection)
  );

const delay = (time, ...fns) => (x) =>
  new MyPromise((resolve) =>
    setTimeout(() => {
      resolve(go(x, ...fns));
    }, time)
  );

const rotateRoulette = (letter, i) => {
  return delay(
    times.send * (i + 1),
    rotate
  )(letter)
    .then(({ target }) => delay(times.send, lightOut)(target))
    .then((_) => capital(letter));
};

export { rotateRoulette };
