const $charText = document.querySelector('.main--char--text');
const $hexText = document.querySelector('.main--hex--text');
const $sendBtn = document.querySelector('.main--char--button');
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

const handleArrowOnWheel = (i) => {
  const $chartText = document.querySelectorAll('.chart-text');
  const hexTyping = '';
  const hexTextByOne = [...hexText];
  for (let i = 0; i < hexTextByOne.length; i++) {
    $hexText.value = hexTyping;
    $chartText[hexTextByOne[i]].classList.add('blink');
    $hexText.value += hexTyping;
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

$charText.addEventListener('keyup', translasteToHex);
$sendBtn.addEventListener('click', renderMessage);

//   const hexTextByTwo = hexText.match(/..?/g);
