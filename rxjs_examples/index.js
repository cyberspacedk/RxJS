const {of, interval, timer, range, from, Subject, BehaviorSubject, ReplaySubject} = rxjs;
const { map, take, delay, mergeAll, concatAll, withLatestFrom, catchError } = rxjs.operators;

// ****** Subject ****** 

// Subject can be as Observable and observer
// can call next error complete
const subject$ = new Subject(); 
const int$ = rxjs.interval(500);

// can subscribe on Subject and getting its values
int$.subscribe(subject$);
// subject$.subscribe(createSubscribe('Subject'));

subject$.next(1);
subject$.next(['data', {id:3}]);
subject$.next({id:55})
subject$.complete()

// ****** BehaviorSubject ****** 
//  can be initialized with initial value

const behavior$ = new BehaviorSubject('Initial');

behavior$.subscribe(createSubscribe('BehaviorSubject'));

behavior$.next('Other value');

// ****** ReplaySubject ****** 
//  can be initialized with initial value

const replay$ = new ReplaySubject(2);


replay$.next(1)
replay$.next(99)
replay$.next(3)

replay$.complete()

replay$.subscribe(createSubscribe('ReplaySubject'));