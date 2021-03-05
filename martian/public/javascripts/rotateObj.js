const rotateObject = (event, target, angle) => {
    let newAngle = angle;
    target.addEventListener(`${event}`, () => {
        newAngle += 0.0625;
        if(newAngle > 1) newAngle = newAngle - 1;
        console.log(newAngle);
        target.style.transform = `rotate(${newAngle}turn)`;
    });
}


export {rotateObject};


