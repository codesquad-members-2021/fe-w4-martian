import { _ } from './util.js';
import { $arrow } from './ref.js';

let prevDec = 0;
const splitStr = str => str.split('');
const hexCharToDec = hexChar => parseInt(hexChar, 16);

const getFastWay = (prevDec, currDec) => {
  const diff = currDec - prevDec;
  const diffAbs = Math.abs(diff);
  if (diff === 0) return 'samePosition';
  if(diffAbs < 8) {
    if(diff > 0) return 'counterClockWise';
    if(diff < 0) return 'clockWise';
  }
  if(diffAbs > 8) {
    if(diff > 0) return 'clockWise';
    if(diff < 0) return 'counterClockWise';
  }
}

const getDegree = decimal => { // 파라미터 어떻게 해야 할지 모르겠음
  const convertedDecNum = hexCharToDec(hexChar); // hexCharToDec의 리턴값 필요
  const baseAngle = 11.25;
  const pieceAngle = 360 / 16;
  const currAngle = baseAngle + pieceAngle * convertedDecNum;
  const fastWay = getFastWay(prevDec, currDec); // getFastWay의 리턴값 필요
  if(fastWay === 'samePosition') return currAngle;
  return (fastWay === 'clockWise' ? currAngle : 360 - currAngle);
}

const rotateArrow = (hexChar) => {
  // getDegree의 리턴값 필요
  const degree = getDegree();
  $arrow.style.transform = `rotate(${degree}deg)`;
}

const blinkLight = () => {}
const displayHexOnBoard = () => {}
const disableBtn = (buttonName) => {}
const activateBtn = (buttonName) => {}

export { rotateArrow, getFastWay }