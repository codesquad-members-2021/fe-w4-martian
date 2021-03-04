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
const SEND_BUTTON1 = _.$(".send_button1");
const SEND_BUTTON2 = _.$(".send_button2");
const CHART = _.$(".chart");
const TRANSLATE_BUTTON = _.$all(".button");
const BLINK_LIST = _.$all(".blink_list");
const ALLOW = _.$(".allow");
const angle = 360/16;

// 문자열을 10진수로 바꾸는 함수
const DEC_FN = (string) => {
    return string.charCodeAt(0);
}

// 10진수를 16진수로 바꾸는 함수
const HEX_FN = (decimalnumber) => {
    return decimalnumber.toString(16).toUpperCase();
}

let result = null;

// 지구 => 화성
SEND_E_M.addEventListener("keyup", (e) => {
    if(e.key === 'Enter') {
        let string = SEND_E_M.value.split("");
        let hex = '';
        for(const v of string) {
            hex += `${HEX_FN(DEC_FN(v))} `;
        }
        result = hex;
        SEND_BUTTON1.classList.remove("send_button_off")
        // SEND_E_M.value = `${hex}`;
    }
});

// 화성 => 지구
SEND_M_E.addEventListener("keyup", (e) => {
    if(e.key === 'Enter') {
        let string = SEND_M_E.value.split("");
        let hex = '';
        for(const v of string) {
            hex += `${HEX_FN(DEC_FN(v))} `;
        }
        result = hex;
        // SEND_M_E.value = `${hex}`;
    }
});

// 생성된 전송하기 클릭
SEND_BUTTON1.addEventListener("click", () => {
    SEND_E_M.value = null;
    SEND_BUTTON1.classList.add("send_button_off");
    CHART.classList.add("blink");
    setTimeout(() => {
        CHART.classList.remove("blink");
    },2400);
});

// 16진수의 공백을 없애고 숫자하나하나 배열에 닮는 함수
const arr = (hex) => {
    let hex_arr = hex.trim("").split(" ");
    let str = '';
    for(let i of hex_arr) {
        str += i;
    }
    return str.split("");
}

// 받은 값 하나하나 표시하기 && 화성 첫번째 해석하기 버튼
TRANSLATE_BUTTON[0].addEventListener("click", () => {
    const target = arr(result);
    let counter = 0;
    console.log(target);
    // 1. 화살표가 그 숫자를 가르키기
    // 2. 그 숫자가 깜빡이기
    // 3. 깜빡임이 끝나고 숫자가 입력되게하기.
    setInterval(() => {
        if(parseInt((target[counter]/1),16) < 10) {
            allow_blink(target[counter]);
            blink_list(target[counter]);
            if(counter !== target.length) counter++;
        } else if(parseInt(target[counter],16) >= 10) {
            allow_blink(parseInt((target[counter]),16));
            blink_list(parseInt((target[counter]),16));
            if(counter !== target.length) counter++;
        }
    },2500)

    
    
})

const allow_blink = (target) => {
    ALLOW.style.transition = `transform .5s ease-in-out`;
    ALLOW.style.transform =`rotate(${3 + parseInt(target)*angle}deg)`
}

const blink_list = (target) => {
    
    BLINK_LIST[target].classList.add("blink");
    setTimeout(() => {
        BLINK_LIST[target].classList.remove("blink");
        if(target<10) {
            HEX_PROMPT1.value += target;
        } else {
            HEX_PROMPT1.value += HEX_FN(target);
        }
    }, 2000);;
}