import '../scss/style.scss';
// import variables from '../scss/_export.scss'; -> not working..
import { _ } from './util.js';
import { initPies, initArrowContainer, rotateArrow } from './transceiver.js';

const SERVER = 'http://localhost:3000/';

export const COMMUNICATION_INTERVAL = 1000;
export const BLINK_INTERVAL = 400;
export const PIE_CNT = 16;

document.addEventListener('DOMContentLoaded', () => {
  fetch(SERVER + 'json/contents.json')
    .then(res => res.json())
    .then(json => {
      const $transceiver = _.$('.txrx');
      initPies($transceiver)(PIE_CNT);
      initArrowContainer($transceiver)(json.arrowImg);

      rotateSimul();
    });
});


const rotateSimul = () => {
  setTimeout(() => {
    const rotateTo = rotateArrow(_.$('.arrow'), PIE_CNT);
    rotateTo(6);
    setTimeout(() => {
      rotateTo(0xA);
      setTimeout(() => {
        rotateTo(4);
      }, 500);
    }, 500);
  }, 500);
}