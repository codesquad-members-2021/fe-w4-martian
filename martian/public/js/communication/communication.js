import * as convert from "./convertor.js";
import { rotateRoulette } from "./rotation.js";
// import { times } from "../util.js";
// import MyPromise from "../Promise.js";

const isString = ({ keyCode }) => (keyCode >= 65 && keyCode <= 90) || keyCode === 32;

const registerEvent = (type, element, ...fns) => element.addEventListener(type, (e) => fns.forEach((fn) => fn(e)));

const isLast = (index, iterator) => index === iterator.length - 1;

const response = (content, receivers) => {
  const { receivedContentHex, translatorButton } = receivers;
  for (let i = 0; i < content.length; i++) {
    const letter = content[i];
    rotateRoulette(letter, i, isLast(i, content)).then((res) => {
      receivedContentHex.value += res;
      translatorButton.disabled = isLast(i, content) ? false : true;
    });
    // string을 split하는 시간 + forEach로 오래걸릴것 같은데, 차라리 for(let i ...)문이 더 나을까..?
    // content.split("").forEach((letter, i) =>
    //   rotateRoulette(letter, i, isLast(i, content)).then((res) => {
    //     receivedContentHex.value += res;
    //     translatorButton.disabled = isLast(i, content) ? false : true;
    //   })
    // );
  }
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

const communicate = (senders, receivers) => {
  const { sentContentHex, sendToEarthButton } = senders;
  const { receivedContentHex, translatorButton, receivedContentText } = receivers;
  let translatedWord = ``;

  const convertKeydown = (e) => (isString(e) ? (translatedWord += convert.textToHex(e)) : (translatedWord = sentContentHex.value));

  const convertKeyup = (e) => (sentContentHex.value = isString(e) ? translatedWord : sentContentHex.value);

  const sendToEarth = () => {
    const content = sentContentHex.value;
    response(content, { receivedContentHex, translatorButton });
    const convertKeyup = (e) => (isString(e) ? (sentContentHex.value = translatedWord) : sentContentHex.value);
    const sendToEarth = () => {
      const contents = sentContentHex.value;
      send(contents, receivedContentHex);
      sentContentHex.value = ``;
      translatedWord = ``;
    };
    const translate = () => {
      receivedContentText.innerText += `${convert.hexToText(receivedContentHex.value)}\n`;
      receivedContentHex.value = ``;
      translatorButton.disabled = true;
    };
    registerEvent("keydown", sentContentHex, throttle(convertKeydown, 100));
    registerEvent("keyup", sentContentHex, throttle(convertKeyup, 100));
    registerEvent("click", sendToEarthButton, sendToEarth);
    registerEvent("click", translatorButton, translate);
  };
};

export { communicate };
