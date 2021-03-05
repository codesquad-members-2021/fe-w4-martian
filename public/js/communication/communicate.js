import _ from '../util.js';
import { hexToDec } from '../convert.js';
import { blinkingPie } from '../canvasController.js';

const checkWhiteSpace = (str) => /\s/g.test(str);
const changeArrowLocation = (hexValue, arrowImage) => {
    const prevClassName = arrowImage.className;

    if (_.classContains(arrowImage, prevClassName))
        _.classRemove(arrowImage, prevClassName);

    _.classAdd(arrowImage, `transform__rotate__${hexToDec(hexValue)}`);
};

// Promise & Timer ------------------------------------------------------------------------

// 화살표 위치 변경 전, 송수신기(canvas) 전체 애니메이션 적용 (깜박이는 애니메이션)
const receivedData = (canvas, timeout) => {
    _.classAdd(canvas, 'blinking');
    return new Promise((resolve, reject) =>
        setTimeout(() => {
            _.classRemove(canvas, 'blinking');
            resolve('receivedData OK');
        }, timeout),
    );
};

// 화살표 위치 변경, 캔버스 색상 변경
const changeArrowAndPieColor = (infoFromPlanet, timeout) =>
    new Promise((resolve, reject) => {
        const { anotherCanvasInfo, anotherInput, resultText } = infoFromPlanet;
        let { charPos } = infoFromPlanet;
        const { arrowImage } = anotherCanvasInfo;

        const executeTimer = () => {
            setTimeout(() => {
                try {
                    if (resultText === anotherInput.value) {
                        arrowImage.className = '';
                        resolve('changeArrowAndPieColor OK');                        
                    } else {
                        let currChar = resultText[charPos];
                        if (!currChar)
                            throw new Error('Error - changeArrowAndPieColor');
                        anotherInput.value += currChar;
                        charPos++;

                        if (checkWhiteSpace(currChar)) {
                            currChar = resultText[charPos];
                            anotherInput.value += currChar;
                            charPos++;
                        }
                        blinkingPie(currChar, anotherCanvasInfo, timeout);
                        changeArrowLocation(currChar, arrowImage);
                        executeTimer();
                    }
                } catch (error) {
                    reject(error);
                }
            }, timeout);
        };
        executeTimer();
    });

// 다른 행성으로 메세지 전송 및 애니메이션
const sendMessageAnotherPlanet = (infoFromPlanet, timeout) => {
    const {
        anotherCanvasInfo: { canvas },
    } = infoFromPlanet;

    return new Promise((resolve, reject) => {
        receivedData(canvas, timeout).then(() =>
            changeArrowAndPieColor(infoFromPlanet, timeout).then(() =>
                resolve('OK'),
            ),
        );
    });
};

export { sendMessageAnotherPlanet };
