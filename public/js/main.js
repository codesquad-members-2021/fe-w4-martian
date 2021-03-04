import { strToHex, hexToStr } from './converter.js';
import { $pathArr, $marsInput, $earthInput, $hexCodeOfMessage_mars, $hexCodeOfMessage_earth } from './ref.js';

const lightColor = "#fff58a";
$pathArr[0].style.fill = lightColor;

$marsInput.addEventListener('input', () => {
  $hexCodeOfMessage_mars.textContent = strToHex($marsInput.value);
});

$earthInput.addEventListener('input', () => {
  $hexCodeOfMessage_earth.textContent = strToHex($earthInput.value);
})
