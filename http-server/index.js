const http = require('http')
const port = 3000


const friends = [
    {
      id: 0,
      name: 'Nikola Tesla',
    },
    {
      id: 1,
      name: 'Sir Isaac Newton',
    },
    {
      id: 2,
      name: 'Albert Einstein',
    }
  ];
  

// req and res are stream
// req is a readable stream
// res is a writable stream



// const server = http.createServer((req,res) => {
//     res.writeHead(200, {
//         // 'Content-Type': 'text/plain',
//         'Content-type':'application/json'
//     })
//     // end() function indicates that all the options and the headers , etc are set and ready to be send
//     //  so end() function needs to be called on each request that comes to the server
//     // res.end() expects to pase a string in it so if we are sending a json object taht we have to convert it to string first

//     // res.end('Messi is the Best !')
//     res.end( JSON.stringify({
//         id:1,
//         name:'Messi',
//         description:'messi is the best player in the world'
//     }) )
// })


// we can create different endpoints based on the req 

const server = http.createServer()

server.on('request',(req,res) => {

            // for botaining parameter from the URL
            const items = req.url.split('/')
            //   /friends/2 => ['','friends', '2']
            console.log(items)
            if( req.method === 'POST' && items[1] === 'friends'){
                req.on('data', (data)=>{
                    const friend = data.toString()
                    console.log('Request', friend)
                    friends.push(JSON.parse(friend))
                })
                req.pipe(res)
            }
    else if( req.method === 'GET' && items[1] === 'friends'){
        // res.writeHead(200, {
        //     // 'Content-Type': 'text/plain',
        //     'Content-type':'application/json'
        // })
        // instead of this we ca also do : 
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        // end() function indicates that all the options and the headers , etc are set and ready to be send
        //  so end() function needs to be called on each request that comes to the server
        // res.end() expects to pase a string in it so if we are sending a json object taht we have to convert it to string first
    
        // res.end('Messi is the Best !')

        if(items.length === 3){
            const friendsIndex = items[2]
            res.end(JSON.stringify(friends[Number(friendsIndex)]))
        }else{
            res.end( JSON.stringify(friends))
        }


    }else if( req.method=== 'GET' && items[1] === 'messages'){
        res.setHeader('Content-Type', 'text/html')
        res.write('<html>')
        res.write('<body>')
        res.write('<ul>')
        res.write('<li>Argentina</li>')
        res.write('<li>Brazil</li>')
        res.write('<li>Spain</li>')
        res.write('<html>')
        res.write('</ul>')
        res.write('</body>')
        res.write('</html>')
        res.end()
    }else{
        res.statusCode = 404;
        res.end()
    }

})


server.listen(port, ()=>{
    console.log(`Listening on the port ${port} ...`)
})



