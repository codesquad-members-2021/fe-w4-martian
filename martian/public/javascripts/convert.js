const getHexFromMsg = (msg) => {

    const engArray = Array.from(msg);
    const decArray = engArray.map((el) => el.charCodeAt(0));
    const hexArray = decArray.map((el) => el.toString(16))
    const hexStr = hexArray.join("");

    return hexStr;
}

const getEngFromHex = (hex) => {
    const hexArray = hex.split(" ");
    const decArray = hexArray.map((el) => parseInt(el, 16));
    const engArray = decArray.map((el) => String.fromCharCode(el));

    return engArray.join("");
}


const getIdxFromChar = (char) => {
    let idx;

    switch (char) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            idx = Number(char);
            break;

        case "a":
            idx = 10;
            break;
        case "b":
            idx = 11;
            break;
        case "c":
            idx = 12;
            break;
        case "d":
            idx = 13;
            break;
        case "e":
            idx = 14;
            break;
        case "f":
            idx = 15;
            break;

        default:
            console.error(`입력된 문자열 ${char} 는 16진수로 변환할 수 없습니다.`);
            break;
    }

    return idx;
}

export { getHexFromMsg, getEngFromHex, getIdxFromChar };