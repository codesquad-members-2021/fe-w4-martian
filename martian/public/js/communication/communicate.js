import { textToHex, hexToText } from "./convert.js";
<<<<<<< HEAD
import { rotate } from "./rotate.js";
import { times } from "../util.js";
import MyPromise from "../Promise.js";
=======
>>>>>>> e63811c ([Create] Roulette)

const isString = ({ keyCode }) => (keyCode >= 65 && keyCode <= 90) || keyCode === 32;

const registerEvent = (type, element, ...fns) => element.addEventListener(type, (e) => fns.forEach((fn) => fn(e)));

<<<<<<< HEAD
const response = (content, receivers) => {
  const { receivedContentHex, translatorButton } = receivers;
  content.split("").forEach((letter, i) =>
    rotate(letter, i, i === content.length - 1).then((capital) =>
      new MyPromise((resolve, reject) => {
        setTimeout(() => {
          receivedContentHex.value += capital;
          resolve(i === content.length - 1);
        }, times.receive);
      }).then((res) => (translatorButton.disabled = res ? false : true))
    )
  );
};

const throttle = (func, limit) => {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
=======
const send = (contents, receivedContent) =>
  contents.split("").forEach((letter, idx) => setTimeout(() => (receivedContent.value += letter), 500 * (idx + 1)));
<<<<<<< HEAD
// 시간을 계속 지연시켜주기.. 바보.. 왜 이런걸로 삽질 ㅜㅜ
>>>>>>> e63811c ([Create] Roulette)
=======
>>>>>>> 840dfaa ([Add] Roulette)

const communicate = (senders, receivers) => {
  const { sentContentHex, sendToEarthButton } = senders;
  const { receivedContentHex, translatorButton, receivedContentText } = receivers;
  let translatedWord = ``;
  let initDeg = 15;

  const convertKeydown = (e) => (isString(e) ? (translatedWord += textToHex(e)) : (translatedWord = sentContentHex.value));
<<<<<<< HEAD

  const convertKeyup = (e) => (sentContentHex.value = isString(e) ? translatedWord : sentContentHex.value);

  const sendToEarth = () => {
    const content = sentContentHex.value;
    response(content, { receivedContentHex, translatorButton });
=======
  const convertKeyup = (e) => (isString(e) ? (sentContentHex.value = translatedWord) : sentContentHex.value);
  const sendToEarth = () => {
    const contents = sentContentHex.value;
    send(contents, receivedContentHex);
<<<<<<< HEAD
>>>>>>> e63811c ([Create] Roulette)
=======
    // 이 부분에서 룰렛 rotate 하는거 해야할 것 같음
    // 5초 간격으로 문자를 받으면 -> 해당 문자에 룰렛 화살표가 2초간 머묾
    // 가까운 방향으로 회전 -> 문자별로 시계방향이 더 빠른지, 반시계방향이 더 빠른지 계산하는 알고리즘 짜기
    // const arrow = document.querySelector(".roulette__arrow");
    // arrow.style.transition = `300ms`;
    // arrow.style.transform = `translate3d(-50%, -50%, 0px) rotate(${(initDeg += 15)}deg)`;
    // promise 사용하기
>>>>>>> 840dfaa ([Add] Roulette)
    sentContentHex.value = ``;
    translatedWord = ``;
  };
  const translate = () => {
    receivedContentText.innerText += `${hexToText(receivedContentHex.value)}\n`;
    receivedContentHex.value = ``;
<<<<<<< HEAD
    translatorButton.disabled = true;
  };

  registerEvent("keydown", sentContentHex, throttle(convertKeydown, 100));
  registerEvent("keyup", sentContentHex, throttle(convertKeyup, 100));
  registerEvent("click", sendToEarthButton, sendToEarth);
  registerEvent("click", translatorButton, translate);
=======
  };
  registerEvent("keydown", sentContentHex, convertKeydown);
  registerEvent("keyup", sentContentHex, convertKeyup);
  registerEvent("click", sendToEarthButton, sendToEarth);
  registerEvent("click", translatorButton, translate);
<<<<<<< HEAD
  // registerEvent("click", sendToEarthButton, () => {
  //   const contents = sentContentHex.value;
  //   send(contents, receivedContentHex);
  //   sentContentHex.value = ``;
  //   translatedWord = ``;
  // }); // keyup, keydown 처럼 별도의 함수로 빼면 receivedContentHex가 잡히지 않는다. 방법이 없을까..? -> 잘만됨;

  // registerEvent("click", translatorButton, () => {
  //   receivedContentText.innerText += `${hexToText(receivedContentHex.value)}\n`;
  //   receivedContentHex.value = ``;
  // });
>>>>>>> e63811c ([Create] Roulette)
=======
>>>>>>> 840dfaa ([Add] Roulette)
};

export { communicate };
