const hexadecimals = [...Array(10).keys(), "A", "B", "C", "D", "E", "F"];

const _ = {
  $: (selector, element = document) => element.querySelector(selector),
  $All: (selector, element = document) => element.querySelectorAll(selector),
  curry: (f) => (a, ...bs) => (bs.length ? f(a, ...bs) : (...cs) => f(a, ...cs)),
  go: (arg, ...fns) => fns.reduce((acc, fn) => fn(acc), arg),
  pipe: (...fns) => (a) => fns.reduce((acc, fn) => fn(acc), a),
};

const selectors = {
  arrow: _.$(".roulette__arrow"),
  translatorButton: _.$(".translate__button"),
  sentContentHex: _.$(".sentContent__hex"),
  sendToEarthButton: _.$(".sendContent__button"),
  receivedContentHex: _.$(".receivedContent__hex"),
  receivedContentText: _.$(".receivedContent__text"),
};

const rotationState = {
  currPoint: 0,
  currDeg: 15,
  pastTarget: null,
  maxDistance: 7,
  oneDeg: 22.5,
};

const times = {
  send: 2000,
  receive: 500,
  transition: 300,
};

export { hexadecimals, selectors, rotationState, times, _ };
