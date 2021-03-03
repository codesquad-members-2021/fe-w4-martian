import {hex2a,a2Hex} from "./notation.js"
const transmission = (factors) =>{

    const {sendInp, sendBtn, sendTr, receptInp, receptBtn} = factors;


    let arr=[];
    console.log(sendInp);
    sendInp.addEventListener("keydown",(e)=>{
        console.log(e);
        // console.log(e.currentTarget);
        var x =e.key;
        var k = a2Hex(x);
        console.log(k);
        if(k==42){
            arr.pop();
        }
        else{
            arr.push(k)
        }
        console.log(arr);
        sendTr.innerText = arr;
    });
    

    sendBtn.addEventListener("click",()=>{
        return function() {
            return arr;
        }
    });
}


// var a=arr.shift()
// a.toString();
// console.log(a[0]);
// console.log(a[1]);

export {transmission};