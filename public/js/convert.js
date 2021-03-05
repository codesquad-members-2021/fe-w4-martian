// 10진수 -> 16진수, 16진수 -> 10진수
const decToHex = (dec) => Number(dec).toString(16);
const hexToDec = (hex) => parseInt(hex, 16);

// 문자1개 -> 16진수, 16진수 -> 문자1개 
const charToHex = (char) => decToHex(char.charCodeAt(0));
const hexToChar = (hex) => String.fromCharCode(hexToDec(hex));


export {decToHex, hexToDec, charToHex, hexToChar};