/* eslint-disable arrow-body-style */
import _ from './util.js';
import MyPromise from './myPromise.js';

const $notification = _.$('.notification');
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
const initAngle = -78.5;
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

const hexToDec = (val) => {
  return parseInt(val, 16);
};

const handleArrow = (val) => {
  const angleToTurn = chooseDirection(val);

  const transformDeg = `rotate(${angleToTurn}deg)`;
  $arrow.style.setProperty('transform', transformDeg);
};

const chooseDirection = (val) => {
  const [positiveAngleToTurn, negativeAngleToTurn] = [
    hexToDec(val) * 22.5,
    -360 + hexToDec(val) * 22.5,
  ];

  return positiveAngleToTurn < 180
    ? initAngle + positiveAngleToTurn
    : initAngle + negativeAngleToTurn;
};

const handleWheel = () => {
  const hexTextByOne = [...hexText];
  let hexTyping = '';
  let arrPromise = [];

  handleWheelAsync(val).bind(this);

  hexTextByOne
    .reduce((acc, cur) => {
      arrPromise.push(handleWheelAsync);
      return acc.then(() => {
        return handleWheelAsync(cur);
      });
    }, Promise.resolve())
    .then(() => {
      $notification.style.setProperty('visibility', 'visible');
      setTimeout(() => {
        $notification.innerHTML = 'The receiver starts now';
      }, 2000);
    });
};

const handleWheelAsync = (val) => {
  return new Promise((resolve, reject) => {
    if (val === 0) {
      showText(0);
    }

    hexTyping += val;
    showText(hexTyping);
    $text[val].classList.add('blink');

    handleArrow(val);

    setTimeout(() => {
      $text[val].classList.remove('blink');
      resolve(true);
    }, 2000);
  });
};

_.addEvent($charText, 'keyup', translasteToHex);
_.addEvent($sendBtn, 'click', handleWheel);

//   const hexTextByTwo = hexText.match(/..?/g);
