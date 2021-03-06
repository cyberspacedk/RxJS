const {of, interval, timer} = rxjs;
const {take, skip, skipWhile, takeUntil, skipUntil} = rxjs.operators;

// ****** skipUntil
// launch subscriber after 3s 
interval(500)
  .pipe(
    skipUntil(timer(3000))
  ) // will return values after 3s
  .subscribe(createSubscribe('skipUntil'));

// ****** takeIntil ****** 
// takeUntil will grab tha values 5s and after will stop
interval(500)
.pipe(
  skipUntil(timer(3000)),
  takeUntil(timer(5000)) 
) // will return values after 3s but DURING 5s. 5 - 3 =2s it is the time when the value will be grabbed
.subscribe(createSubscribe('takeUntil'))