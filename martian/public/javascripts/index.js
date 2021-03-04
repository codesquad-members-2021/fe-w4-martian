/* eslint-disable arrow-body-style */
import _ from './util.js';
import MyPromise from './myPromise.js';

const $charText = _.$('.main--char--text');
const $hexText = _.$('.main--hex--text');
const $sendBtn = _.$('.main--char--button');
const $arrow = _.$('.arrow--img');
const $text = {
  0: _.$('.text-0'),
  1: _.$('.text-1'),
  2: _.$('.text-2'),
  3: _.$('.text-3'),
  4: _.$('.text-4'),
  5: _.$('.text-5'),
  6: _.$('.text-6'),
  7: _.$('.text-7'),
  8: _.$('.text-8'),
  9: _.$('.text-9'),
  A: _.$('.text-A'),
  B: _.$('.text-B'),
  C: _.$('.text-C'),
  D: _.$('.text-D'),
  E: _.$('.text-E'),
  F: _.$('.text-F'),
};
let hexText = '';

//const charToDec = (char) => char.charCodeAt(0)
//const decToHex = (dec) => dec.toString(16)

const translasteToHex = (e) => {
  const arrCharText = [...e.target.value];
  hexText = arrCharText.reduce((acc, cur) => {
    return `${acc}${cur.charCodeAt(0).toString(16).toUpperCase()}`;
  }, '');
  showText(hexText);
};

const showText = (text) => ($hexText.value = text);

const handleWheel = () => {
  const $chartText = _.$All('.chart-text');
  const hexTextByOne = [...hexText];
  let hexTyping = '';

  let asyncFn = (val) => {
    return new Promise((resolve, reject) => {
      if (val === 0) {
        $hexText.value = 0;
      }

      hexTyping += val;
      showText(hexTyping);
      $text[val].classList.add('blink');

      const hexToDec = parseInt(val, 16);
      const initAngle = -78.5;
      const [positiveAngleToTurn, negativeAngleToTurn] = [
        hexToDec * 22.5,
        -360 + hexToDec * 22.5,
      ];
      const angleToTurn =
        positiveAngleToTurn < 180
          ? initAngle + positiveAngleToTurn
          : initAngle + negativeAngleToTurn;

      const transformDeg = `rotate(${angleToTurn}deg)`;
      $arrow.style.setProperty('transform', transformDeg);

      setTimeout(() => {
        $text[val].classList.remove('blink');
        resolve(true);
      }, 2000);
    });
  };

  hexTextByOne.reduce((acc, cur) => {
    return acc.then(() => {
      return asyncFn(cur);
    });
  }, Promise.resolve());
};

const handleHexMessageBox = () => {};

const renderMessage = () => {
  handleWheel();
};

_.addEvent($charText, 'keyup', translasteToHex);
_.addEvent($sendBtn, 'click', renderMessage);

//   const hexTextByTwo = hexText.match(/..?/g);
