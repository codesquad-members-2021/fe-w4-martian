import { _ } from './util.js';
// import { MyPromise } from './my-promise.js';

const initPies = ($txrx) => {
  return (pieCnt) => {
    for (let i = 0; i < pieCnt; i++) {
      $txrx.appendChild(_.genEl('DIV', {
        classNames: [`divider-${i}`],
      }));
      $txrx.appendChild(_.genEl('DIV', {
        classNames: [`hex-${i}`],
        template: `${i.toString(16).toUpperCase()}`,
      }));
    }
  };
}

const initArrowContainer = ($txrx) => {
  return (imgData) => {
    const $container = _.genEl('DIV', {
      classNames: [`arrow-cont`],
      template: `<div class="ring"></div>`
    });
    
    $container.appendChild(_.genEl('IMG', {
      classNames: [`arrow`],
      attributes: { 'src': imgData.url, 'data-indicating': 0 },
    }));

    $txrx.appendChild($container);
  };
}

const rotateArrow = ($arrow, totalHex) => {
  let currHex = $arrow.dataset.indicating;
  let oldRotateClass;
  let newRotateClass;

  return (hex) => {
    const isClock = Math.abs(currHex - hex) < Math.abs(totalHex - hex) + currHex;
    newRotateClass = `rotate-${isClock ? 'clock' : 'unclock'}-for-${hex}`;

    $arrow.dataset.indicating = currHex = hex;
    $arrow.classList.remove(oldRotateClass);
    $arrow.classList.add(newRotateClass);

    oldRotateClass = newRotateClass;
  }
}

const blink = ($hex) => {
  // TODO
}

const transfer = () => {
  
}

const receive = () => {
  
}

export {
  initPies,
  initArrowContainer,
  rotateArrow,
}