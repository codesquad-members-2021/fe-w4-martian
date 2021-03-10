import { _ } from './util.js';

const $contentsBox = _.$('.contents-box');
const $pathArr = Array.from(_.$All('path')).slice(0, 16);
const $marsSendReceiveInfo = _.$('.mars-send-receive-info');
const $marsInput = _.$('.mars-send-input');
const $marsSendBtn = _.$('.mars-send-btn');
const $earthInput = _.$('.earth-send-input');
const $earthSendBtn = _.$('.earth-send-btn');
const [ $hexCodeOfMessage_mars, $hexCodeOfMessage_earth ] = _.$All('.send-receive-info');
const $arrow = _.$('.arrow');

export {
  $contentsBox,
  $pathArr,
  $marsSendReceiveInfo,
  $marsInput,
  $marsSendBtn,
  $earthInput,
  $earthSendBtn,
  $hexCodeOfMessage_mars,
  $hexCodeOfMessage_earth,
  $arrow
}