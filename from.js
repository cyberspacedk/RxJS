const {from} = rxjs;

// create stream from array
// gets an array of data
// array can be from elements of any type
const arrayOfData = [{id: 33}, 2, 3, 'text'];

from(arrayOfData).subscribe(createSubscribe('from'))


const set = new Set(arrayOfData)

// also can be created from Set
from(arrayOfData).subscribe(createSubscribe('from'))

// create from Map 
const someFormData = [['name', 'John'], ['email', 'john@mail.com'], ['password', 12345]]
const map = new Map(someFormData)
// will be pass to next as array item ['name', 'John'] etc
from(map).subscribe(createSubscribe('from'))

function createSubscribe(name){
  return {
    next(x){
      console.log(name, '', x )
    },
    error(err){
      console.log(name, ' error ', err )
    },
    complete(){
      console.log(name, ' Completed')
    }
  }
 }