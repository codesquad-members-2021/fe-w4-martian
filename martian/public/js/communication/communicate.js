import { textToHex, hexToText } from "./convert.js";
import { rotate, lightOut } from "./rotate.js";
import { times } from "../util.js";

const isString = ({ keyCode }) => (keyCode >= 65 && keyCode <= 90) || keyCode === 32;

const registerEvent = (type, element, ...fns) => element.addEventListener(type, (e) => fns.forEach((fn) => fn(e)));

const response = (content, receivers) => {
  const { receivedContentHex, translatorButton } = receivers;
  content.split("").forEach((letter, i) =>
    rotate(letter, i, i === content.length - 1).then((capital) =>
      setTimeout(() => {
        receivedContentHex.value += capital;
        if (i === content.length - 1) translatorButton.disabled = false;
      }, times.receive)
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
  // registerEvent("keydown", sentContentHex, convertKeydown);
  registerEvent("keydown", sentContentHex, throttle(convertKeydown, 100));
  registerEvent("keyup", sentContentHex, throttle(convertKeyup, 100));
  registerEvent("click", sendToEarthButton, sendToEarth);
  registerEvent("click", translatorButton, translate);
};

export { communicate };
