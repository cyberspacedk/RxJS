import { fromEvent, Observable, zip, from, merge, iif, of } from "rxjs";
import { map, switchMap, pluck } from "rxjs/operators";

// create two streams 
// click or touch start
const start$ = getClientX(fromEvent<TouchEvent>(document, 'touchstart'), fromEvent<MouseEvent>(document, 'mousedown')); 
// click or touch end
const end$ = getClientX(fromEvent<TouchEvent>(document, 'touchend'), fromEvent<MouseEvent>(document, 'mouseup')); 

// based on previous two streams create one stream
const dimensions$ = zip(start$, end$)

// call swipe function and pass stream
swipe(dimensions$).subscribe(direction => {
  const dir = direction < 0 ? 'SWIPE LEFT' : 'SWIPE RIGHT';
  console.log(dir)
})

// get clientX coordinate mobile or desktop
function getClientX(sourceMobile$: Observable<TouchEvent>, sourceDesktop$: Observable<MouseEvent>){
  return merge(sourceMobile$, sourceDesktop$)    
          .pipe( 
            // Variant with switchMap - lets us switch on another stream
            switchMap((event: TouchEvent | MouseEvent)=>{
              return iif(
                ()=> event instanceof TouchEvent,
                of(event as TouchEvent).pipe(pluck('changeTouches', '0', 'clientX')),
                of(event as MouseEvent).pipe(pluck('clientX'))                
                )
            }),
            // Variant with map
            // map((event: TouchEvent | MouseEvent) => {
            //   if(event instanceof TouchEvent){
            //     return event.changedTouches[0].clientX;
            //   }
            //   return event.clientX
            // })
          )
}

// get stream and calculate difference between values
function swipe(source$:Observable<[number, number]>){
  return source$
          .pipe(
            map(([start, end]) => start - end)
          )
}