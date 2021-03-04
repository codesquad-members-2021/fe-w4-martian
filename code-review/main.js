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