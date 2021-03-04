import { _ } from './util.js'
import { drawWheel } from './wheel.js'

const wheelData = {
    canvas: _.$('.wheel__circle'),
    xLocation: 200,
    yLocation: 200,
    largerCircleRadius: 180,
    smallerCircleRadius: 50
}
drawWheel(wheelData)


const selector = {
    receiverInput : _.$('.receiver--input'),
    receiverButton : _.$('.receiver--button'),
    resultInput : _.$('.result--input'),
    resultButton : _.$('.result--button'),
    senderInput : _.$('.sender--button'),
    senderButton : _.$('.sender--button'),
    letters : _.$A('.letter')
}