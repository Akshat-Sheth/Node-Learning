import EventEmitter from 'events';
const clebrity = new EventEmitter()

// subscribe to the clebrity for observer 1

clebrity.on('race', (result)=>{
    if(result === 'win'){
        console.log('Congratulations U R the BEST !!!!!')
    }
})

// subscribe to the clebrity for observer 2

clebrity.on('race', (result)=>{
    if(result === 'win'){
        console.log(' U R the WORST !!!!!')
    }
})


// clebrity.emit('race win')

process.on('exit', (code)=>{
    console.log('Process emitted with the code', code)
})

//  first parameter is the event and the second parameter is the result
clebrity.emit('race','win') 
clebrity.emit('race', 'lose')

