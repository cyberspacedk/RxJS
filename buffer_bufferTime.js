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

// buffer will store incoming data to array
interval(500)
  .pipe(buffer(interval(3000))) // buffer will accumulate values every 3s and then invoke subscriber
  .subscribe(createSubscribe('buffer'));

// bufferTime will store incoming data after ms in arg
interval(500)
  .pipe(
    bufferTime(2000),
    take(4)
  )  
  .subscribe(createSubscribe('bufferTime'));

// bufferCount get 2 params 
// 1 - bufferSize - size (count of elements) of the buffer
// 2- startBufferEvery	- optional param. start position of first index . 
// if first buffer was [1, 2, 3] and we pass start buffer 2 - in that case second buffer wil be [2, 3, 4] NOT [4, 5, 6]
range(0, 40)
  .pipe(
    bufferCount(3)
  )
  .subscribe(createSubscribe('bufferCount'));

// time in ms between clicks on document  
interval(1000)
  .pipe(
    buffer(fromEvent(document, 'click')),
    map(x=>x.length)
  )
  .subscribe(createSubscribe('buffer'))
