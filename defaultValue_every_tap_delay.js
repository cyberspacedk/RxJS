const {of, interval, timer, range, from, fromEvent} = rxjs;
const { map, every, defaultIfEmpty, tap, delay } = rxjs.operators;

// defaultIfEmpty set value if stream is empty
of()
  .pipe(
    defaultIfEmpty('I am empty default value')
  )
  .subscribe(createSubscribe('of'));

// work similar to array method Every
from([1, 2, 3, 4, 5])
  .pipe(
    every(x=> typeof x === 'number')
  )
  .subscribe(createSubscribe('every'))

// tap gets value ans we can do some logic with this value.
// value inside tap does not transformed
from([1, 2, 3, 4, 5])
  .pipe(
    tap(x => console.log('Before', x)),
    map(x => x * x),
    tap(x => console.log('After', x)),
  )
  .subscribe(createSubscribe('tap'))

// delay stream execution on ms provided as arg in delay operator 
from([1, 2, 3, 4, 5])
  .pipe(
    delay(2000),
    tap(x => console.log('Before', x)),
    map(x => x * x),
    tap(x => console.log('After', x)),
  )
  .subscribe(createSubscribe('delay')); 