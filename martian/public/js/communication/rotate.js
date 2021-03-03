import { hexadecimals, selectors, rotateState } from "../util.js";
import MyPromise from "../Promise.js";

const turn = (diff, currDeg, isClockWise) => {
  const { arrow } = selectors;
  arrow.style.transition = `300ms`;
  if (isClockWise) {
    arrow.style.transform = `translate3d(-50%, -50%, 0) rotate(${currDeg + diff * 22.5}deg)`;
    currDeg += diff * 22.5;
  }
  if (!isClockWise) {
    arrow.style.transform = `translate3d(-50%, -50%, 0) rotate(${currDeg - diff * 22.5}deg)`;
    currDeg -= diff * 22.5;
  }
  return currDeg;
};

const rotate = (letter, i) =>
  new MyPromise((resolve, reject) =>
    setTimeout(() => {
      console.log(`letter: ${letter.toUpperCase()}`);
      const index = hexadecimals.findIndex((item) => item == letter.toUpperCase());
      console.log(`index: ${index}`);
      const diff = index - rotateState.currPoint;
      const absDiff = Math.abs(diff);
      if (absDiff > 7)
        rotateState.currDeg = diff <= 0 ? turn(16 - absDiff, rotateState.currDeg, true) : turn(16 - absDiff, rotateState.currDeg, false);
      if (absDiff <= 7) rotateState.currDeg = diff <= 0 ? turn(absDiff, rotateState.currDeg, false) : turn(absDiff, rotateState.currDeg, true);
      rotateState.currPoint = index;
      resolve(letter);
    }, 2000 * (i + 1))
  );

export { rotate };
