const https = require('https')
const express = require('express')
const app = express()
const PORT = 1234;
const path = require('path')
const fs = require('fs')
const helmet = require('helmet');
const passport = require('passport')
const { Strategy } = require('passport-google-oauth20');
const cookieSession = require('cookie-session');
require('dotenv').config()

const config = {
    CLIENT_ID : process.env.CLIENT_ID,
    CLIENT_SECRET : process.env.CLIENT_SECRET,
    COOKIE_KEY_1: process.env.COOKIE_KEY_1,
    COOKIE_KEY_2: process.env.COOKIE_KEY_2
}

// passport strategy

const AUTH_OPTIONS = {
    callbackURL : '/auth/google/callback',
    clientID : config.CLIENT_ID,
    clientSecret : config.CLIENT_SECRET
}

function verifyCallback( accessToken, refreshToken, profile, done ) {
    console.log(profile)
    // if accessToken and refresh token are valid than done() callback is called to supply passport with the user that authenticated ..
    //  if they are  not valid than we can pass the error object in place of null ...
    done(null, profile)
}


// the strategy function takes 2 parameters 
// first -> options
// second -> a verify funcioion(it is a callback functiion that is called when passport authenticate a user . It calls this callback with credentials as arguments)
passport.use(new Strategy(AUTH_OPTIONS, verifyCallback))


// save the session to the cookie
passport.serializeUser((user,done)=>{
    done(null,user.id)
})

// read the session from the cookie
passport.deserializeUser((id,done)=>[
    done(null,id)
])


app.use(helmet())
// cookie sesion is a funcion that takes options that determines hoe our session is configured
app.use(cookieSession({
    name:'session',
    // maxAge is in ms
    maxAge: 1000 * 60 * 60 *1000,
    // key are used for verifying the cookie
    keys : [ config.COOKIE_KEY_1, config.COOKIE_KEY_2 ]
}))
// adding passport here :
// initilize function returns passport middleware that helps us to setup passport
// initialize() fuinction sets uop a passport session 
// passpoert has 2 function 
// first -> to serialize the data -> to seralize the user data to the session determining what our cookie will store -> storing the value inside the cookie
// second -> to deseralize the data -> to take the value from the cookie and places into therequest object inside "req.user" -> taking the value from the cookuire and storing it inside of the "req.user"
app.use(passport.initialize())
// ehat this does is is it authenticate our session that is send to usr server  using  keys 
app.use(passport.session())

function checkedLoggedIn(req,res,next) {
    // isthere exists req.user pass.session() has validated the user ...
    // so we can set isLoggedIn to true
    console.log('current user ->', req.user)
    // isAuthenticated is builtin funciton in passport
    const isLoggedIn =  req.isAuthenticated() &&  req.user;
    if(!isLoggedIn){
        return res.status(401).json({
            error: "You are not Logged In ..."
        })
    }
    next()
}


// this thhree endpoints are the basic of how all the OAuth Application  will look ....

// endpoint for the user to login
// scope defins which data we are requesting from google when everything succed
app.get('/auth/google',  passport.authenticate('google',{
    scope:['email']
}) )

// this endpoint is the one which we registered with the google cloud while creating the oAuth Client Id
// second parameter is the options object that tells what happens if we fail to authenticate to we succeccd .. 
// third parameter is the request handler ..
app.get('/auth/google/callback', 

passport.authenticate('google', {
  failureRedirect: '/failure',
  successRedirect: '/',
  session: true,
}), 
(req, res) => {
  console.log('Google called us back!');
}
);


// this is the endpoint for the user to logout
app.get('/auth/logout',(req,res)=>{
    // this will remove the req.user property from this request and clears any logged in session
    req.logout()
    return res.redirect('/');
})

// here the second parameter is the middleware fuunction that applies just to "/secret"route nothing else
app.get('/secret',checkedLoggedIn,(req,res)=>{
    return res.send('Your secret value is 10')
})

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/failure', (req,res)=>{
    res.send('Failed to login ..')
})



https.createServer({
    // this is the option object;
    // we can here pass the SSL certificatess
    // key i sthe secret used to encrypt the data
    key:fs.readFileSync('key.pem'),
    cert:fs.readFileSync('cert.pem')
},app)
    .listen(PORT,()=>{
    console.log(`Listening on the port ${PORT} ...`)
})


// https.createServer(options).listen(()=>{
//     console.log(`Listening on the port ${PORT} ...`)
// })
