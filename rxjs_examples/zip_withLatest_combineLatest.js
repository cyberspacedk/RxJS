const {of, interval, timer, range, from, fromEvent, merge, concat, zip, combineLatest} = rxjs;
const { map, take, delay, mergeAll, concatAll, withLatestFrom } = rxjs.operators;

// ****** zip ******
// create one stream. wait till all streams are finishes
const s1$ = of('First');
const s2$ = of('Second')
  .pipe(
    delay(5000)
  );

zip(s1$, s2$) // after s2$ stream finished will return ['First', 'Second']
  .subscribe(createSubscribe('zip'));

const interval$ = interval(1000);
zip(
  interval$, // 0,1,2
  interval$.pipe( 
    take(3) // 0,1,2
  ), 
) // will return streams [0,0] [1,1] [2,3]
  // .subscribe(createSubscribe('zip'));

// ****** withLatestFrom ******
// get latest stream value 
const int1000$ = interval(1000);
const int500$ = interval(500);

int1000$
  .pipe(
    withLatestFrom(int500$) // add to stream last value from int500$ stream
  )
  // .subscribe(createSubscribe('withLatestFrom'));

// Lets define hom much time in ms pass by clicking on document  
const clicks = fromEvent(document, 'click');
const timers = interval(1000);
const result = clicks.pipe(
  withLatestFrom(timers)
  )
  // .subscribe(x=>console.log('Time since last click', x))

// ****** combineLatest ******
// create stream from other streams with its last values
const t1$ = timer(1000, 1000);
const t2$ = timer(2000, 1000);
const t3$ = timer(3000, 1000);

combineLatest(t1$, t2$, t3$)
  .pipe(take(2))
  .subscribe(createSubscribe('combineLatest'))
