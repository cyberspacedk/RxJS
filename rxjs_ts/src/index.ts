import {Observable, interval} from 'rxjs';
 
const sequence$ = interval(1000);

const sub1 = sequence$.subscribe(x=> console.log('Sub-1', x))
const sub2 = sequence$.subscribe(x=> console.log('Sub-2', x))

setTimeout(()=>{
  sub1.unsubscribe()
}, 5000)