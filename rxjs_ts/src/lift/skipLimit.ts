import {Observable, interval, fromEvent, Subscriber} from 'rxjs';
import {map, take, filter} from 'rxjs/operators'; 
 
class SkipLimitSubscriber extends Subscriber<number>{
  private skip:number;
  private limit:number;
  private count:number =1;
  private interval:number =1;

  constructor(subscribe:Subscriber<any>, skip:number, limit:number){
    super(subscribe);
    this.skip = skip;
    this.limit = limit
  }

  next(value: number):void{
    const borderLeft = this.interval * (this.skip + this.limit) - this.limit;
    const borderRight = borderLeft + this.limit;

    if(borderLeft < this.count && this.count <= borderRight){
      super.next(value);
      this.count++;

      if(borderRight > this.count){
        this.interval++
      }

      return;
    }

    this.count++
  }
}

 
export const skipLimit = (skip: number, limit:number) => (source$:Observable<any>)=>{
  return source$
    .lift({
      call(subscribe:Subscriber<unknown>, source: any):void {
        source.subscribe(new SkipLimitSubscriber(subscribe, skip, limit))
      }
    })  
} 