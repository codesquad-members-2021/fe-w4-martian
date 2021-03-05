import { _ } from './util.js'


export function drawWheel({ canvas, xLocation, yLocation, largerCircleRadius, smallerCircleRadius }) {
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = 'lightcoral';
    let lastLocation = 0;
    for (let i = 1; i <= 16; i++) {
        ctx.lineTo(xLocation, yLocation);
        ctx.arc(xLocation, yLocation, largerCircleRadius, lastLocation, lastLocation + (2 * Math.PI * i / 16));
    }
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = 'white'
    ctx.arc(xLocation, yLocation, smallerCircleRadius, 0, 2 * Math.PI)
    ctx.fill()
    ctx.stroke()
    ctx.closePath()
}