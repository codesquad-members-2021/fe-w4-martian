// Promise & Timer ------------------------------------------------------------------------
const sendTimer = (resultText, anotherInput, charPos, timeout) =>
    new Promise((resolve, reject) => {
        const exTimer = () => {
            setTimeout(() => {
                try {
                    if (resultText === anotherInput.value) {
                        clearTimeout(this);
                        resolve('OK');
                    } else {
                        const nextChar = resultText[charPos];
                        if (!nextChar) throw new Error('Error');
                        
                        anotherInput.value += nextChar;
                        charPos++;
                        exTimer(resultText, anotherInput, charPos);          
                    }                    
                } catch(error) {
                    clearTimeout(this);                    
                    reject(error);
                }                    
            }, timeout);
        };
        exTimer();
    });

export { sendTimer };