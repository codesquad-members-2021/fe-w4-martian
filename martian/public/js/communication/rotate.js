import { hexadecimals, selectors, rotateState, times } from "../util.js";
import MyPromise from "../Promise.js";

// const turn = (diff, { state, key }, element, isClockWise) => {
//   const currDeg = state[key];
//   // const { arrow } = selectors;
//   element.style.transition = `${times.transition}ms`;
//   if (isClockWise) {
//     element.style.transform = `translate3d(-50%, -50%, 0) rotate(${currDeg + diff * 22.5}deg)`;
//     currDeg += diff * 22.5;
//   }
//   if (!isClockWise) {
//     element.style.transform = `translate3d(-50%, -50%, 0) rotate(${currDeg - diff * 22.5}deg)`;
//     currDeg -= diff * 22.5;
//   }
//   return currDeg;
// };

const turn = (diff, currDeg, element, isClockWise) => {
  // const { arrow } = selectors;
  element.style.transition = `${times.transition}ms`;
  if (isClockWise) {
    element.style.transform = `translate3d(-50%, -50%, 0) rotate(${currDeg + diff * 22.5}deg)`;
    currDeg += diff * 22.5;
  }
  if (!isClockWise) {
    element.style.transform = `translate3d(-50%, -50%, 0) rotate(${currDeg - diff * 22.5}deg)`;
    currDeg -= diff * 22.5;
  }
  return currDeg;
};

const lightOn = (target) => target[1].classList.add("light");

// const lightOut = (state, key) => (state[key] ? state[key][1].classList.remove("light") : null);
const lightOut = (target) => target[1].classList.remove("light");

const findTextTarget = (elements, capital) => {
  // console.log(elements);
  return Object.entries(elements).find((item) => item[1].dataset.id === capital);
};

const getHTMLElements = (className) => document.querySelectorAll(`.${className}`);

const getDiff = ({ state, key }, endPoint) => {
  const diff = endPoint - state[key];
  const absDiff = Math.abs(diff);
  return { diff, absDiff };
};

const turnAsDirection = ({ state, key }, element, { diff, absDiff }) => {
  console.log(state, key);
  console.log(element);
  console.log(diff, absDiff);
  let currDeg = state[key];
  if (absDiff > 7) currDeg = diff <= 0 ? turn(16 - absDiff, currDeg, element, true) : turn(16 - absDiff, currDeg, element, false);
  if (absDiff <= 7) currDeg = diff <= 0 ? turn(absDiff, currDeg, element, false) : turn(absDiff, currDeg, element, true);
  return currDeg;
};

// rotate 에서도 조합하려면?
// func에서 fns를 받는 식?
// 함수를 합성해서 합성된 함수를 만드는 함수

// const compose = (...fns) => {
//   return fns.reduce((accFns, currFn) => currFn(accFns))
// }

const getEndPoint = (array, target) => array.findIndex((item) => item.toString() === target);

const capital = (letter) => letter.toUpperCase();

// const callFunctionsAfterTimes = (ms, ...fns) => setTimeout(() => fns.forEach((fn) => fn.call()), ms);

// const rotate = (letter, i) => {
//   return new MyPromise((resolve, reject) => {
//     setTimeout(() => {
//       lightOut(rotateState, "pastTarget");
//       lightOn(findTextTarget(getHTMLElements("line__text"), capital(letter)));
//       updateState(rotateState, "pastTarget", findTextTarget(getHTMLElements("line__text"), capital(letter)));
//       // getDiff({state: rotateState, key: "currPoint"}, getEndPoint(hexadecimals, capital(letter)))
//       turnToDirection(
//         { state: rotateState, key: "currDeg" },
//         getDiff({ state: rotateState, key: "currPoint" }, getEndPoint(hexadecimals, capital(letter))),
//         getElement(selectors, "arrow")
//       );
//       updateState(rotateState, "currPoint", getEndPoint(hexadecimals, capital(letter)));
//       resolve(capital(letter));
//     }, times.send * (i + 1));
//   });
// };

// const adela = (f, ...parms) => (...fns) => (...args) =>
//   f(
//     ...parms,
//     ...fns.reduce((acc, fn, i) => {
//       acc.push(fn(args[i]));
//       return acc;
//     }, [])
//   );

const adela = (f, ...fns) => (...arg) => {
  console.log(arg);
  return f(
    ...fns.reduce((acc, fn, i) => {
      acc.push(fn(arg[i]));
      return acc;
    }, [])
  );
};

// turnAsDirection({ state, key }, selectors.arrow, getDiff());
// adela(turnAsDirection, { state, key }, selectors.arrow)(getDiff);

const rotate = (letter, i) =>
  new MyPromise((resolve, reject) =>
    setTimeout(() => {
      if (rotateState.pastTarget) lightOut(rotateState.pastTarget);
      const endPoint = getEndPoint(hexadecimals, capital(letter));
      // console.log(endPoint)
      // const target = adela(findTextTarget)(getHTMLElements, capital)("line__text", letter);
      const target = adela(findTextTarget, getHTMLElements, capital)("line__text", letter);
      lightOn(target);
      // rotateState.pastTarget = findTextTarget(getHTMLElements("line__text"), capital(letter));
      rotateState.pastTarget = target;
      // const { diff, absDiff } = getDiff({ state: rotateState, key: "currPoint" }, getEndPoint(hexadecimals, capital(letter)));

      rotateState.currDeg = turnAsDirection(
        { state: rotateState, key: "currDeg" },
        selectors.arrow,
        getDiff({ state: rotateState, key: "currPoint" }, endPoint)
      );

      // const endPoint = adela(getEndPoint, hexadecimals)(capital)(letter);
      // console.log(endPoint);
      // const diff = adela(getDiff, { state: rotateState, key: "currPoint" }, endPoint)()();
      // console.log(diff);
      // const degAfterTurn = adela(turnAsDirection, { state: rotateState, key: "currDeg" }, selectors.arrow)(diff);
      // rotateState.currDeg = degAfterTurn;

      rotateState.currPoint = endPoint;
      resolve(capital(letter));
    }, times.send * (i + 1))
  );

export { rotate, lightOut };
