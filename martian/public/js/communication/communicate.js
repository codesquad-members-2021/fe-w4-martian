import { textToHex, hexToText } from "./convert.js";
import { rotate, lightOut } from "./rotate.js";
import { times } from "../util.js";

const isString = ({ keyCode }) => keyCode >= 65 && keyCode <= 90;

const registerEvent = (type, element, ...fns) => element.addEventListener(type, (e) => fns.forEach((fn) => fn(e)));

const response = (content, receivers) => {
  const { receivedContentHex, translatorButton } = receivers;
  content.split("").forEach((letter, i) =>
    rotate(letter, i).then((capital) =>
      setTimeout(() => {
        receivedContentHex.value += capital;
        if (i === content.length - 1) translatorButton.disabled = false;
      }, times.receive)
    )
  );
};

const communicate = (senders, receivers) => {
  const { sentContentHex, sendToEarthButton } = senders;
  const { receivedContentHex, translatorButton, receivedContentText } = receivers;
  let translatedWord = ``;

  const convertKeydown = (e) => (isString(e) ? (translatedWord += textToHex(e)) : (translatedWord = sentContentHex.value));
  const convertKeyup = (e) => (isString(e) ? (sentContentHex.value = translatedWord) : sentContentHex.value);
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
  registerEvent("keydown", sentContentHex, convertKeydown);
  registerEvent("keyup", sentContentHex, convertKeyup);
  registerEvent("click", sendToEarthButton, sendToEarth);
  registerEvent("click", translatorButton, translate);
};

export { communicate };
