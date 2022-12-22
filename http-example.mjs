import {request} from 'https';
// import http from 'https'
import {get} from 'https'

// http takes a URL , and a callback
// const request = http.request('https://www.google.com',()=>{

// })

// here we have destructed the request function from the https module
const req  = request('https://www.google.com', (res)=>{
    // we need to set event emitter on receiving data
    res.on('data', (chunk)=>{
        console.log(`data chunk ios ${chunk}`)
    })
    // we can also set event emitter on ending , and lots more
    res.on('end', ()=>{
        console.log('no more data')
    })
})

//  end function  triggers it  i.e. it is  makes the request
req.end()   


// if we use get() function we can get rid of the reequest.end() function

get('https://www.google.com', (res)=>{
    res.on('data', (chunk)=>{
        console.log(`the chunk of data is ${chunk}`)
    })
    res.on('end', ()=>{
        console.log('No moew Data')
    })
})