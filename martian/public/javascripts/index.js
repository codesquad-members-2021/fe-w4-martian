import { _ } from './util.js';
import {
  execRealTimeTranslation,
  execTransmission,
  showTranslationResult,
} from './transmitter.js';
import { receiver, execReception } from './receiver.js';

const $charText = _.$('.main--char--text');
const $hexText = _.$('.main--hex--text');
const $sendBtn = _.$('.main--char--button');
const $translateBtn = _.$('.main--hex--button');
const $alert = _.$('.notification--message');
const MESSAGE = 'Hi';

const init = () => {
  _.addEvent($charText, 'keyup', execRealTimeTranslation);
  _.addEvent($sendBtn, 'click', execTransmission);
  _.addEvent($translateBtn, 'click', () => {
    showTranslationResult($hexText.value);
  });
  _.addEvent($alert, 'click', execReception);
};

init();

const sendMessage = () => {
  receiver(MESSAGE);
};

sendMessage();

export { $charText, $hexText, $alert };
