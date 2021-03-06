import { textToHex, hexToText } from "./convert.js";
import { rotate } from "./rotate.js";
import { times } from "../util.js";
import MyPromise from "../Promise.js";

const isString = ({ keyCode }) => (keyCode >= 65 && keyCode <= 90) || keyCode === 32;

const registerEvent = (type, element, ...fns) => element.addEventListener(type, (e) => fns.forEach((fn) => fn(e)));

const isLast = (index, iterator) => index === iterator.length - 1;

const response = (content, receivers) => {
  const { receivedContentHex, translatorButton } = receivers;
  content.split("").forEach(
    (letter, i) =>
      rotate(letter, i, isLast(i, content)).then((res) => {
        receivedContentHex.value += res;
        translatorButton.disabled = isLast(i, content) ? false : true;
      })
    // rotate(letter, i, i === content.length - 1).then((capital) =>
    //   new MyPromise((resolve, reject) => {
    //     setTimeout(() => {
    //       receivedContentHex.value += capital;
    //       resolve(i === content.length - 1);
    //     }, times.receive);
    //   }).then((res) => (translatorButton.disabled = res ? false : true))
    // )
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

const communicate = (senders, receivers) => {
  const { sentContentHex, sendToEarthButton } = senders;
  const { receivedContentHex, translatorButton, receivedContentText } = receivers;
  let translatedWord = ``;

  const convertKeydown = (e) => (isString(e) ? (translatedWord += textToHex(e)) : (translatedWord = sentContentHex.value));

  const convertKeyup = (e) => (sentContentHex.value = isString(e) ? translatedWord : sentContentHex.value);

  const sendToEarth = () => {
    const content = sentContentHex.value;
    response(content, { receivedContentHex, translatorButton });
    sentContentHex.value = ``;
    translatedWord = ``;
  };
  const translate = () => {
    receivedContentText.innerText += `${hexToText(receivedContentHex.value)}\n`;
    receivedContentHex.value = ``;
    translatorButton.disabled = true;
  };
  registerEvent("keydown", sentContentHex, throttle(convertKeydown, 100));
  registerEvent("keyup", sentContentHex, throttle(convertKeyup, 100));
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
};

export { communicate };
