import { _ } from './util.js';

const $pathArr = Array.from(_.$All('path')).slice(0, 16);
const $marsInput = _.$('.mars-send-input');
const $earthInput = _.$('.earth-send-input');
const [ $hexCodeOfMessage_mars, $hexCodeOfMessage_earth ] = _.$All('.send-receive-info');
const $arrow = _.$('.arrow');

export {
  $pathArr,
  $marsInput,
  $earthInput,
  $hexCodeOfMessage_mars,
  $hexCodeOfMessage_earth,
  $arrow
}