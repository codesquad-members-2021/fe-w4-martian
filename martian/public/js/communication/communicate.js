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
// 시간을 계속 지연시켜주기.. 바보.. 왜 이런걸로 삽질 ㅜㅜ
>>>>>>> e63811c ([Create] Roulette)

const communicate = (senders, receivers) => {
  const { sentContentHex, sendToEarthButton } = senders;
  const { receivedContentHex, translatorButton, receivedContentText } = receivers;
  let translatedWord = ``;

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
>>>>>>> e63811c ([Create] Roulette)
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
};

export { communicate };
