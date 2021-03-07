import { _ } from "./util";

const renderCanvas = () => {
    const canvas = _.$('.canvas');
    const canvasWidth = canvas.width;
    const radian = canvasWidth / 2 - 50;
    const smallRadian = (canvasWidth / 2 - 50) / 3;
    const xSmallRadian = (canvasWidth / 2 - 50) / 3 - 10;

    const commonSpec = {
        ctx: canvas.getContext('2d'),
        center: canvas.width / 2,
        startAngle: 0,
        endAngle: Math.PI * 2
    };

    createDOM();
    drawCircleBorder({ commonSpec }, radian, "#3d3d3d");
    drawFilledCircle({ commonSpec }, radian, '#f77269');
    drawCircleDevideLine({ commonSpec }, radian, 16);
    drawFilledCircle({ commonSpec }, smallRadian, '#fff');
    drawCircleBorder({ commonSpec }, xSmallRadian, "#3d3d3d");
    commonSpec.ctx.closePath();
};

const createDOM = () => {
    const innerText = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
    for (let i = 0; i <= 15; i++) {
        _.$(".canvas__contents").insertAdjacentHTML("beforeend",
            `<div class="hex" id="hex${i}">${innerText[i]}</div>`
        )
    }
};

const drawCircleBorder = ({ commonSpec }, radian, strokeStyle) => {
    commonSpec.ctx.beginPath();
    commonSpec.ctx.arc(commonSpec.center, commonSpec.center, radian, commonSpec.startAngle, commonSpec.endAngle);
    commonSpec.ctx.strokeStyle = strokeStyle;
    commonSpec.ctx.stroke();
}

const drawFilledCircle = ({ commonSpec }, radian, fillStyle) => {
    commonSpec.ctx.beginPath();
    commonSpec.ctx.arc(commonSpec.center, commonSpec.center, radian, commonSpec.startAngle, commonSpec.endAngle);
    commonSpec.ctx.fillStyle = fillStyle;
    commonSpec.ctx.fill();

}

const drawCircleDevideLine = ({ commonSpec }, radian, divNum) => {
    commonSpec.ctx.beginPath();
    let coordinates = {};
    for (let i = 0; i <= 360; i += 360 / divNum) {
        coordinates.x = Math.floor(radian * Math.cos(deg2rad(i)));
        coordinates.y = Math.floor(radian * Math.sin(deg2rad(i)));
        commonSpec.ctx.moveTo(commonSpec.center, commonSpec.center);
        commonSpec.ctx.lineTo(coordinates.x + commonSpec.center, coordinates.y + commonSpec.center)
        commonSpec.ctx.stroke();
    }
};

const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
}

export { renderCanvas }