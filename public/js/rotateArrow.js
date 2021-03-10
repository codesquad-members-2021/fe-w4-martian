import { _, pipe } from './util.js';
import { $arrow } from './ref.js';

const hexCharToDec = hexChar => parseInt(hexChar, 16);

const getFastWay = prevDec => currDec => { // hexCharToDec의 리턴값 필요
  const diff = currDec - prevDec;
  const diffAbs = Math.abs(diff);
  if (diff === 0) return 'samePosition';
  if(diffAbs < 8) {
    if(diff > 0) return 'clockWise';
    if(diff < 0) return 'counterClockWise';
  }
  if(diffAbs > 8) {
    if(diff > 0) return 'counterClockWise';
    if(diff < 0) return 'clockWise';
  }
}

const getAngle = currDec => fastWay => { // hexCharToDec, getFastWay의 리턴값 필요
  const baseAngle = 11.25;
  const pieceAngle = 360 / 16;
  const currAngle = baseAngle + pieceAngle * currDec;
  if(fastWay === 'samePosition') return currAngle;
  return (fastWay === 'clockWise' ? currAngle : currAngle - 360);
}

const rotateArrow = (angle) => { // getAngle의 리턴값 필요
  $arrow.style.transform = `rotate(${angle}deg)`;
}

let prevDec = 0;
const renderArrow = hexChar => {
  const currDec = hexCharToDec(hexChar);
  pipe(
    hexCharToDec,
    getFastWay(prevDec), 
    getAngle(currDec), 
    rotateArrow
  )(hexChar)
  prevDec = currDec;
}

const blinkLight = () => {}
const displayHexOnBoard = () => {}
const disableBtn = (buttonName) => {}
const activateBtn = (buttonName) => {}

export { renderArrow }