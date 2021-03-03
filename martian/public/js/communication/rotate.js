import { hexadecimals, selectors, rotateState, times } from "../util.js";
import MyPromise from "../Promise.js";

<<<<<<< HEAD
const turn = (diff, currDeg, element, isClockWise) => {
  element.style.transition = `${times.transition}ms`;
=======
const turn = (diff, currDeg, isClockWise) => {
  const { arrow } = selectors;
  arrow.style.transition = `${times.transition}ms`;
>>>>>>> 522221a ([Update] Adding light on the texts of roulette)
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

<<<<<<< HEAD
const lightOn = (target, className) => target[1].classList.add(className);

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
  // console.log(state, key);
  // console.log(element);
  // console.log(diff, absDiff);
  let currDeg = state[key];
  if (absDiff > 7) currDeg = diff <= 0 ? turn(16 - absDiff, currDeg, element, true) : turn(16 - absDiff, currDeg, element, false);
  if (absDiff <= 7) currDeg = diff <= 0 ? turn(absDiff, currDeg, element, false) : turn(absDiff, currDeg, element, true);
  return currDeg;
};

const getEndPoint = (array, target) => array.findIndex((item) => item.toString() === target);

const capital = (letter) => letter.toUpperCase();

const adela = (f, ...fns) => (...args) =>
  args.length
    ? f(
        ...fns.reduce((acc, fn, i) => {
          acc.push(fn(args[i]));
          return acc;
        }, [])
      )
    : f(...fns);

const rotate = (letter, i, isLast) =>
  new MyPromise((resolve, reject) =>
    setTimeout(() => {
<<<<<<< HEAD
      if (rotateState.pastTarget) lightOut(rotateState.pastTarget);
      const endPoint = getEndPoint(hexadecimals, capital(letter));
      const target = adela(findTextTarget, getHTMLElements, capital)("line__text", letter);
      const diff = adela(getDiff, { state: rotateState, key: "currPoint" }, endPoint);
      const direction = adela(turnAsDirection, { state: rotateState, key: "currDeg" }, selectors.arrow, diff());
      !isLast ? lightOn(target, "light") : lightOn(target, "last");
      rotateState.pastTarget = target;
      rotateState.currDeg = direction();
      rotateState.currPoint = endPoint;
      resolve(capital(letter));
=======
      console.log(`letter: ${letter.toUpperCase()}`);
      const index = hexadecimals.findIndex((item) => item == letter.toUpperCase());
      console.log(`index: ${index}`);
=======
// const find = (nodeList, target) => {
//   for (const [key, value] of Object.entries(nodeList)) {
//     if (value.dataset.id === target) {
//       console.log(value);
//     }
//     // console.log(value.dataset["id"]);
//   }
//   return undefined;
// };

const lightOn = (target) => {
  // 글자에 반짝거리는 애니메이션 주기
  target[1].classList.add("light");
};

const lightOut = (target) => {
  target[1].classList.remove("light");
};

const rotate = (letter, i) =>
  new MyPromise((resolve, reject) =>
    setTimeout(() => {
      // console.log(`letter: ${letter.toUpperCase()}`);
      const capital = letter.toUpperCase();
      const index = hexadecimals.findIndex((item) => item.toString() === capital);
      const rouletteTexts = document.querySelectorAll(".line__text");
      // const target = find(rouletteTexts, capital);
      const target = Object.entries(rouletteTexts).find((item) => item[1].dataset.id === capital);
      lightOn(target);
>>>>>>> 522221a ([Update] Adding light on the texts of roulette)
      const diff = index - rotateState.currPoint;
      const absDiff = Math.abs(diff);
      if (absDiff > 7)
        rotateState.currDeg = diff <= 0 ? turn(16 - absDiff, rotateState.currDeg, true) : turn(16 - absDiff, rotateState.currDeg, false);
      if (absDiff <= 7) rotateState.currDeg = diff <= 0 ? turn(absDiff, rotateState.currDeg, false) : turn(absDiff, rotateState.currDeg, true);
      rotateState.currPoint = index;
<<<<<<< HEAD
      resolve(letter);
>>>>>>> cbb48ed ([Add] translatorButton's ability)
=======
      resolve(capital);
>>>>>>> 522221a ([Update] Adding light on the texts of roulette)
    }, times.send * (i + 1))
  );

export { rotate, lightOut };
