const _ = {
  $: (selector, target = document) => target.querySelector(selector),
  $All: (strSelector, target = document) =>
    target.querySelectorAll(strSelector),
  $name: (className, target = document) =>
    target.getElementsByClassName(className),
  addEvent: (target, eventType, callback, options = false) =>
    target.addEventListener(eventType, callback, options),
};

export default _;
