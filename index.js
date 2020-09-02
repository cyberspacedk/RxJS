const stream$ = rxjs.Observable.create((observer)=> {
  console.log('Stream was created')
  observer.next('One');

  setTimeout(()=>{
    observer.next('After 3000 ms')
  }, 1000)

  setTimeout(()=>{
    observer.error('I error')
  }, 2000)

  setTimeout(()=>{
    observer.next('After 5000 ms')
  }, 5000)

  observer.next('Two');
  // observer.complete()
});

stream$
  .subscribe(
    (data)=>{
      console.log(data)
    },
    (error)=>{
      console.log('Error', error)
    }, 
    ()=>{
      console.log('Completed')
    }
  )