import { hexadecimals, selectors, rotateState } from "../util.js";
import MyPromise from "../Promise.js";

selectors.arrow = document.querySelector(".roulette__arrow");

const clockWise = (diff, currDeg) => {
  // present: rotate(currDeg)
  // clock: rotate(currDeg + diff*15)
  // currDeg += diff*15
  const { arrow } = selectors;
  arrow.style.transition = `300ms`;
  arrow.style.transform = `translate3d(-50%, -50%, 0) rotate(${currDeg + diff * 22.5}deg)`;
  currDeg += diff * 22.5;
  return currDeg;
};
const counterClockWise = (diff, currDeg) => {
  const { arrow } = selectors;
  arrow.style.transition = `300ms`;
  arrow.style.transform = `translate3d(-50%, -50%, 0) rotate(${currDeg - diff * 22.5}deg)`;
  currDeg -= diff * 22.5;
  return currDeg;
};

const rotate = (letter, i) => {
  //   console.log(`contents: ${content}`);
  //   const { currPoint, currDeg } = rotateState;
  //   let currPoint = 0;
  //   let currDeg = 15;

  //   const promiseFunction = () =>
  return new MyPromise((resolve, reject) =>
    setTimeout(() => {
      console.log(`currPoint: ${rotateState.currPoint}`);
      console.log(`currDeg: ${rotateState.currDeg}`);

      // console.log(`letter: ${letter}`);
      const index = hexadecimals.findIndex((item) => item == letter);
      // console.log(`index: ${index}`);

      const diff = index - rotateState.currPoint;
      const absDiff = Math.abs(diff);
      // console.log(`diff: ${diff}`);

      if (absDiff > 7) {
        if (diff < 0) {
          rotateState.currDeg = clockWise(absDiff, rotateState.currDeg);
        } else {
          rotateState.currDeg = counterClockWise(absDiff, rotateState.currDeg);
        }
      } else {
        if (diff < 0) {
          rotateState.currDeg = counterClockWise(absDiff, rotateState.currDeg);
        } else {
          rotateState.currDeg = clockWise(absDiff, rotateState.currDeg);
        }
      }
      rotateState.currPoint = index;
      resolve(letter);
    }, 2000 * (i + 1))
  );

  //   let currPoint = 0;
  //   let currDeg = 15;
  //   const letters = content.split("");
  //   for (let i = 0; i < letters.length; i++) {
  //     const letter = letters[i];
  //     promiseFunction(letter, i).then((res) => console.log(`*************** ${res}`));
  //   }

  //   return promiseFunction;

  //   contents.split("").forEach((letter, i) => {
  // return new MyPromise((resolve, reject) => {
  // setTimeout(() => {
  //   console.log(`letter: ${letter}`);

  //   const index = hexadecimals.findIndex((item) => item == letter);
  //   console.log(`index: ${index}`);

  //   const diff = index - currPoint;
  //   const absDiff = Math.abs(diff);
  //   console.log(`diff: ${diff}`);

  //   if (absDiff > 7) {
  //     if (diff < 0) {
  //       currDeg = clockWise(absDiff, currDeg);
  //     } else {
  //       currDeg = counterClockWise(absDiff, currDeg);
  //     }
  //   } else {
  //     if (diff < 0) {
  //       currDeg = counterClockWise(absDiff, currDeg);
  //     } else {
  //       currDeg = clockWise(absDiff, currDeg);
  //     }
  //   }
  //   currPoint = index;
  //   // resolve(letter);
  // }, 2000 * (i + 1));
  // });
  //   });
};

export { rotate };
