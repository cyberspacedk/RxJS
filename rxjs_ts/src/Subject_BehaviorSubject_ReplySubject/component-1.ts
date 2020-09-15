import {instance} from './service';

// here we Imulate trigger some event or data transfer

setTimeout(()=> {
  instance.sendData({message: 'I will be delivered second'})
}, 7000)

instance.sendData({message: 'I will be delivered first'})