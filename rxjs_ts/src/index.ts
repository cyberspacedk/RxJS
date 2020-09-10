import {Observable, interval, fromEvent, Subscriber} from 'rxjs';
import {map, take, filter} from 'rxjs/operators'; 

import {skipLimit} from './lift/skipLimit';

interval(1000).pipe(skipLimit(3, 4)).subscribe(console.log)