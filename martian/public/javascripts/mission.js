const drawCircle = () => {

    let canvas = document.querySelector(".big_circle");
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');
        
        // 큰 원
        ctx.beginPath();
        ctx.arc(300, 300, 200, 0, Math.PI * 2);
        ctx.stroke();
        
        
        // 0-180도 직선
        ctx.beginPath();
        ctx.moveTo(300, 100);
        ctx.lineTo(300, 500);
        ctx.closePath();
        ctx.stroke();
        
        // 22.5-202.5도 직선
        ctx.beginPath();
        ctx.moveTo(380, 120);
        ctx.lineTo(220, 480);
        ctx.closePath();
        ctx.stroke();
        
        // 45-225도 직선
        ctx.beginPath();
        ctx.moveTo(440, 160);
        ctx.lineTo(160, 440);
        ctx.closePath();
        ctx.stroke();
        
        // 67.5-247.5도 직선
        ctx.beginPath();
        ctx.moveTo(480, 220);
        ctx.lineTo(120, 380);
        ctx.closePath();
        ctx.stroke();
        
        
        // 135-315도 직선
        ctx.beginPath();
        ctx.moveTo(160, 160);
        ctx.lineTo(440, 440);
        ctx.closePath();
        ctx.stroke();
        
        
        // 90-270도 직선
        ctx.beginPath();
        ctx.moveTo(100, 300);
        ctx.lineTo(500, 300);
        ctx.closePath();
        ctx.stroke();
        
        // 115.5-295.5도 직선
        ctx.beginPath();
        ctx.moveTo(120, 220);
        ctx.lineTo(480, 380);
        ctx.closePath();
        ctx.stroke();
        
        // 157.5-337.5도 직선
        ctx.beginPath();
        ctx.moveTo(220, 120);
        ctx.lineTo(380, 480);
        ctx.closePath();
        ctx.stroke();
        
        
        // 작은 원
        ctx.beginPath();
        ctx.arc(300, 300, 50, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.stroke();
    }
}

const renderNumbers = () => {
    const div = document.createElement("div");
    div.classList.add("num_wrapper");
    const spanList = [];
    const HEXA = 16;

    for(let i = 0; i < HEXA; i++) {
        spanList.push(document.createElement("span"));
        
    }

    spanList.forEach((el,idx) => {
        el.innerHTML = idx.toString(16);
        el.classList.add(`num_${idx.toString(16)}`);
        div.appendChild(el);
    });

    document.body.appendChild(div);

}

renderNumbers();
drawCircle();
    
    
    