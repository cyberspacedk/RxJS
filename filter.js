const {of, interval, timer, range, from, fromEvent} = rxjs;
const {take, skip, map, skipWhile, takeUntil, skipUntil, filter} = rxjs.operators;

// ****** filter ******
range(0, 10)
 .pipe(
   filter(x => x % 2)
  ) // return only odd values 1, 3, 5, 7, 9
 .subscribe(createSubscribe('filter'));


const cars = [
  {name: 'audi', price: 500}, 
  {name: 'bmw', price: 400}, 
  {name: 'mercedes', price: 700}  
];

// create stream from input event
fromEvent(input, 'keyup')
  .pipe(map(({target:{value}})=> value)) // get input value
  .subscribe(car=> {  
// create stream from cars 
    from(cars)
      .pipe(filter(x=> x.name === car)) // get exact card
      .subscribe(selectedCar => {  // here we have selected car  
        const car = `<h2>${selectedCar.name}</h2>` 
        document.querySelector('.selected-car').innerHTML = car; // show in page
      });

  })