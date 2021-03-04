import {factors} from "./common.js";
const rotateState = {
    currPoint:0,
    currDeg:22.5,
};
const signalToReception = (ele,i) =>{
    //일단 요소 다가져와 놓고 나중에 빼기 


    const hexArray = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"]
    new Promise ((res,rej)=>{
        setTimeout(()=>{
            console.log("a",a);
            a = a.toUpperCase();
            const index = hexArray.indexOf(a);
            console.log("index",index);
            const hexCode = document.querySelectorAll(".line__txt");

            //hexDic 생성{수신기 값: index}

            let hexDic={};
            hexCode.forEach((hex,i)=>{
                var a=hex.innerHTML;
                hexDic[a]=i;
            })
            console.log("hexDic",hexDic);


            console.log("i",i,"******************************");
            // console.log("ele",ele);
            ele = ele.toUpperCase();
            const index = hexArray.indexOf(ele);
            console.log("index",index);

            const target = hexDic[hexArray[index]];
            console.log("tar",target);

            LightOn(target,hexCode);


        },2000 *(i+1))
    }); 
};

const turn =()=>{
    const {arrow}=factors;

};

const LightOn = (target,hexCode)=>{
    var t = hexCode[target];
    t.classList.add('light');

}
export {signalToReception,LightOn};

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