import { draw } from "./canvas";
import { _ } from "./util";
import { str2ascArr, devideArr, devideText, printData, activateButton, printInterpretation, printSendMessage } from "./transceiver";

const init = () => {
    const str = "hello";
    const data = devideArr(str2ascArr(str));
    const delayTime = 100;
    const totalDelayTime = delayTime * (data.length - 1);

    draw();
    printData({
        target: _.$("#sendReceiveMessage"),
        data,
        delayTime
    });
    activateButton({
        button: _.$("#interpretButton"),
        totalDelayTime
    });
    _.$("#interpretButton").addEventListener("click", () => {
        printInterpretation({
            target: _.$("#interpretedText"),
            data: devideText(_.$("#sendReceiveMessage").innerHTML, 2)
        });
    })

    _.$("#sendMessage").addEventListener('keyup', () => {
        printSendMessage({
            sendMessage: _.$("#sendMessage").value,
            target: _.$("#interpretedSendMessage")
        })
    });
    _.$("#sendMessageButton").addEventListener('click', () => {
        _.$("#sendReceiveMessage").innerHTML = "";
        printData({
            target: _.$("#sendReceiveMessage"),
            data: _.$("#interpretedSendMessage").innerHTML,
            delayTime
        });
    })
};
init();