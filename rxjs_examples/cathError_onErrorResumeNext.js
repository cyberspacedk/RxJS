const {of, interval, timer, range, from, fromEvent, merge, concat, zip, combineLatest, onErrorResumeNext} = rxjs;
const { map, take, delay, mergeAll, concatAll, withLatestFrom, catchError } = rxjs.operators;

// ****** catchError ****** 
// handle error. should return Observable like value (array, iteratee)
rxjs
.throwError(new Error('Smth went wrong'))
  .pipe(
    catchError(err=> rxjs.of(err))
    )
  .subscribe(createSubscribe('catchError'));
 

// ****** onErrorResumeNext ****** 
// onErrorResumeNext gets stream or streams as argument. 
// if error will be occurred in one of stream it will switch on other stream

const s1$ = rxjs.throwError(new Error('Oops!'));
const s2$ = rxjs.interval(500).pipe(take(2));

onErrorResumeNext(s1$, s2$) 
  .subscribe(createSubscribe('onErrorResumeNext'));

 