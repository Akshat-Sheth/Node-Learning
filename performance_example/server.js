const express = require('express')
const app = express()
const cluster = require('cluster')
const os = require('os')
const PORT = 1234;

// real life function for blocking
    // JSON.stringify({}) => "{}"
    // JSON.parse("{}") => {}
    // [1,5,2,4].sort()


function delay(duration){
    const startTime = Date.now()
    while(Date.now() - startTime < duration){
        // event loop is completely blocked  as this delay() is not any I/O operation ( I/O operation can be put into the thread pool in the node internals )
    }
}

app.get('/', (req,res)=>{

    res.send(`Performance example  ${process.pid} `)
})

app.get('/timer', (req,res)=>{
    // send the response after delay
    delay(9000)
    res.send('Beep Beep Beep !!!!!')
})

// if(cluster.isMaster){
//     console.log(`master has been stared ${process.pid} `)
//     // creating 2 worker process when the master process is first called
//     // cluster.fork()
//     // cluster.fork()

//     // to be clever
//     // os.cpus() gives use number of logical cores inside our cpu
//     //  by doing this we can maximize the use of our cores inside our CPU
//     //  maximizing the cluster performance
//     const NUM_WORKERS = os.cpus().length
//     for(let i=0;i<NUM_WORKERS;i++){
//         cluster.fork()
//     }

// }else{
//     console.log('worker started')
//     // we want to listen to the request only whenn the worker process is runnning 
//     app.listen(PORT, ()=>{
//         console.log(`Listening on the port ${PORT}`)
//     })
// }


// if we are using pm2 module than we just need to write the following lines

    app.listen(PORT, ()=>{
        console.log(`Listening on the port ${PORT}`)
    })






