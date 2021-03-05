import { _, hexToDec } from './util.js';

const INIT_ANGLE = -78.5;
const DEFAULT_DEGREE = 22.5;
let currdeg = 0;

const chooseDirection = (val) => {
  const [positiveAngleToTurn, negativeAngleToTurn] = [
    hexToDec(val) * DEFAULT_DEGREE - currdeg,
    hexToDec(val) * DEFAULT_DEGREE - currdeg - 360,
  ];

  return positiveAngleToTurn < Math.abs(negativeAngleToTurn)
    ? INIT_ANGLE + hexToDec(val) * DEFAULT_DEGREE
    : INIT_ANGLE + hexToDec(val) * DEFAULT_DEGREE - 360;
};

const handleArrow = (val) => {
  const $arrow = _.$('.arrow--img');

  const angleToTurn = chooseDirection(val, currdeg);
  currdeg = angleToTurn;
  const transformDeg = `rotate(${angleToTurn}deg)`;
  $arrow.style.setProperty('transform', transformDeg);
};

export { handleArrow };
