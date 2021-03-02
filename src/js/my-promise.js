const PENDING = 'pending';
const RESOLVED = 'resolved';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

export default class MyPromise {
  static RecursiveCatch(myPromise, err) {
    if (!myPromise) return;
    else if (myPromise.onCatched) return myPromise.onCatched(err);
    else return MyPromise.RecursiveCatch(myPromise.next, err);
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
      result.then((innerResult) => this.internalFulfilled.call(this, innerResult));
    else
      this.internalFulfilled.call(this, result);
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
    setTimeout(() => {
      try {
        const fulfilledResult = this.onFulfilled(result);

        if (this.next)
          this.next.resolve(fulfilledResult);
      } catch (err) {
        this.internalCatched(err);
      } finally {
        this.state = FULFILLED;
      }
    }, 0);
  }

  internalRejected(result) {
    setTimeout(() => {
      try {
        if (result instanceof Error)
          throw result;

        const rejectedResult = this.onRejected(result);
        
        if (this.next)
          this.next.reject(rejectedResult);
      } catch (err) {
        this.internalCatched(err);
      } finally {
        this.state = REJECTED;
      }
    }, 0);
  }

  internalCatched(err) {
    setTimeout(() => {
      const onCatchedPromise = this.closestOnCatchedPromise();

      if (!onCatchedPromise)
        return;

      const handledResult = onCatchedPromise.onCatched(err);

      if (handledResult && onCatchedPromise.next)
        onCatchedPromise.next.resolve(handledResult);
    }, 0);
  }

  closestOnCatchedPromise() {
    if (this.onCatched) return this;
    else if (this.next) return this.next.closestOnCatchedPromise();

    return null;
  }
}