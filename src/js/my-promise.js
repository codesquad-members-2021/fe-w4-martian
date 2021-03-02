const PENDING = 'pending';
const RESOLVED = 'resolved';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

export default class MyPromise {
  static RecursiveCatch(myPromise, err) {
    if (!myPromise) return;
    if (myPromise.onCatched) myPromise.onCatched(err);
    else MyPromise.RecursiveCatch(myPromise.next, err);
  }

  constructor(cb) {
    this.state = PENDING;
    this.next;
    this.onFulfilled;
    this.onRejected;
    this.onCatched;
    this.onFinally;

    if (cb)
      setTimeout(() => cb(this.resolve.bind(this), this.reject.bind(this)), 0);
  }

  then(onFulfilled, onRejected) {
    this.onFulfilled = onFulfilled;
    this.onRejected = onRejected;
    return (this.next = new MyPromise());
  }

  resolve(result) {
    this.state = RESOLVED;

    if (result instanceof MyPromise)
      result.then((innerResult) =>
        this.internalFulfilled.call(this, innerResult)
      );
    else setTimeout(() => this.internalFulfilled.call(this, result), 0);
  }

  reject(result) {
    this.state = RESOLVED;
    this.internalRejected(result);
  }

  catch(onCatched) {
    this.onCatched = onCatched;
    return (this.next = new MyPromise());
  }

  finally(result) {
    // TODO
  }

  internalFulfilled(result) {
    try {
      this.next
        ? this.next.resolve(this.onFulfilled(result))
        : this.onFulfilled(result);
    } catch (err) {
      setTimeout(() => MyPromise.RecursiveCatch(this, err), 0);
    } finally {
      this.state = FULFILLED;
    }
  }

  internalRejected(result) {
    try {
      if (result instanceof Error) throw result;

      this.next
        ? this.next.reject(this.onRejected(result))
        : this.onRejected(result);
    } catch (err) {
      setTimeout(() => MyPromise.RecursiveCatch(this, err), 0);
    } finally {
      this.state = REJECTED;
    }
  }
}