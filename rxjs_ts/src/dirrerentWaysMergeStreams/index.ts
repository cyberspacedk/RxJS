import {Observable, interval, fromEvent, Subscriber, of, pipe} from 'rxjs';
import {map, take, filter, pluck, mergeAll, mergeMap, switchAll, debounceTime, concatAll, exhaust} from 'rxjs/operators';  
import { ajax } from 'rxjs/ajax';

// High order stream

// bad practice for call subscribe in subscribe
// interval(2000)
//   .pipe(
//     map((x)=> {
//       return of(x*2)
//     })
//   )
//   .subscribe(x=> x.subscribe(console.log));

const inputNode = document.querySelector('input') as HTMLInputElement;

const sequence$ = fromEvent(inputNode, 'input')


// const map_mergeAll$ =  sequence$.pipe(getAsyncData).subscribe(x=> console.log('Map + MergeAll', x));
// const mergeMap$ =  sequence$.pipe(getAsyncDataNewWay).subscribe(x=> console.log('mergeMap', x));
const map_switchAll$ =  sequence$.pipe(getAsyncSwitchAll).subscribe(x=> console.log('switchAll', x));


// map + mergeAll
// mergeAll doesn't guarantee that data will be in right order
function getAsyncData(source$:Observable<any>) {
  return source$.pipe( 
    map(e=> {
      const {value} = e.target as HTMLInputElement;
      return ajax(`https://api.github.com/search/repositories?q=${value}`)
    }),  
    mergeAll(), 
    pluck('response')
)};

// MergeMap
function getAsyncDataNewWay(source$:Observable<any>){
  return source$.pipe(
    mergeMap(e=> {
      const {value} = e.target as HTMLInputElement;
      return ajax(`https://api.github.com/search/repositories?q=${value}`)
    }),
    pluck('response')
  )
}

// map + switchAll
// when we type some in input every symbol will trigger request to APi
// switchAll get the latest input value and replace old stream on new stream
function getAsyncSwitchAll(source$:Observable<any>){
  return source$.pipe(
    debounceTime(300),
    map(e=> {
      const {value} = e.target as HTMLInputElement;
      return ajax(`https://api.github.com/search/repositories?q=${value}`)
    }),
    switchAll(),
    pluck('response')
  )
}

// map + concatAll
// concatAll guarantee that we get ordered data 
function getAsyncConcatAll(source$:Observable<any>){
  return source$.pipe(
    debounceTime(300),
    map(e=> {
      const {value} = e.target as HTMLInputElement;
      return ajax(`https://api.github.com/search/repositories?q=${value}`)
    }),
    concatAll(),
    pluck('response')
  )
}


// map + exhaust
// exhaust will skip all incoming data while request is processing
// example: user type word 'a' then request will be send and if user type another word they will be skipped 
function getAsyncExhaust(source$:Observable<any>){
  return source$.pipe(
    debounceTime(300),
    map(e=> {
      const {value} = e.target as HTMLInputElement;
      return ajax(`https://api.github.com/search/repositories?q=${value}`)
    }),
    exhaust(),
    pluck('response')
  )
}