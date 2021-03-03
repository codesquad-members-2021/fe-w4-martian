import _ from './util.js';

export const setCanvasAndColor = (canvas, color) => ({canvas, color});
export const createTransceiverParts = (transceiverReceiveWrap, transceiverSendWrap ) => {
    return {
        receiveContentInput: _.$(".received__text", transceiverReceiveWrap),
        translateBtn: _.$(".translate__btn", transceiverReceiveWrap),
        sendContentInput: _.$(".send__text", transceiverSendWrap),    
        sendBtn: _.$(".send__btn", transceiverSendWrap),
    }
};