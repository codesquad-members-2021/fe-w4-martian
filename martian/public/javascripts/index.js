const $charText = document.querySelector('.main--char--text');
const $hexText = document.querySelector('.main--hex--text');

const translasteToHex = (e) => {
  const charText = [...e.target.value];
  const hexText = charText.reduce((acc, cur) => {
    return `${acc}${cur.charCodeAt(0).toString(16)}`;
  }, '');
  $hexText.value = hexText;
};

const sendMessage = () => {};

const handleArrowOnWheel = () => {};

const handleHexMessageBox = () => {};

$charText.addEventListener('keydown', translasteToHex);
