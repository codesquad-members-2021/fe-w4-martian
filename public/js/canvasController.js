import { hexToDec } from "./convert.js";

const getHalfSize = (canvas) => {
    return {
        w: canvas.clientWidth / 2,
        h: canvas.clientHeight / 2,
    };
};
const createArc = (x, y, radius, startAngle, endAngle) => ({ x, y, radius, startAngle, endAngle });
const createHexItems = () => [...Array.from({length: 10}, (_, i) => i), 'A', 'B', 'C', 'D', 'E', 'F'];
const createPieAngles = (length = 16) => {
    const onePer = (Math.PI * 2) / length;
    let startAngle = Math.PI * 1.5;
    let endAngle = startAngle + onePer;
    return Array.from({ length }, (_) => {
        const result = { startAngle, endAngle };
        startAngle += onePer;
        endAngle += onePer;
        return result;
    });
};

const drawCircle = (ctx, arc, color = '#FFF') => {
    const { x, y, radius, startAngle, endAngle } = arc;
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
};

const drawSmallCircle = (ctx, x, y) => {
    const smallCircleArc = createArc(x, y, Math.floor(x / 6), 0, Math.PI * 2);
    drawCircle(ctx, smallCircleArc);
}

const drawPie = (ctx, arc, color = '#FFF', strokeColor = '#FFF') => {
    const { x, y, radius, startAngle, endAngle } = arc;
    ctx.beginPath();
    ctx.lineTo(x, y);
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.lineTo(x, y);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.stroke();    
    ctx.closePath();
};

const drawAllPie = (ctx, x, y, color = '#FFF') => {
    const arrAngles = createPieAngles();
    arrAngles.forEach(({startAngle, endAngle}) => {
        const piArc = createArc(x, y, y - 10, startAngle, endAngle);
        drawPie(ctx, piArc, color);
    });
};

const drawPieText = (ctx, textDrawValues, color = '#FFF') => {
    let {x, y} = textDrawValues;
    const {xCorrect, yCorrect, distanceFromCenter} = textDrawValues

    const arrHexItems = createHexItems();

    const onePer = Number((2 / arrHexItems.length).toFixed(3));
    let decimal = 1.56;

    ctx.beginPath();
    ctx.font = '24px NanumGothic';
    ctx.fillStyle = color;

    x -= xCorrect;
    y += yCorrect
    arrHexItems.forEach((value) => {
        const xTmp = Math.floor(x + Math.cos(Math.PI * decimal) * (x * distanceFromCenter));
        const yTmp = Math.floor(y + Math.sin(Math.PI * decimal) * (y * distanceFromCenter));
        ctx.fillText(value, xTmp, yTmp);
        decimal += onePer;
    });
    ctx.closePath();
};

// ------------------------------------------------------------------

// 캔버스 생성
const createCanvas = ({canvas, color = "#000"}) => {
    const { w: x, h: y } = getHalfSize(canvas);
    const ctx = canvas.getContext('2d');

    drawAllPie(ctx, x, y, color);
    drawSmallCircle(ctx, x, y);

    const textDrawValues = {x, y, xCorrect: 5, yCorrect: 8, distanceFromCenter: 0.8};
    drawPieText(ctx, textDrawValues);
};

// 받은 16진수 1글자마다 해당하는 부분 색상 변경 + setTimeout
    // 여기선 메세지를 받은 다른 행성의 canvas를 알아야하기에 canvasInfo는 받는 행성의 canvas 정보를 불러옴
const blinkingPie = (value, canvasInfo, colorRecoverTimeout) => {    
    const {canvas, color} = canvasInfo;
    const { w: x, h: y } = getHalfSize(canvas);
    const ctx = canvas.getContext('2d');    
    const decValue = hexToDec(value);    
    const {startAngle, endAngle} = createPieAngles()[decValue];        
    const piArc = createArc(x, y, y - 10, startAngle, endAngle); 
    
    const redrawPie = (color = "#2b46bb") => {
        drawPie(ctx, piArc, color);
        drawSmallCircle(ctx, x, y);
        const textDrawValues = {x, y, xCorrect: 5, yCorrect: 8, distanceFromCenter: 0.8};
        drawPieText(ctx, textDrawValues);
    }

    setTimeout(() => {
        redrawPie();
        setTimeout(() => redrawPie(color), colorRecoverTimeout);
    }, 0);    
};


export {blinkingPie, createCanvas};
