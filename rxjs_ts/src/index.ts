import {Observable, interval, fromEvent, Subscriber, of, pipe, zip} from 'rxjs';
import {map, take, filter, pluck, mergeAll, mergeMap, switchAll, debounceTime, concatAll, exhaust} from 'rxjs/operators';  
import { ajax } from 'rxjs/ajax';

// import './live-search';
// import './drag_n_drop'

const sequence1$ = interval(500);
const sequence2$ = of(1,2,3,4,5,6,7);

const combinedSequences$ = zip(sequence1$, sequence2$);

combinedSequences$.subscribe(console.log)