const arcCreate = (x, y, radius, startAngle, endAngle) => ({x, y, radius, startAngle, endAngle});
const getHalfSize = (canvas) => {
    return {
        w: canvas.clientWidth / 2,
        h: canvas.clientHeight / 2,
    }
};

const circleDraw = (ctx, arc, color = '#FFF') => {
    const {x, y, radius, startAngle, endAngle} = arc;
    ctx.beginPath();    
    ctx.arc(x, y, radius, startAngle, endAngle);    
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();    
    ctx.closePath();
};

const piCreate = (ctx, arc, color = '#FFF') => {
    const {x, y, radius, startAngle, endAngle} = arc;
    ctx.beginPath();
    ctx.lineTo(x, y);
    ctx.arc(x, y, radius, startAngle, endAngle);    
    ctx.lineTo(x, y);    
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
};

const piAllCreate = (ctx, x, y, color = '#FFF') => {
    const onePer = (Math.PI * 2) / 16;
    let piStart = Math.PI * 1.5;
    let piEnd = piStart + onePer;

    for (let i = 0; i < 16; i++) {        
        const piArc = arcCreate(x, y, y-10, piStart, piEnd);
        piCreate(ctx, piArc, color);        

        piStart += onePer;
        piEnd += onePer;
    }
}

// ------------------------------------------------------------------

const createCanvas = (canvas) => {
    const ctx = canvas.getContext('2d');
    const {w: halfW, h: halfH} = getHalfSize(canvas);  

    // const bigCircleArc = arcCreate(halfW, halfH, halfH-10, 0, Math.PI * 2);
    // circleDraw(ctx, bigCircleArc, '#F67269');

    piAllCreate(ctx, halfW, halfH, '#F67269');
    const smallCircleArc = arcCreate(halfW, halfH, Math.floor(halfH / 5), 0, Math.PI * 2);
    circleDraw(ctx, smallCircleArc);
};


export default createCanvas;
