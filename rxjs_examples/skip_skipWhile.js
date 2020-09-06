const {of, interval} = rxjs;
const {take, skip, skipWhile, takeWhile} = rxjs.operators;

// ****** skip ******
// skip count of items provided in arguments  
of(1, 5, 'Hello', 'World')
  .pipe(skip(1)) // will return 5, 'Hello', 'World'
  .subscribe(createSubscribe('skip'));

// ****** skipWhile
//  get callback, that skip the value if it return true 
of(1, 5, 'Hello', 'World')
  .pipe(
    skipWhile(x => typeof x === 'number')
  ) // will return 'Hello', 'World'
  .subscribe(createSubscribe('skipWhile'));

interval(500)
  .pipe(
    skipWhile(x=> x < 5), 
    take(3)
  ) // will return  5, 6, 7
  .subscribe(createSubscribe('skipWhile'))

// ****** takeWhile ****** 
interval(500)
  .pipe(
    skipWhile(x=> x < 5), 
    takeWhile(x=> x < 9)
  ) // will return  5, 6, 7, 8
  .subscribe(createSubscribe('takeWhile'))