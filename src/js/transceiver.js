import { _ } from './util.js';
// import { MyPromise } from './my-promise.js';

const pipe = (...fns) => (arg) => fns.reduce((currArg, fn) => fn(currArg), arg);

const getTransceiver = () => {
  const $target = _.$('.txrx');

  return (pieCnt) => {
    for (let i = 0; i < pieCnt; i++) {
      $target.appendChild(_.genEl('DIV', {
        classNames: [`divider-${i}`],
      }));
      $target.appendChild(_.genEl('DIV', {
        classNames: [`hex-${i}`],
        template: `${i.toString(16).toUpperCase()}`,
      }));
    }
  };
}

export {
  getTransceiver,
}