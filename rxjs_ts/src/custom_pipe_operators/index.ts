import {Observable, interval, fromEvent, Subscriber} from 'rxjs';
import {map, take, filter} from 'rxjs/operators';

// import './swipe';
// import './slider';

// custom Pipe

// 1. grab all functions 
// 2. return function that gets Observable
// 3. call every function with result of previous function
//  first function must be called with source provided in step 2  

const pipe = (...functions: Function[])=> (source: Observable<any>) => {
  return functions.reduce((newSource, fn)=> fn(newSource), source)
}
// -------------------------------

// Custom operator
function doNothing(source$: Observable<any>) {
  return source$
}

function toText(source$: Observable<any>){
  return new Observable(subscriber => {
    subscriber.next('RxJS is awesome');
    subscriber.complete()
  })
}
// -------------------------------

// one more example with current stream
class DoubleSubscriber extends Subscriber<number>{
  next(value: number):void{
    super.next(value *2)
  }
}

// lift sets stream from argument as current stream 
function double(source$:Observable<any>){
 return source$
    .lift({
      call(subscribe:Subscriber<unknown>, source: any):void {
        source.subscribe(new DoubleSubscriber(subscribe))
      }
    })  
}
// -------------------------------

// set of operators can be useful
const filterWithDouble = pipe(
  filter((x : number)=> x % 3 === 0),
  double
)

// create stream ad use set from operators
interval(1000)
  .pipe(filterWithDouble)
  .subscribe(console.log)