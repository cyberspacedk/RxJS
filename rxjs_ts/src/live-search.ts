import { fromEvent, Observable } from "rxjs";
import { debounceTime, pluck, filter, map, distinctUntilChanged, switchMap, concatAll, bufferCount, reduce } from "rxjs/operators";
import { ajax } from 'rxjs/ajax';

 
const inputElement = document.querySelector('input') as HTMLInputElement; 
const container = document.querySelector('.container') as HTMLDivElement;


export interface SearchResult {
  name: string;
  description: string;
  owner: {
    avatar_url: string;
  }
} 

fromEvent<MouseEvent>(inputElement, 'input')
  .pipe(
    debounceTime(300),
    pluck<MouseEvent, string>('target', 'value'),
    map((value:string) => value.trim()),
    filter((value: string) => value.length <15),
    distinctUntilChanged(), // distinctUntilChanged - remove duplicates 
    switchMap(value => {
      return ajax(`https://api.github.com/search/repositories?q=${value}`)
        .pipe(
          pluck<any, SearchResult[]>('response', 'items'), // grab response items
          concatAll(), // concatAll - split response on separate items. Example: 30 items => 30 streams on 1 item
          map(createMarkup), // take response item and create markup for card. 
          bufferCount(3),  // gather array from 3 items. Example passed data consists from 30 items. In that case we gave 10 streams with 3 items
          reduce((resultHtml: string, cardHtml: string[]) =>  resultHtml += createRow(cardHtml), '') // combine all cards into one markup
        )
    })
  )
  .subscribe((cardsHtml:string) => container.innerHTML = cardsHtml ); // paste all cards
 
export function createMarkup(data:SearchResult){
  const {name, description, owner: {avatar_url} } = data;
  const card = `
    <div class="col-md-4">
      <div class="card">
        <img src=${avatar_url} alt=${name} />
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <p class="card-text">${description}</p>
        </div>
      </div>
    </div>
  `
  return card;
};

export function createRow(card: string[]){
  return `
    <div class="row">
      ${card.join(' ')}
    </div>
  `
}