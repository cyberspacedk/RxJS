import { Subject, BehaviorSubject, ReplaySubject } from "rxjs";


class DataService{
  // private controlSequence$$ = new Subject();
  private controlSequence$$ = new BehaviorSubject({message: 'I initial value'});
  // private controlSequence$$ = new ReplaySubject(3); // we get 3 last values
  
  public getData(){
    return this.controlSequence$$.asObservable(); // method get link to Observable
  };

  public sendData(data:any){
    this.controlSequence$$.next(data); // dispatch data to all subscribers
  }
};

export const instance = new DataService()