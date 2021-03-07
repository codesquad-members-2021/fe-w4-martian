import { hexadecimals, selectors, rotationState, times, _ } from "../util.js";
import MyPromise from "../Promise.js";

const transformElement = (degree) => `translate3d(-50%, -50%, 0) rotate(${degree}deg)`;

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

const findTargetElementOfLetter = _.curry((letter, elements) => {
  return Object.entries(elements).find((item) => item[1].dataset.id === letter.toUpperCase());
});

const findEndPointLocationInHexs = _.curry((array, target) => {
  const endPoint = array.findIndex((item) => item.toString() === target[1].dataset.id);
  return { endPoint, target };
});

const lightOnTarget = _.curry((classname, target) => {
  target[1].classList.add(classname);
  return target;
});

const lightOut = (target) => (target ? target[1].classList.remove("light") : null);

const updateState = _.curry((key, newValue) => {
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

const updateWholeState = _.pipe(
  updateState("currPoint"), //
  updateState("currDeg"), //
  updateState("pastTarget")
);

const calculateDistanceToEndPoint = _.curry(({ state, key }, { endPoint, target }) => {
  const distance = endPoint - state[key];
  const absDistance = Math.abs(distance);

  return { distance, absDistance, endPoint, target };
});

const turnArrowAsDirection = _.curry(({ state, key, element }, distanceInfo) => {
  const { distance, absDistance, endPoint, target } = distanceInfo;
  let currDegree = state[key];
  if (absDistance > rotationState.maxDistance) currDegree = turnArrow(hexadecimals.length - absDistance, currDegree, element, distance <= 0 ? true : false);
  if (absDistance <= rotationState.maxDistance) currDegree = turnArrow(absDistance, currDegree, element, distance <= 0 ? false : true);
  return { currDegree, endPoint, target };
});

const rotate = (letter) =>
  _.go(
    _.$All(".line__text"), //
    findTargetElementOfLetter(letter), //
    lightOnTarget("light"), //
    findEndPointLocationInHexs(hexadecimals), //
    calculateDistanceToEndPoint({ state: rotationState, key: "currPoint" }), //
    turnArrowAsDirection({ state: rotationState, key: "currDeg", element: selectors.arrow }), //
    updateWholeState
  );

const delay = (time, fn) => (x) =>
  x.length
    ? new MyPromise((resolve) =>
        setTimeout(() => {
          resolve(fn(x));
        }, time)
      )
    : (y) =>
        new MyPromise((resolve) =>
          setTimeout(() => {
            resolve(fn(y));
          }, time)
        );

const rotateRoulette = (letter, i) => {
  const sendWithDelay = delay(times.send * (i + 1), rotate);
  const lightOutWithDelay = delay(times.send, lightOut);
  return sendWithDelay(letter)
    .then(({ target }) => lightOutWithDelay(target))
    .then((_) => letter.toUpperCase());
};

export { rotateRoulette };
