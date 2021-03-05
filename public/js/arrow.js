import { _ } from "./util";
const targetInnerHTML = document.querySelector("#sendReceiveMessage").innerHTML;

function arrow(cnt) {
    const arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    const defaultAngle = 360 / arr.length;
    const toTextAngle = 360 / arr.length / 2;
    const test = "16f5a06c6f";
    const msgArr = test.split("");

    const currIdx = arr.indexOf(msgArr[cnt]);
    const prevIdx = arr.indexOf(msgArr[cnt - 1]);
    console.log("[currIdx]", currIdx, "[prevIdx]", prevIdx)

    let rotateAngle = defaultAngle * currIdx + toTextAngle;
    Math.abs(prevIdx - currIdx) > 8 ?
        -rotateAngle : rotateAngle;

    document.querySelector("#arrow").style.transform =
        `rotate(${rotateAngle}deg)`;
}