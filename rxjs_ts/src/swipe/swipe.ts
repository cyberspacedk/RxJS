import { fromEvent, Observable, zip, from, merge } from "rxjs";
import { map } from "rxjs/operators";

const start$ = getClientX(fromEvent<TouchEvent>(document, 'touchstart'), fromEvent<MouseEvent>(document, 'mousedown')); 
const end$ = getClientX(fromEvent<TouchEvent>(document, 'touchend'), fromEvent<MouseEvent>(document, 'mouseup')); 

const dimensions$ = zip(start$, end$)

swipe(dimensions$).subscribe(direction => {
  const dir = direction < 0 ? 'SWIPE LEFT' : 'SWIPE RIGHT';
  console.log(dir)
})
 
function getClientX(sourceMobile$: Observable<TouchEvent>, sourceDesktop$: Observable<MouseEvent>){
  return merge(sourceMobile$, sourceDesktop$)    
          .pipe( 
            map((event: TouchEvent | MouseEvent) => {
              if(event instanceof TouchEvent){
                return event.changedTouches[0].clientX;
              }
              return event.clientX
            })
          )
}

function swipe(source$:Observable<[number, number]>){
  return source$
          .pipe(
            map(([start, end]) => start - end)
          )
}