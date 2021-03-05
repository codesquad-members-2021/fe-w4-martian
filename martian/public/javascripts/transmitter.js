import { _, hexToDec } from './util.js';
import { $charText, $hexText } from './index.js';
import { handleArrow } from './handleArrow.js';

const $notification = _.$('.notification--completion');

const execRealTimeTranslation = (e) => {
  showText(translateCharToHex(e.target.value));
};

const execTransmission = () => {
  handleWheel($hexText.value);
};

const translateCharToHex = (val) => {
  const arrCharText = [...val];
  return arrCharText.reduce((acc, cur) => {
    return `${acc}${cur.charCodeAt(0).toString(16).toUpperCase()}`;
  }, '');
};

const splitHexTextByTwo = (m) => {
  return m.match(/..?/g);
};

const translateHexToChar = (val) => {
  return splitHexTextByTwo(val).reduce((acc, cur) => {
    return `${acc}${String.fromCharCode(parseInt(cur, 16))}`;
  }, '');
};

const showText = (text) => ($hexText.value = text);

const handleWheel = (text) => {
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

  const hexTextByOne = [...text];
  let hexTyping = '';

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
      }, 1000);
    });
  };

  hexTextByOne
    .reduce((acc, cur) => {
      return acc.then(() => {
        return handleWheelAsync(cur);
      });
    }, Promise.resolve())
    .then(() => {
      //   $notification.style.setProperty('display', 'block');
      //   $notification.innerHTML = 'Transfer done';
    });
};

// const charToDec = (char) => char.charCodeAt(0);
// const decToHex = (dec) => dec.toString(16);

const showTranslationResult = (val) => {
  $notification.style.setProperty('display', 'block');
  $notification.innerHTML = translateHexToChar(val);
  setTimeout(() => {
    $notification.style.setProperty('display', 'none');
  }, 2000);
};

export {
  execRealTimeTranslation,
  execTransmission,
  showTranslationResult,
  translateCharToHex,
  handleWheel,
};
