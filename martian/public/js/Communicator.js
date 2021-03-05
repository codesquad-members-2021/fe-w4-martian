import { _ } from './util.js'
import MyPromise from './Promise.js'

const selectors = {
    receiverInput: _.$('.receiver--input'),
    receiverButton: _.$('.receiver--button'),
    resultInput: _.$('.result--input'),
    resultButton: _.$('.result--button'),
    senderInput: _.$('.sender--input'),
    senderButton: _.$('.sender--button'),
    letters: _.$A('.letter'),
    arrow: _.$('.wheel__arrow')
}

const convertToHex = (input) => input.charCodeAt().toString(16).toUpperCase()
const convertToStr = (input) => String.fromCharCode(parseInt(input, 16))

const send = ({ senderInput, resultInput }) => {
    resultInput.value = ''
    let foo = new MyPromise((resolve, reject) => resolve())
    senderInput.value.split('').forEach((v) => {
        foo.then(() => new MyPromise((resolve, reject) => {
            setTimeout(() => {
                resolve()
                let text = convertToHex(v)
                resultInput.value += text + ' '
                moveArrow(selectors, text[0])
                makeBlink(selectors, text[0])
                setTimeout(() => {
                    moveArrow(selectors, text[1])
                    makeBlink(selectors, text[1])
                }, 2000)
            }, 5000)
        }))
    })
}
const makeBlink = ({ letters }, target) => {
    letters.forEach((e) => {
        if (e.innerHTML === target) {
            e.classList.add('blinking')
            setTimeout(() => {
                e.classList.remove('blinking')
            }, 2000)
        }
    })
}
const receive = () => {
    const text = selectors.receiverInput.value;

}
const moveArrow = ({ arrow }, letter) => {
    const degree = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
    arrow.style.transform = `rotate(${degree.indexOf(letter) * 360 / 16 - 80}deg)`
    arrow.style.transition = '300ms'
}
selectors.senderButton.addEventListener('click', () => send(selectors))