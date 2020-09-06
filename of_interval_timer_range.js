const {of, interval, timer, range} = rxjs;
const {take} = rxjs.operators; 

// ****** of ******
//  Can create stream from any data (numbers, string, arrays )
// every arguments will be passed to .next() and handle one by one
of(5, 180, 'any data', ['one', 99])
  .subscribe(createSubscribe('of'));

// ****** interval ****** 
// first param - time interval  
interval(500)
  .pipe(take(10))
  .subscribe(createSubscribe('interval'));

// ****** timer ****** 
// first param - time delay  
// second param - interval time repeat
timer(3000, 500)
  .pipe(take(5))
  .subscribe(createSubscribe('timer'));

// ****** range ******
// first param - starts from value  
// second param - increments this value times 
range(5, 15)
  .subscribe(createSubscribe('range'));