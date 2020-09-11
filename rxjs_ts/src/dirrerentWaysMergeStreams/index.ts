import {Observable, interval, fromEvent, Subscriber, of, pipe} from 'rxjs';
import {map, take, filter, pluck, mergeAll, mergeMap, switchAll, debounceTime, concatAll, exhaust} from 'rxjs/operators';  
import { ajax } from 'rxjs/ajax';
 