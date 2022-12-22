// const req = require('./request.js')
// we can also do destructuing
// const { send } = require('./request')
// const response = require('./response')

// function request(url,data){
//     // req.send(url,data);
//     // if we use destructuring than do the following
//     send(url,data)
//     return response.read()
// }

// const data = request('http://www.google.com', 'messi is the best')
// console.log(data)




// if we use ECMA SCRIPT

import {send} from './request.mjs'
import { read } from './response.mjs'

function request(url,data){
    send(url,data)
    return read()
}

const data = request('http://www.google.com', 'messi is the best')
console.log(data)



// node always caches the modules - VERY IMPORTANT



