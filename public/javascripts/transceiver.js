const _ = {
    $: (selector) => document.querySelector(selector),
    $all: (selector) => document.querySelectorAll(selector),
    addClass: (node, className) => node.classList.add(className),
    removeClass: (node, className) => node.classList.remove(className),
    contains: (node, className) => node.classList.contains(className)
}

const SEND_E_M = _.$(".send_earth_mars");
const SEND_M_E = _.$(".send_mars_earth");
const HEX_PROMPT1 = _.$(".prompt1");
const STRING_PROMPT1 = _.$(".prompt2");
const HEX_PROMPT2 = _.$(".prompt3");
const STRING_PROMPT2 = _.$(".prompt4");

SEND_E_M.addEventListener("keyup", (e) => {
if(e.key === 'Enter') {
    let string = SEND_E_M.value.split("");
    let hex = '';
    for(const v of string) {
        hex += `${(v.charCodeAt(0)).toString(16).toUpperCase()} `;
    }
    console.log(hex)
    SEND_E_M.value = `${hex}`;
}});






// PROMPT.addEventListener("keyup", (e) => {
//     if(e.key === 'Enter') {
//         const array = [];
//         array.push(PROMPT.value.split(" "));
        
//     }
// })