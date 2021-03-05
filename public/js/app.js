import { draw } from "./canvas";
import { $ } from "./selectors"
import { str2ascArr, asc2hex, devideArr, devideText, printData, activateButton, printInterpretation, printSendMessage, printToEarthMessage } from "./transceiver";

const init = () => {
    const str = "hello";
    const data = devideArr(str2ascArr(str));
    const delayTime = 100;
    const totalDelayTime = delayTime * (data.length - 1);
    const input = $.sendMessage;
    draw();
    printData({
        target: $.sendReceiveMessage,
        data,
        delayTime
    });
    activateButton({
        button: $.interpretButton,
        totalDelayTime
    });
    printInterpretation({
        target: $.interpretedText,
        button: $.interpretButton,
        data: asc2hex(str2ascArr(str))
    });
    input.addEventListener('keyup', () => {
        printSendMessage({
            input,
            sendMessage: $.sendMessage.value,
            target: $.interpretedSendMessage
        })
    });
    printToEarthMessage();
};
init();