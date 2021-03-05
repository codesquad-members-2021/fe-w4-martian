class MyPromise {
    constructor(cbFunc) {
        // pending(대기) fulfilled(성공), rejected(실패), settled(결론은 남)
        this.status = 'pending';
        this.cbList = [];

        cbFunc(this.resolve, this.reject);
    }
    then(func) {
        this.cbList.push(func);
        return this;
    }
    catch(error) {}
    /*
    resolve(result) {
        this.status = 'fulfilled';
    }
    reject(error) {
        this.status = 'rejected';
    }
    */
}

//MyPromise 를 사용하기
const p = new MyPromise((resolve, reject) => {    
    setTimeout(() => resolve('completed'), 1000);
});

/* 
    1. 일단 Promise를 생성할 때 매개변수로 들어간 콜백함수가 바로 실행되는 듯.
        (상태는 pending)
    2. then이 호출되면 1. 의 콜백함수 안의 resolve에 들어간 인자 값이 then의 콜백으로 오는 거 같음
    3. catch도 마찬가지일까? reject..
*/





console.log(p)

p.then((res) => console.log(res));
