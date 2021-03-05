import { _ } from './util.js'
import MyPromise from './Promise.js'

const convertToHex = (input) => input.charCodeAt().toString(16).toUpperCase()
const convertToStr = (input) => String.fromCharCode(parseInt(input, 16))

const send = ({ senderInput, resultInput, arrow, letters }) => {
    resultInput.value = ''
    let foo = new MyPromise((resolve, reject) => resolve())
    senderInput.value.split('').forEach((v) => {
        let text = convertToHex(v)
        foo.then(() => render({ arrow, letters }, text, resultInput))
    })
}

const parse = ({ senderInput, resultInput }) => {
    senderInput.value = ''
    resultInput.value.split(' ').forEach((v) => senderInput.value += convertToStr(v));
}

const render = ({ arrow, letters }, text, target) => new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve()
        target.value += text[0]
        moveArrow(arrow, text[0])
        makeBlink(letters, text[0])
        setTimeout(() => {
            if (text[1]) target.value += text[1] + ' '
            moveArrow(arrow, text[1])
            makeBlink(letters, text[1])
        }, 2000)
    }, 5000)
})

const makeBlink = (letters, target) => {
    letters.forEach((e) => {
        if (e.innerHTML === target) {
            e.classList.add('blinking')
            setTimeout(() => {
                e.classList.remove('blinking')
            }, 2000)
        }
    })
}

const moveArrow = (arrow, letter) => {
    const degree = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
    arrow.style.transform = `rotate(${degree.indexOf(letter) * 360 / 16 - 80}deg)`
    arrow.style.transition = '300ms'
}

export { send, parse }