const $charText = document.querySelector('.main--char--text');
const $hexText = document.querySelector('.main--hex--text');
const $sendBtn = document.querySelector('.main--char--button');
let hexText = '';

const translasteToHex = (e) => {
  const arrCharText = [...e.target.value];
  hexText = arrCharText.reduce((acc, cur) => {
    return `${acc}${cur.charCodeAt(0).toString(16)}`;
  }, '');
  showTranslatedText(hexText);
};

const showTranslatedText = (text) => {
  $hexText.value = text;
};

const handleArrowOnWheel = () => {
  const $chartText = document.querySelectorAll('.chart-text');
  const hexTextByOne = [...hexText];
  for (let i = 0; i < hexTextByOne.length; i++) {
    setTimeout(() => {
      console.log('hi');
      // $chartText[0].classList.add('foo');
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
