const changeInnerHtml = (dom, before, after) => {
    dom.innerHTML = (dom.innerHTML === before) ? after : before; 
    return dom.innerHTML;
}


const toggleMode = (event, trigger, target, buttonList) => {
    trigger.addEventListener(`${event}`, function() {
        changeInnerHtml(target, "수신모드", "발신모드");
        disableButton(target, buttonList);
        initAll();
    });
}

const disableButton = (target, buttonList) => {
    if(target.innerHTML === "수신모드") {
        buttonList.forEach((el) => el.disabled = true);
    } else {
        buttonList.forEach((el) => {
            if(el.className === "hex_info_submit") el.disabled = true;
            else el.disabled = false;
        });
    }
}

const initAll = () => {
    document.querySelector(".material-icons").style.transform = `rotate(0.03turn)`;
    document.querySelector(".str_info_input").value = " ";
    document.querySelector(".hex_info_input").value = " ";
}

export {toggleMode};

