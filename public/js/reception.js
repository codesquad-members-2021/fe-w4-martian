import {factors, txt} from "./common.js";
// const {sendInp, sendBtn, sendTr, receptInp, receptBtn,arrow} = factors;

const rotateState = {
    currPoint:0,
    currDeg:22.5,
};




const signalToReception = (ele,i) =>{
    //일단 요소 다가져와 놓고 나중에 빼기 
    const hexArray = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"]
    new Promise ((res,rej)=>{
        setTimeout(()=>{
    

            console.log("i",i,"******************************");
            // console.log("ele",ele);
            ele = ele.toUpperCase();
            const index = hexArray.indexOf(ele);
            console.log("index",index);
            const target = txt[ele];
            console.log("tar",target);
            LightOn(target);

            const interval = index-rotateState.currPoint;
            if(interval>=0){
                // rotateState.currDeg += 22.5* interval;
                console.log("오른쪽으로 돌라고 지시, interval:",interval)
                turn("right",rotateState.currDeg,interval);   
            }
            if(interval<0){
                // rotateState.currDeg -= 22.5* interval;
                console.log("왼쪽으로 돌라고 지시, interval:",interval)
                turn("left",rotateState.currDeg,interval);
            }
            rotateState.cuffPoint = index;

        },2000 *(i+1))
    }); 
};

const turn =(direction,currDeg,interval)=>{
    const { arrow } = factors;

    arrow.style.transition = `300ms`;
    if (direction==="right"){
        console.log("라이트 turn 들어옴, direction:",direction,"currDeg",currDeg,"interval",interval);
        console.log("돌아야 할 각도:", currDeg + interval*22.5)
        arrow.style.transform = `rotate(${currDeg + interval * 22.5}deg)`;
        currDeg += interval * 22.5;
    }
    if (direction==="left"){
        console.log("레프트 turn 들어옴, direction:",direction,"currDeg",currDeg,"interval",interval);
        console.log("돌아야 할 각도:", currDeg - interval*22.5)
        arrow.style.transform = `rotate(${currDeg - interval * 22.5}deg)`;
        currDeg -=  interval* 22.5;
    }
    return currDeg;

};

const LightOn = (target)=>{
    target.classList.add('light');

}
export {signalToReception,LightOn,turn};

// const rotateArrow = (a,b,i) =>{
//     //일단 요소 다가져와 놓고 나중에 빼기 
//     const {sendInp, sendBtn, sendTr, receptInp, receptBtn} = factors;
//     const hexArray = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"]
//     const hexCode = document.querySelectorAll(".line__txt");
//     // console.log(line);
//     // console.log(line[0]);
//     var x = hexCode[12].innerText
//     console.log("x",x);
//     console.log(hexArray.indexOf(x));
//     var a = hexArray.indexOf(x);

//     sendBtn.addEventListener("click",(e)=>{
//         arrow.style.transform = "rotate(" + (a+1) * 22.5 + "deg)";

//     })
// }