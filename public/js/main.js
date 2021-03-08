import { strToHex, hexToStr } from './converter.js';
import { $contentsBox, $pathArr, $marsSendReceiveInfo, $marsInput, $marsSendBtn, $earthInput, $earthSendBtn, $hexCodeOfMessage_mars, $hexCodeOfMessage_earth } from './ref.js';
const { log } = console;

// const lightColor = "#fff58a";
// $pathArr[0].style.fill = lightColor;

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
      const hexMessageArr = sentHexMessage
                              .split('')
                              .filter(v => v !== ' ');
      $marsInput.value = '';
      $marsSendReceiveInfo.innerText = '';
      $marsSendBtn.disabled = 'true';
    }
  }
})