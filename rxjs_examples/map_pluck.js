const {of, interval, timer, range, fromEvent} = rxjs;
const {take, map, pluck} = rxjs.operators;

// ****** map ******
interval(1000)
  .pipe(map(i=> i * 2), take(10))
  .subscribe(createSubscribe('map'))

of('hello', 'i', 'am')
  .pipe(
    map(str=>str.toUpperCase())
  )
  .subscribe(createSubscribe('map'))

fromEvent(input, 'keyup')
  .pipe(
    map(({target:{value}}) => ({value: value.toUpperCase(), length: value.toUpperCase().length}))
  )
  .subscribe(createSubscribe('event'))

// ****** pluck ******
// get value by path
fromEvent(input, 'keyup')
  .pipe(
    pluck('target', 'value') // here we get event object and take its value by path target.value
  )
  .subscribe(createSubscribe('event'))