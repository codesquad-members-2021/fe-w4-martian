import { _ } from "./util";

export const moveArrow = () => {
    //blink class remove
    classRemove(_.$All(".hex"), "blink")
    //변수 할당
    const targetInnerHTML = _.$("#sendReceiveMessage").innerHTML;
    const msgArr = targetInnerHTML.split("");
    const arrow = _.$("#arrow");
    const hexIdxArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    const defaultAngle = 360 / hexIdxArr.length;
    const toTextAngle = 360 / hexIdxArr.length / 2;
    const currIdx = hexIdxArr.indexOf(msgArr[msgArr.length - 1]);
    const prevIdx = hexIdxArr.indexOf(msgArr[msgArr.length - 2]);

    //가까운 각도 찾기
    let rotateAngle = defaultAngle * currIdx + toTextAngle;
    Math.abs(prevIdx - currIdx) > 8 ? -rotateAngle : rotateAngle;
    //각도로 움직이기
    arrow.style.transform = `rotate(${rotateAngle}deg)`;

    arrowEventHandler(arrow, currIdx, "transitionend")
}

const classRemove = (el, className) => { el.forEach((v) => v.classList.remove(className)) }

const arrowEventHandler = (el, id, event) => {
    el.addEventListener(event, () => {
        const el = _.$(`#hex${id}`);
        el.classList.add("blink")
    }, { once: true })
}