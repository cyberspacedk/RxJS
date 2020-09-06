const { range, from, concat} = rxjs;
const { map, concatAll } = rxjs.operators;

// ****** Concat ******
// concat two streams into one 1,2,3,4,5,6 
const str1$ = from([1,2,3])
const str2$ = from([4,5,6])

concat(str1$, str2$)
  .subscribe(createSubscribe('concat'));

// ****** ConcatAll ******

range(1, 3) // 1,2,3
    .pipe(
      map(x=> range(x, 2)),  // first - 1,2 second - 2,3 third - 3,4
      concatAll() // final stream 1,2,2,3,3,4
    )
    .subscribe(createSubscribe('concatAll'))