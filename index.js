function createSubscribe(name){
  return {
    next(x){
      console.log(name, '', x )
    },
    error(err){
      console.log(name, ' error ', err )
    },
    complete(){
      console.log(name, ' Completed')
    }
  }
 }

const {of, interval, timer, range, from, fromEvent} = rxjs;
const {take, skip, map, debounceTime, distinct} = rxjs.operators;

const cars = [
  {name: 'audi', price: 500}, 
  {name: 'bmw', price: 400}, 
  {name: 'mercedes', price: 700}  
];

// create stream from input event
fromEvent(input, 'keyup')
  .pipe(
    debounceTime(500),
    map(e=> e.target.value),
    distinct() // compare pev and next value.  and if they equal stop further subscribe
    )   
  .subscribe(createSubscribe('debounceTime'));

// remove not unique value from array and pass to subscribe only unique value
from([1, 55, 99, 35, 71, 1, 99, 39])
    .pipe(distinct()) 
    .subscribe(createSubscribe('distinct'))