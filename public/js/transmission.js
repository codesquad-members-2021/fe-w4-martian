import {hex2a,a2Hex} from "./notation.js"
import {signalToReception,LightOn,turn} from "./reception.js";

//입력받은 발신정보 16진수로 변환 
const transmission = (factors) =>{

    const {sendInp, sendBtn, sendTr, receptInp, receptBtn} = factors;


    let arr=[];
    sendInp.addEventListener("keydown",(e)=>{
        // console.log(e);
        // console.log(e.currentTarget);
        var inpChar =e.key;
        var tranChar = a2Hex(inpChar);
        console.log("변환된 16진수:",tranChar);
        //backspace 입력 시 지우기
        if(tranChar==42){
            arr.pop();
        }
        else{
            arr.push(tranChar)
        }
        console.log("input값 array",arr);
        sendTr.innerText = arr;
    });
    

    sendBtn.addEventListener("click",()=>{
        response(arr,factors)

    });
}
// 수신기에 전달
//factors요소 일단 넣어놧는데 아직 의미없음
const response = (content, factors) =>{
    const {sendInp, sendBtn, sendTr, receptInp, receptBtn} = factors;
    var i=0;
    while(content.length>0){

        content.shift().split("").forEach((ele)=>{
            signalToReception(ele,i)

            i++;
        })
    }
}


export {transmission};