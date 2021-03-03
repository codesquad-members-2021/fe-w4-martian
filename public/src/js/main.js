import { rotateArrow } from './arrow.js';
import { renderPlate } from './canvas.js';
import { HexArrToString, stringToHexArr } from './util/calculate.js';
import { go, _ } from './util/util.js';
const { log } = console;

const hexCode = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

//한각도 22.5도 즉
renderPlate();

const word = 'hello';
const arr = ['68', '65', '6C', '6C', '6F'];
const parsedWord = stringToHexArr(word);

let beforeCode = 0;
