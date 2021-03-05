const _ = {
  $: (selector, target = document) => target.querySelector(selector),
  $All: (strSelector, target = document) =>
    target.querySelectorAll(strSelector),
  addEvent: (target, eventType, callback, options = false) =>
    target.addEventListener(eventType, callback, options),
};

const hexToDec = (val) => {
  return parseInt(val, 16);
};

export { _, hexToDec };
