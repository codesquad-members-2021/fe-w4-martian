import {factors} from "./common.js";
const rotateArrow = (factors) =>{
    //일단 요소 다가져와 놓고 나중에 빼기 
    const {sendInp, sendBtn, sendTr, receptInp, receptBtn} = factors;
    const angle = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"]
    const line = document.querySelectorAll(".line__txt");
    // console.log(line);
    // console.log(line[0]);
    var x = line[12].innerText
    console.log("x",x);
    console.log(angle.indexOf(x));
    var a = angle.indexOf(x);

    sendBtn.addEventListener("click",(e)=>{
        arrow.style.transform = "rotate(" + (a+1) * 22.5 + "deg)";

    })
}

export {rotateArrow};