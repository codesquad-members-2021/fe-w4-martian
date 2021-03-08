import {hex2a,a2Hex} from "./notation.js"
import {signalToReception,LightOn,turn} from "./reception.js";
import {factors, receptHex} from "./common.js";

//입력받은 발신정보 16진수로 변환 
const transmission = (factors) =>{

    const {sendInp, sendBtn, sendTr, receptInp, receptBtn,receptTr} = factors;

    //발신정보 입력을 배열/문자 형태로 두번 받는 안좋은 상황 ㅎㅎ
    let arr=[];
    let charr="";
    sendInp.addEventListener("keydown",(e)=>{

        var inpChar =e.key;
        var tranChar = a2Hex(inpChar);
        console.log("변환된 16진수:",tranChar);
        //backspace 입력 시 지우기
        if(tranChar==42){
            arr.pop();
        }
        else{
            arr.push(tranChar)
            charr+=tranChar;
        }
        console.log("input값 array",arr);
        sendTr.innerText = arr;
        // sendTr.innerText = charr;
    });
    
    //발신 정보 버튼 (지구로 보내기)
    sendBtn.addEventListener("click",()=>{
        response(charr,factors,charr)

    });

    //수신 정보 해석 버튼(해석하기)
    receptBtn.addEventListener("click",()=>{
        receptTr.innerText = hex2a(charr);
    });
}
// 수신기에 전달
//factors요소 일단 넣어놧는데 아직 의미없음
const response = (content, factors,charr) =>{
    const { receptBtn} = factors;
    var i=0;

    // while(content.length>0){

    //     content.shift().split("").forEach(
    //         (ele,i)=>{
    //         signalToReception(ele,i)
    //             .then((ele)=>{
    //             setTimeout(()=>{
    //                 console.log("⭐️ele프로미스:",ele);
    //                 receptInp.value+=ele;
    //             },500);
    //         })
    //         i++;
    //     })
    // }
    const now = new Promise((response,rej)=>{
        content.split("").forEach(
            (ele, i) => {

                signalToReception(ele, i)
                const sendlen = charr.length;
                response(sendlen);
    
            });

    });

    //버튼 클릭 가능 표현 (활성화 X)
    now.then((i)=>{
        setTimeout(()=>{
            receptBtn.style = `background-color:#ffe082`
        },2000*(i+1));
    });
    // now.then(()=>receptBtn.style = `background-color:red`);
}


export {transmission};