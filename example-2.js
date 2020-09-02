const {fromEvent} = rxjs;

const button = document.querySelector('button');

const btn$ = fromEvent(button, 'click');
btn$.subscribe((e)=>{
  console.log(e)
})

const input$ = fromEvent(input, 'keyup')
  .subscribe((e)=> console.log(e));

const document$ = fromEvent(document, 'mousemove')
  .subscribe(e=> {
    document.querySelector('h1').innerHTML = `X:${e.clientX}, Y:${e.clientY}`
  })