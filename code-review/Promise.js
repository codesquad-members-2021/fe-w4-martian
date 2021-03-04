export default class MyPromise {
    constructor(callback) {
        callback(this.resolve.bind(this), this.reject.bind(this));
        this.queue = [];
    }
    resolve(input) {
        setTimeout(()=>this.execute(input),0);
    }
    reject(input) {}
    then(cb) {
        this.queue.push(cb);
        return this
    }
    catch(cb) {}
    execute(input) {
        if (this.queue.length === 0) return
        const result = this.queue.shift()(input);
        result instanceof MyPromise
            ? this.chain(result)
            : this.execute(result)
    }
    chain(promise) {
        return this.queue.length > 0
            ? this.chain(promise.then(this.queue.shift()))
            : promise
    }
}