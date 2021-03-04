const factors = {
    arrow: document.querySelector(".arrow"),
    receptInp : document.querySelector(".recept__inp"),
    receptBtn : document.querySelector(".recept__btn"),

    sendInp : document.querySelector(".send__inp"),
    sendBtn : document.querySelector(".send__btn"),
    sendTr : document.querySelector(".send__trans"),

}

const txt ={
    '0' : document.querySelector('.txt_0'),
    '1' : document.querySelector('.txt_1'),
    '2' : document.querySelector('.txt_2'),
    '3' : document.querySelector('.txt_3'),
    '4' : document.querySelector('.txt_4'),
    '5' : document.querySelector('.txt_5'),
    '6' : document.querySelector('.txt_6'),
    '7' : document.querySelector('.txt_7'),
    '8' : document.querySelector('.txt_8'),
    '9' : document.querySelector('.txt_9'),
    'a' : document.querySelector('.txt_A'),
    'b' : document.querySelector('.txt_B'),
    'c' : document.querySelector('.txt_C'),
    'd' : document.querySelector('.txt_D'),
    'e' : document.querySelector('.txt_E'),
    'f' : document.querySelector('.txt_F')
}

console.log("txt는머",txt);

export {factors, txt};