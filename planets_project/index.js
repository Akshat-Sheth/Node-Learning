const { parse } = require('csv-parse')
const fs = require('fs')

// we have to use our built in fs library to get the stream data as parse() funciton doesnot do that
// parse() is a function that return s us a event emitter that deals with the stream of data coming from that file.

const results = []

function isHabitablePlanet(planet){
    return planet['koi_disposition'] === 'CONFIRMED' && planet['koi_insol'] > 0.36  && planet['koi_insol'] < 1.11 && planet['koi_prad'] < 1.6
}

//  reading the file and storing it inside of the results array
fs.createReadStream('kepler_data.csv')
// pipe() function is always readable.pipe(writeable)
// pipe funcition is ment to connect readable stream source to a writable stream destination 
// Here we are piping the stream of the kepler_data.csv file to another stream
  .pipe(parse({
      comment:'#',
    //   columns set to true will return each row in our file as a js object with key value pairs
      columns:true
  }))
  .on('data', (data)=>{
      if(isHabitablePlanet(data)){
        results.push(data)
      }
  })
  .on('error', (err)=>{
    console.log(err)
  })
  .on('end',()=>{
      console.log(results.map((item)=>{
        return item['kepler_name']
      }))
      console.log(`${results.length} habitable planets found`)
  })







