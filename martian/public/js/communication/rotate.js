import { hexadecimals, selectors, rotateState, times } from "../util.js";
import MyPromise from "../Promise.js";

const turn = (diff, currDeg, isClockWise) => {
  const { arrow } = selectors;
  arrow.style.transition = `${times.transition}ms`;
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
      const diff = index - rotateState.currPoint;
      const absDiff = Math.abs(diff);
      if (absDiff > 7)
        rotateState.currDeg = diff <= 0 ? turn(16 - absDiff, rotateState.currDeg, true) : turn(16 - absDiff, rotateState.currDeg, false);
      if (absDiff <= 7) rotateState.currDeg = diff <= 0 ? turn(absDiff, rotateState.currDeg, false) : turn(absDiff, rotateState.currDeg, true);
      rotateState.currPoint = index;
      resolve(capital);
    }, times.send * (i + 1))
  );

export { rotate, lightOut };
