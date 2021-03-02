import { textToHex, hexToText } from "./convert.js";

const isString = ({ keyCode }) => (keyCode >= 65 && keyCode <= 90) || keyCode === 32;

const registerEvent = (type, element, ...fns) => element.addEventListener(type, (e) => fns.forEach((fn) => fn(e)));

const send = (contents, receivedContent) =>
  contents.split("").forEach((letter, idx) => setTimeout(() => (receivedContent.value += letter), 500 * (idx + 1)));
// 시간을 계속 지연시켜주기.. 바보.. 왜 이런걸로 삽질 ㅜㅜ

const communicate = (senders, receivers) => {
  const { sentContentHex, sendToEarthButton } = senders;
  const { receivedContentHex, translatorButton, receivedContentText } = receivers;
  let translatedWord = ``;

  const convertKeydown = (e) => (isString(e) ? (translatedWord += textToHex(e)) : (translatedWord = sentContentHex.value));
  const convertKeyup = (e) => (isString(e) ? (sentContentHex.value = translatedWord) : sentContentHex.value);
  const sendToEarth = () => {
    const contents = sentContentHex.value;
    send(contents, receivedContentHex);
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
