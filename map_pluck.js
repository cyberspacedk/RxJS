const {of, interval, timer, range, fromEvent} = rxjs;
const {take, map, pluck} = rxjs.operators;

interval(1000)
  .pipe(map(i=> i * 2), take(10))
  .subscribe(createSubscribe('map'))

of('hello', 'i', 'am').pipe(map(str=>str.toUpperCase())).subscribe(createSubscribe('map'))

fromEvent(input, 'keyup')
  .pipe(map(({target:{value}}) => ({value: value.toUpperCase(), length: value.toUpperCase().length})))
  .subscribe(createSubscribe('event'))

fromEvent(input, 'keyup')
  .pipe(pluck('target', 'value'))
  .subscribe(createSubscribe('event'))