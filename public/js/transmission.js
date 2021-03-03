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
//문자 -> 16진수 (한글자씩)
// text2Hex("i")
const a2Hex = (text)=>{
    //text->ASCII->16진수
    // console.log(text.charCodeAt(0));
    return text.charCodeAt(0).toString(16);
}



//16진수->문자(한번에 )
//hex2a("68656c6c6f")
const hex2a=(hex)=>{
   var str = '';
   for (var i = 0; (i <= hex.length); i += 2){
    //    console.log("hex.substr(i,2)",hex.substr(i,2));
       str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    //    console.log(i,"안의 str",str);
   }
// console.log(str);
return str;

}

 


//문자 ->16진수 한번에
// function base64ToHex(str) {
//     // var raw = window.atob(str);

//     let result = '';
//     for (let i = 0; i < str.length; i++) {
//       const hex = str.charCodeAt(i).toString(16);
//       result += (hex.length === 2 ? hex : '0' + hex);
//     }
//     console.log(result.toUpperCase());
//     return result.toUpperCase();
//   }
// base64ToHex("h");