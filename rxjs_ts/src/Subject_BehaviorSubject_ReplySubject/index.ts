import './component-1';
import './component-2';


// !Subject - Observable + Subscriber
// !BehaviorSubject - gets initialValue and cashing it. When subscribe we get either initialValue or last value
// !ReplySubject - can cashing any count of values. Ex: new ReplySubject(5) - cashing last 5 values

/* 
useful for spread data between different components
create one Subject and we can trigger .next method and all other who subscribe will get this data
*/ 