import _ from "../util.js";
import { hexToDec } from "../convert.js";
import { blinkingPie } from "../canvasController.js";

const checkWhiteSpace = (str) => (/\s/g).test(str);
const changeArrowLocation = (hexValue, arrowImage) => {   
    const prevClassName = arrowImage.className; 
    
    if (_.classContains(arrowImage, prevClassName))        
        _.classRemove(arrowImage, prevClassName);    
    
    _.classAdd(arrowImage, `transform__rotate-${hexToDec(hexValue)}`);
};

// [communicate] Promise & Timer ------------------------------------------------------------------------
const sendMessageAnotherPlanet = (infoFromPlanet, timeout, blinkTimeout = timeout) => {
    const {anotherCanvasInfo, anotherInput, resultText} = infoFromPlanet;
    const {arrowImage} = anotherCanvasInfo;
    let { charPos } = infoFromPlanet;
        
    return new Promise((resolve, reject) => {
        const executeTimer = () => {
            setTimeout(() => {
                try {
                    if (resultText === anotherInput.value) {                        
                        resolve("OK");
                    } else {
                        let currChar = resultText[charPos];
                        if (!currChar) throw new Error('Error - sendMessageAnotherPlanet');
                        anotherInput.value += currChar;
                        charPos++;

                        if (checkWhiteSpace(currChar)) {
                            currChar = resultText[charPos];
                            anotherInput.value += currChar;
                            charPos++;
                        }
                        blinkingPie(currChar, anotherCanvasInfo, blinkTimeout);
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
};

export { sendMessageAnotherPlanet };