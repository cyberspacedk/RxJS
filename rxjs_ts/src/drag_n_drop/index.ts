import { fromEvent, Observable } from "rxjs";
import { concatMap, map, takeUntil } from "rxjs/operators";


const draggableNode = document.querySelector('.draggable') as HTMLDivElement;

const mouseDown$ = fromEvent<MouseEvent>(draggableNode, 'mousedown');
const mouseMove$ = fromEvent<MouseEvent>(document, 'mousemove');
const mouseUp$ = fromEvent<MouseEvent>(draggableNode, 'mouseup');  


drag(mouseDown$, mouseMove$, mouseUp$).subscribe(position=> { 
    draggableNode.style.left = `${position.left}px`; // update element position with new coords
    draggableNode.style.top = `${position.top}px`; 
  });

function drag(
  sourceStart$:Observable<MouseEvent>, 
  sourceMove$:Observable<MouseEvent>, 
  sourceUp$:Observable<MouseEvent>
){
  return sourceStart$.pipe( // begin from key down event
      concatMap(startEvent => { 
        return sourceMove$.pipe(
          map(moveEvent => { // handle mouse move stream
            moveEvent.preventDefault();
            return { // get new element position
              left: moveEvent.clientX - startEvent.offsetX,
              top: moveEvent.clientY - startEvent.offsetY
            }
          }),
          takeUntil(sourceUp$) // end stream until key up don't called
        )
      })
    )
} 