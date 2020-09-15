import {instance} from './service';

// here we will subscribe on data getting

const sequence$= instance.getData(); // getData is method that contains Observer. we can subscribe on it

sequence$.subscribe((data: any)=> console.log('Subscriber', data))