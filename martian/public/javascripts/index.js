import _ from './util.js';
import MyPromise from './myPromise.js';

const $charText = _.$('.main--char--text');
const $hexText = _.$('.main--hex--text');
const $sendBtn = _.$('.main--char--button');
let hexText = '';

const translasteToHex = (e) => {
  const arrCharText = [...e.target.value];
  hexText = arrCharText.reduce((acc, cur) => {
    return `${acc}${cur.charCodeAt(0).toString(16)}`;
  }, '');
  showText(hexText);
};

const showText = (text) => {
  $hexText.value = text;
};

const handleArrowOnWheel = () => {
  const $chartText = _.$All('.chart-text');
  let hexTyping = '';
  const hexTextByOne = [...hexText];
  for (let i = 0; i < hexTextByOne.length; i++) {
    if (i === 0) {
      $hexText.value = 0;
    }
    hexTyping += hexTextByOne[i];
    $hexText.value = hexTyping;
    $chartText[hexTextByOne[i]].classList.add('blink');
    setTimeout(() => {
      $chartText[hexTextByOne[i]].classList.remove('blink');
    }, 2000);
  }
};

const handleHexMessageBox = () => {};

const renderMessage = () => {
  handleArrowOnWheel();
  handleHexMessageBox();
};

_.addEvent($charText, 'keyup', translasteToHex);
_.addEvent($sendBtn, 'click', renderMessage);

//   const hexTextByTwo = hexText.match(/..?/g);
