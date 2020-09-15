import {Observable, interval, fromEvent, Subscriber, of, pipe, zip, EMPTY} from 'rxjs';
import {map, take, filter, pluck, mergeAll, mergeMap, switchAll, debounceTime, concatAll, exhaust, tap, catchError, retry, retryWhen, delay, switchMap} from 'rxjs/operators';  
import { ajax } from 'rxjs/ajax';

// import './live-search';
// import './drag_n_drop'

const sequence1$ = interval(500);
const sequence2$ = of('A','B', 78, 'C', 'D', 55, 'E');

// Zip combine value from 1 stream with value from 2 stream into one array 
// will end stream when streams don't generate events anymore
const combinedSequences$ = zip(sequence1$, sequence2$); // we will get [0, 'A'], [1, 'B'], [2, 'C']

// !Lets generate error

// cathError will cath an Error and handle it
// we need return from catchError some stream or EMPTY 
combinedSequences$
  .pipe(
    map(([x, y]: [number, number | string]) => (y as any).toUpperCase()), // stream will be [0, 'A'], we try call toUpperCase for number to invoke Error
    tap((value)=> console.log('TAP: BEFORE CATCH', value)), 
    // retry(3), // will retry execute code before error will throwing
    retryWhen(errObserver => errObserver.pipe(delay(5000))), // will retry on some condition. for example during some time 
    catchError((err)=> {
      console.log('CATCHES in OPERATOR', err);
      return  EMPTY // EMPTY operator create empty stream 
    }),
    tap((value)=> console.log('TAP: AFTER CATCH', value)), 
  )
  .subscribe(
    (data) => console.log('SUBSCRIBE: DATA _____', data), 
    (err) => console.log('SUBSCRIBE: ERROR ', err), 
    () => console.log('SUBSCRIBE: COMPLETED')
  );


// !HOW TO SAVE EXTERNAL STREAM IF CURRENT INVOKE ERROR
combinedSequences$
  .pipe( 
    switchMap(([x, y]: [number, number | string]) =>{
      // CREATE ANOTHER STREAM FROM CURRENT STREAM VALUE 
      return of(y).pipe(
        map(y => (y as any).toUpperCase()), // INVOKE ERROR
        catchError((err)=> { 
          return  EMPTY //RETURN empty stream AND CLOSE INNER STREAM 
        })
      )
    })  
  )
  // IF INNER STREAM FAIL WE CONTINUE WORK WITH MAIN STREAM
  .subscribe(
    (data) => console.log('SUBSCRIBE: DATA _____', data), 
    (err) => console.log('SUBSCRIBE: ERROR ', err), 
    () => console.log('SUBSCRIBE: COMPLETED')
  );
