const dom = {
    hexInfo: {
        input : document.querySelector(".hex_info_input"),
        button : document.querySelector(".hex_info_submit")
    },
    
    strInfo: {
        input : document.querySelector(".str_info_input"),
        button : document.querySelector(".str_info_submit"),
        str : document.querySelector(".str_from_hex")
    },
    
    modeInfo: {
        str : document.querySelector(".current_mode"),
        button : document.querySelector(".toggle_mode")
    },
    
    arrow: document.querySelector(".material-icons")
}

export {dom};