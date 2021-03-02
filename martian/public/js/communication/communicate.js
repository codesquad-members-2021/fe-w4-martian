import { textToHex, hexToText } from "./convert.js";

const isString = ({ keyCode }) => (keyCode >= 65 && keyCode <= 90) || keyCode === 32;

const registerEvent = (type, element, ...fns) => element.addEventListener(type, (e) => fns.forEach((fn) => fn(e)));

const send = (contents, receivedContent) =>
  contents.split("").forEach((letter, idx) => setTimeout(() => (receivedContent.value += letter), 500 * (idx + 1)));

const communicate = (senders, receivers) => {
  const { sentContentHex, sendToEarthButton } = senders;
  const { receivedContentHex, translatorButton, receivedContentText } = receivers;
  let translatedWord = ``;
  let initDeg = 15;

  const convertKeydown = (e) => (isString(e) ? (translatedWord += textToHex(e)) : (translatedWord = sentContentHex.value));
  const convertKeyup = (e) => (isString(e) ? (sentContentHex.value = translatedWord) : sentContentHex.value);
  const sendToEarth = () => {
    const contents = sentContentHex.value;
    send(contents, receivedContentHex);
    // 이 부분에서 룰렛 rotate 하는거 해야할 것 같음
    // 5초 간격으로 문자를 받으면 -> 해당 문자에 룰렛 화살표가 2초간 머묾
    // 가까운 방향으로 회전 -> 문자별로 시계방향이 더 빠른지, 반시계방향이 더 빠른지 계산하는 알고리즘 짜기
    // const arrow = document.querySelector(".roulette__arrow");
    // arrow.style.transition = `300ms`;
    // arrow.style.transform = `translate3d(-50%, -50%, 0px) rotate(${(initDeg += 15)}deg)`;
    // promise 사용하기
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
