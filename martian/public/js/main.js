import { _ } from './util.js'
import { drawWheel } from './wheel.js'
import {parse, send} from './Communicator.js'

const wheelData = {
    canvas: _.$('.wheel__circle'),
    xLocation: 200,
    yLocation: 200,
    largerCircleRadius: 180,
    smallerCircleRadius: 50
}
drawWheel(wheelData)

const selectors = {
    resultInput: _.$('.result--input'),
    resultButton: _.$('.result--button'),
    senderInput: _.$('.sender--input'),
    senderButton: _.$('.sender--button'),
    letters: _.$A('.letter'),
    arrow: _.$('.wheel__arrow')
}

selectors.senderButton.addEventListener('click', () => send(selectors))
selectors.resultButton.addEventListener('click', () => parse(selectors))