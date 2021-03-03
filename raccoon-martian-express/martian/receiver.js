const $marsInfo = document.querySelector('#mars--info');
const $interpretButton = document.querySelector('#interpret-mars--button');
const $send2earthButton = document.querySelector('#send-to-earth--button');
const $send2marsButton = document.querySelector('#send-to-mars--button');

$interpretButton.addEventListener('click', interpret);

function interpret() {
  return ($marsInfo.value = hex2str($marsInfo.value));
}

function str2hex(str) {
  return str
    .split('')
    .map((el) => el.charCodeAt(0).toString(16))
    .join(' ');
}

function hex2str(hex) {
  return hex
    .split(' ')
    .map((el) => String.fromCharCode(parseInt(el, 16)))
    .join('');
}

function sendMessage() {}

function whichPlanet(e) {
  const isEarth = () => e.target === $send2earthButton;
  const isMars = () => e.target === $send2marsButton;
  return;
}

let helloHex = str2hex('hello');

console.log(helloHex);
console.log(hex2str(helloHex));
console.log($marsInfo);
