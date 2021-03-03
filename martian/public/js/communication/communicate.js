import { textToHex, hexToText } from "./convert.js";
import { rotate } from "./rotate.js";

const isString = ({ keyCode }) => keyCode >= 65 && keyCode <= 90;

const registerEvent = (type, element, ...fns) => element.addEventListener(type, (e) => fns.forEach((fn) => fn(e)));

const send = (content, receiver) =>
  content.split("").forEach((letter, i) => rotate(letter, i).then((res) => setTimeout(() => (receiver.value += res), 500)));

const communicate = (senders, receivers) => {
  const { sentContentHex, sendToEarthButton } = senders;
  const { receivedContentHex, translatorButton, receivedContentText } = receivers;
  let translatedWord = ``;

  const convertKeydown = (e) => (isString(e) ? (translatedWord += textToHex(e)) : (translatedWord = sentContentHex.value));
  const convertKeyup = (e) => (isString(e) ? (sentContentHex.value = translatedWord) : sentContentHex.value);
  const sendToEarth = () => {
    const content = sentContentHex.value;
    send(content, receivedContentHex);
    sentContentHex.value = ``;
    translatedWord = ``;
  };
  const translate = () => {
    receivedContentText.innerText += `${hexToText(receivedContentHex.value)}\n`;
    receivedContentHex.value = ``;
  };
  registerEvent("keydown", sentContentHex, convertKeydown);
  registerEvent("keyup", sentContentHex, convertKeyup);
  registerEvent("click", sendToEarthButton, sendToEarth);
  registerEvent("click", translatorButton, translate);
};

export { communicate };
