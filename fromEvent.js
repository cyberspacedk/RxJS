const {fromEvent} = rxjs;

// get element
const button = document.querySelector('button');

// create stream
const btn$ = fromEvent(button, 'click');

// subscribe on stream
btn$.subscribe((e)=> console.log(e))

// Example fro Input element
const input$ = fromEvent(input, 'keyup')
  .subscribe((e)=> console.log(e));

const document$ = fromEvent(document, 'mousemove')
  .subscribe(e=> {
    document.querySelector('h1').innerHTML = `X:${e.clientX}, Y:${e.clientY}`
  })