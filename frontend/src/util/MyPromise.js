// https://github.com/domenic/promises-unwrapping/blob/master/docs/states-and-fates.md

import {IS_PENDING, IS_FULFILLED, IS_REJECTED} from "./Enums.js"

class MyPromise {
  constructor(func){
      this.status = IS_PENDING; // 프로미스의 상태값 [[PromiseStatus]]
      this.state = undefined; // 저장할 상태값
      
      func(this.resolve.bind(this), this.reject.bind(this)); //바인드 걸어 this를 동일하게 처리
      return this;
  }

  then(onFulfilled, onRejected) {
    if (![IS_FULFILLED, IS_REJECTED].includes(this.status)) {
      console.error("You can not call then() because MyPromise is not fulfilled");
      return false;
    }
    const hasReturn = onFulfilled(this.state);
    
    if (hasReturn) {
      return new MyPromise((resolve) => {
        resolve(hasReturn);
      });
    } else {
      console.log("then 끝");
    }

  }
  
  resolve(value) {
    this.changeStatus(IS_FULFILLED);
    this.state = value;
    return this;
  }
  reject() {
    console.error("이 프로미스는 거절되었음.");
  }

  changeStatus(status) {
    if (![IS_PENDING, IS_FULFILLED, IS_REJECTED].includes(status)) {
      console.log("MyPromise changeStatus() has been errored")
      return false;
    }
    this.status = status;
    return true;
  }
}

export default MyPromise;