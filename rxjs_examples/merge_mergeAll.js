const {of, interval, timer, range, from, fromEvent, merge, concat} = rxjs;
const { map, take, every, defaultIfEmpty, tap, delay, merge: mergeAsOperator, mergeAll, concatAll } = rxjs.operators;

const stream1$ = of('First stream');
const stream2$ = of('Second stream'); 

// ****** Merge ******

// as Observable method
merge(stream1$, stream2$)
.subscribe(createSubscribe('merge'));
 
// as operator in pipe 
stream1$
  .pipe(
    mergeAsOperator(stream2$) // stream now as we call of('First stream', 'Second stream')
  )
  .subscribe(createSubscribe('merge'));

// One more example  
const s1$ = interval(1000).pipe(map(x=> `Stream 1 - ${x}`));
const s2$ = interval(500).pipe(map(x=> `Stream 2 - ${x}`));
 
// launch two streams and store its values to one common stream
merge(s1$, s2$)
  .pipe( 
    take(12) // get only 12 records and stop streams execution
  ) 
  .subscribe(createSubscribe('merge'));
 
// ****** MergeAll ****** 
// will merge all streams into one 
range(1, 2) // stream 1, 2
  .pipe(
    map(x=> range(1,3)), // on first iteration create stream 1, 2, 3 and on second also 1, 2, 3
    mergeAll() // we get one stream 1,2,3,1,2,3
  )
  .subscribe(createSubscribe('mergeAll'))
  