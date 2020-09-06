import {Observable} from 'rxjs';
 

const sequence$ = new Observable(subscriber => {
  let count = 1;

  const intervalId = setInterval(()=>{
    subscriber.next(count++);

    if(count % 5 === 0){
      clearInterval(intervalId)
      subscriber.complete();
    }    
  }, 1000);  

  return () => {
    console.log('unsubscribe');
    clearInterval(intervalId)
  }

});

const subscription = sequence$.subscribe(x=> console.log(x));

setTimeout(()=> subscription.unsubscribe(), 5000)
