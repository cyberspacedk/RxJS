const {of, interval} = rxjs;
const {take, skip, skipWhile, takeWhile, first, last, find, findIndex} = rxjs.operators;

// ****** first ******
// get the first argument
of(1, 5, 'Hello', 'World')
  .pipe(first()) // will return 'Hello'
  .subscribe(createSubscribe('first'));

  // ****** last ******
// get the last argument
of(1, 5, 'Hello', 'World')
  .pipe(last()) // will return 'World'
  .subscribe(createSubscribe('last'));

// ****** find ******
//  find element or return undefined
of(1, 5, 'Hello', 'World')
  .pipe(find(x=> x === 5)) // will return 5 
  .subscribe(createSubscribe('find'));

// ****** findIndex ****** 
// find index of element
of(1, 5, 'Hello', 'World')
  .pipe(findIndex(x=> x === 1)) // will return 0
  .subscribe(createSubscribe('findIndex'));
 