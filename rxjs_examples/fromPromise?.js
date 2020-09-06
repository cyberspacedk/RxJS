const {Observable} = rxjs; 
 

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

 function delay(ms){  
  return new Promise((res, rej)=>{
    setTimeout(()=>{
      res(5)
    }, ms )
  })
 };

 delay(100).then(data=> console.log(data))

const p$ = Observable.fromPromise(delay(3000));
p$.subscribe(createSubscribe('promise'))