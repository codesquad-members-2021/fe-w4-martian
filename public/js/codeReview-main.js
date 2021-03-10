import { strToHex, hexToStr } from './converter.js';
import { $contentsBox, $pathArr, $marsSendReceiveInfo, $marsInput, $marsSendBtn, $earthInput, $earthSendBtn, $hexCodeOfMessage_mars, $hexCodeOfMessage_earth } from './ref.js';
import { renderArrow } from './rotateArrow.js';
const { log } = console;

// const lightColor = "#fff58a";
// $pathArr[0].style.fill = lightColor;

const delay = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms));

$marsInput.addEventListener('input', () => {
  $hexCodeOfMessage_mars.textContent = strToHex($marsInput.value);
});

$earthInput.addEventListener('input', () => {
  $hexCodeOfMessage_earth.textContent = strToHex($earthInput.value);
})

$contentsBox.addEventListener('click', ({ target }) => {
  if(target.closest('.mars-send-btn')) {
    let sentHexMessage = $marsSendReceiveInfo.innerText;
    if(sentHexMessage) {
      const hexMessageArr = sentHexMessage.split('');
      $marsInput.value = '';
      $marsSendReceiveInfo.innerText = '';
      $marsSendBtn.disabled = 'true';

      const test = async () => {
        for(let elem of hexMessageArr) {
          if(elem === ' ') {
            await delay(2000);
            continue;
          }
          log(elem)
          $marsSendReceiveInfo.innerText = `${elem}`;
          renderArrow(elem);
          await delay(1000);
        }
      }
      test();
    }
  }
})