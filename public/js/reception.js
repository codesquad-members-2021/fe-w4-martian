
import {factors, receptHex} from "./common.js";



// const {sendInp, sendBtn, sendTr, receptInp, receptBtn,arrow} = factors;

const rotateState = {
    currPoint:0,
    currDeg:22.5,
};

//화살표 회전
const signalToReception = (ele,i) =>{
    const {receptInp,sendInp,sendBtn,receptBtn}=factors;
    const hexArray = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"]

    const pointArrow = new Promise ((response,reject)=>{



        setTimeout(()=>{

            ele = ele.toUpperCase();
            const index = hexArray.indexOf(ele);

            const target = receptHex[ele];



            // console.log("index",index);
            // console.log("i",i,"******************************");
            // console.log("tar",target);
        
            LightOn(target);
    
            const interval = index-rotateState.currPoint;
            if(interval>=0){
                // rotateState.currDeg += 22.5* interval;
                turn("right",rotateState.currDeg,interval); 
            }
            if(interval<0){
                // rotateState.currDeg -= 22.5* interval;
                turn("left",rotateState.currDeg,interval);
            }
            // rotateState.currPoint = index;
            // console.log("여기서의ele",ele);

            response(ele);




        },2000 *(i+1));
    });
    


    pointArrow.then((letter) => {
        setTimeout(() => {
            receptInp.value += letter;
            LightOut(receptHex[letter]);

        }, 2000);
    })  
};



//화살표 회전각 찾기
const turn =(direction,currDeg,interval)=>{
    const { arrow } = factors;

    arrow.style.transition = `300ms`;
    if (direction==="right"){
        // console.log("라이트 turn 들어옴, direction:",direction,"currDeg",currDeg,"interval",interval);
        // console.log("돌아야 할 각도:", currDeg + interval*22.5)

        arrow.style.transform = `rotate(${currDeg + interval * 22.5}deg)`;
        currDeg += interval * 22.5;
    }
    if (direction==="left"){

        // console.log("레프트 turn 들어옴, direction:",direction,"currDeg",currDeg,"interval",interval);
        // console.log("돌아야 할 각도:", currDeg - interval*22.5)
        arrow.style.transform = `rotate(${currDeg - interval * 22.5}deg)`;
        currDeg -=  interval* 22.5;
    }
    return currDeg;

};

//글자 깜빡임
const LightOn = (target)=>{
    target.classList.add('light');
}

const LightOut = (target)=>{
    target.classList.remove('light');
}


export {signalToReception,LightOn,LightOut,turn};

