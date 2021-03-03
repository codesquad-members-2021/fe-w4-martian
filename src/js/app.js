import '../scss/style.scss';
// import variables from '../scss/_export.scss'; -> not working..
import { _ } from './util.js';
import { initPies, initArrowContainer, rotateArrow } from './transceiver.js';
import { initFormContainer } from './form.js';

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

      initFormContainer(_.$('.receive-cont'))({
        title: '송수신정보', 
        btnContent: '해석하기',
        btnClass: 'interpret-btn',
      });
      initFormContainer(_.$('.transmit-cont'))({
        title: '발신정보입력',
        btnContent: '지구로 보내기',
        btnClass: 'transmit-btn',
      });

      // rotateSimul();
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