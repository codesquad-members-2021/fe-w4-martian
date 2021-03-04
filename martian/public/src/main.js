import _ from './util.js';
import renderPlate from './renderPlate.js';

const Hexadecimal = ['0', '1', '2', '3', '4', '5', '6', '7', '8',
  '9', 'A', 'B', 'C', 'D', 'E', 'F'];

const $canvas = _.$('._canvas');
const context = $canvas.getContext('2d');
renderPlate({ context, Hexadecimal });


const convertStringToHex = (string) => {
  return string.charCodeAt().toString(16);
}

const convertHexToString = (hex) => {
  return String.fromCharCode(parseInt(hex, 16));
}

const convertFromMessage = (massage) => {

}


const $receiveInput = _.$('._receive_input');
const $receiveButton = _.$('._receive_button');
const $receiveInterpreting = _.$('._receive_interpreting');

$receiveButton.addEventListener('click', () => {
  const convertString = $receiveInput.value.split(' ')
    .map(e => convertHexToString(e)).join('');
  $receiveInterpreting.innerText = convertString;
});


const $sendInput = _.$('._send_input');
const $sendButton = _.$('._send_button');
const $sendInterpreting = _.$('._send_interpreting');

$sendInput.addEventListener('input', ({ target: { value } }) => {
  const convertNumber = value.split('')
    .map(e => convertStringToHex(e))
    .join(' ');
  $sendInterpreting.innerText = convertNumber;
});

const appointed = _.$All('.appointed > div');
const addBlinkColor = (index) => {
  appointed[index].classList.add('blinking');
}

const removeBlinkColor = (index) => {
  appointed[index].classList.remove('blinking');
}

const runTransceiver = ({ $arrow, $message, $receiveInput, Hexadecimal }) => {
  const messageArray = $message.innerText.split(' ');
  const size = 360 / Hexadecimal.length;
  let prevIndex = 0;
  const allMessageTimer = setInterval(() => {
    const currentMessage = messageArray.shift().split('');
    const currentMessageTimer = setInterval(() => {
      const currentIndex = Hexadecimal.indexOf(currentMessage.shift().toUpperCase());
      removeBlinkColor(prevIndex);
      addBlinkColor(currentIndex);
      const distance = prevIndex - currentIndex;
      const way = distance >= 8 || (distance <= 0 && distance >= -8);
      const step = Math.abs(distance) > 8 ? 16 - Math.abs(distance) : Math.abs(distance);
      const prevAngle = Number($arrow.style.transform.slice(7).slice(0, -4));
      $arrow.style.transform = way ? `rotate(${prevAngle + step * size}deg)`
        : `rotate(${prevAngle - step * size}deg)`;
      prevIndex = currentIndex;

      $receiveInput.value += Hexadecimal[currentIndex];
      if (!currentMessage[0]) clearInterval(currentMessageTimer);
    }, 2000);
    $receiveInput.value += ' ';
    if (!messageArray[0]) clearInterval(allMessageTimer);
  }, 5000);
}

const $arrow = _.$('.arrow');
const $message = _.$('._message');

runTransceiver({ $arrow, $message, $receiveInput, Hexadecimal });