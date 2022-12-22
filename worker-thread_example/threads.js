const { Worker, isMainThread, workerData }  =require('worker_threads')


if(isMainThread){
    //  it takes a string that points to a file that contains js code to be executed in that worker
    // the second parameter is useful to send work from the main thread to the worker thread 
    console.log(`Worker : ${process.pid}`)
    new Worker(__filename, {
        workerData: [7,6,2,3]
    })
    new Worker(__filename, {
        workerData: [1,5,2,3]
    })
}else{
    console.log(`Worker : ${process.pid}`)
    console.log(`${workerData} in sorted form is  ->  ${workerData.sort((a,b)=>a-b)} `)
}


// here both the arrays will be sorted parallely ... 
// so this is the worker thread
// it shares the memory unlike process

// all of this stuff happens inside 1 processs