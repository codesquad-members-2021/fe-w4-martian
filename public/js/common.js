const $ = document.querySelector.bind(document);

const factors = {
    arrow : $("#arrow"),
    receptInp : $(".recept__inp"),
    receptBtn : $(".recept__btn"),
    receptTr : $(".recept__trans"),


    sendInp : $(".send__inp"),
    sendBtn : $(".send__btn"),
    sendTr : $(".send__trans"),

}

const receptHex ={
    '0' : $('.receptHex_0'),
    '1' : $('.receptHex_1'),
    '2' : $('.receptHex_2'),
    '3' : $('.receptHex_3'),
    '4' : $('.receptHex_4'),
    '5' : $('.receptHex_5'),
    '6' : $('.receptHex_6'),
    '7' : $('.receptHex_7'),
    '8' : $('.receptHex_8'),
    '9' : $('.receptHex_9'),
    'A' : $('.receptHex_A'),
    'B' : $('.receptHex_B'),
    'C' : $('.receptHex_C'),
    'D' : $('.receptHex_D'),
    'E' : $('.receptHex_E'),
    'F' : $('.receptHex_F')
}



export {factors, receptHex};
