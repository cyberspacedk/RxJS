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
const {take, skip, map, debounceTime, distinct, buffer, bufferTime, bufferCount} = rxjs.operators;
