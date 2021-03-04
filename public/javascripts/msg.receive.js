import { pasteMsg, changeClass } from './play.js';
import {aschiMessageToHexa} from "./asci.js";
import { _ } from "./util.js";
import { charList } from "./communicator.js";

const receivedMsgArea = _.$('.hexa_result');
const translateArea = _.$('.translate_area');
const translateBtn = _.$('.translate_btn');
let receivedMsgArr = aschiMessageToHexa();
let storageIdx = [];
let degree;
let moveDirection;


function translateMsg(){
   return receivedMsgArr.reduce((acc,curr)=>{
      acc+=curr[0];
      return acc;
   },'')
}

function controllTranslateBtn(){
   if (receivedMsgArea.lastElementChild.innerText === "- 끝 -"){
      translateBtn.disabled = false;
      changeClass(translateBtn);
   };
   translateBtn.addEventListener("click", ()=> pasteMsg(translateMsg(), translateArea))
}

function comparsionValue(prevIdx, currIdx){
   
   let moveVal = (Math.abs(prevIdx-currIdx)>charList.length-Math.abs(prevIdx-currIdx))?charList.length-Math.abs(prevIdx-currIdx):Math.abs(prevIdx-currIdx)
   console.log(moveVal)
   if (moveVal===Math.abs(prevIdx-currIdx)){
      if(prevIdx-currIdx>0) moveDirection = -1;
      else moveDirection = 1;
   }else{
      (charList.length-Math.abs(prevIdx-currIdx)<0)? moveDirection = -1:moveDirection = 1;
   }
   return [moveVal, moveDirection]
}

function pointTargetChar(char){
   console.log(char)

   let moveVal;
   let moveDirection;
   let currIdx = charList.indexOf(char);
   if (storageIdx.length===0) {
      if(currIdx<=8){
      degree = 360/charList.length*[currIdx+1];
      // console.log(char,currIdx,degree)
      } else {
      degree = -360/charList.length*[charList.length-currIdx-1]
      }
   }
   else {
      let prevIdx = storageIdx.pop();
      [moveVal, moveDirection] = comparsionValue(prevIdx, currIdx)
      degree = 360/charList.length*[prevIdx+1] + 360/charList.length*moveVal*moveDirection; //화살표 표시해준 다음 다시 애니없이 리셋하기, 그리고 이전 값 지우기
      console.log(moveVal, moveDirection, degree)     
   }
   
   const arrow = _.$('#arrow');
   arrow.style.transform = `rotate(${degree}deg)`
   storageIdx.push(currIdx);
   return char;
}

const msgArrToStr = () =>receivedMsgArr.map(el=>el[1]).join().replaceAll(",","").split("");


function promise(val, ms){
   return new Promise(resolve=>setTimeout(() =>resolve(val), ms))
}

export function receiveMsg(){
   
   msgArrToStr().forEach((el, idx) => {
      return promise(el, 4000*(idx+1))
      .then((el)=>promise(pointTargetChar(el), 2000))
      .then((result)=>pasteMsg(result, receivedMsgArea))
      .then(()=>{
         if(idx===msgArrToStr().length-1) {
            setTimeout(()=>{
               pasteMsg("- 끝 -",receivedMsgArea)
               controllTranslateBtn();
            },2000);
            
         }
      })
})}
