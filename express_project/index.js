const express =require('express')
const path = require('path')
const friendsRouter = require('./router/friends.router');
const messagesRouter = require('./router/messages.router');
const app = express()

// this - [ app.set() ] is for the templating engine 
app.set('view engine', 'hbs')
// here the secong parameter is the path toour views folder
app.set('views', path.join(__dirname, 'views'))

// after the above 2 lines express knows  about  the information it needs to load handle bars internally 
//  and it also knows where to find the templates in our project folder

const PORT = 3000;

// writing our own logging middleware
app.use( (req,res,next)=>{
    const start = Date.now()
    // next() function should be called to make sure that express passes the request to th correct handler forward
    //  if we dont call the next() function over here than the express will hang over here and not move forward
    next();
    // actions go over here ...
    //  after the handler have done everything they return upwards and this is the last chance to measure the time 
    const delta = Date.now() - start;
    console.log(`${req.method} : ${req.baseUrl}${req.url} : ${delta}ms `)
})

// the parameter that we pass to the static() function is  the string that contains  the relative path of the folder that we want to make available from our server
// here we can serve a static web page 
// the path must be relative to the folder from which we launch the node
app.use( '/site' ,express.static( path.join(__dirname, 'public')) )
app.use( express.json() )

// templating engine example
app.get('/', (req,res) => {
    res.render('index', {
        title: 'Messi is the best',
        heading: 'MESSI'
    })
})

//  here we are saying express to use the friends router
//  we can mount a group of paths  under a specific object
//  here /friends is prefix for the every friendsRouter
app.use( '/friends',  friendsRouter)
app.use('/messages', messagesRouter)







app.listen(PORT, ()=>{
    console.log(`Listening on the port ${PORT}`)
})
