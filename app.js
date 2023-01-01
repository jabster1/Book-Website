const path = require('path')
const express = require('express')
//npm install express --save for framework we will use in nodejs visual studio
const res = require('express/lib/response')
const app = express()
const bodyParser = require('body-parser')

app.set('view engine', 'ejs')
//set path for static resources in documents such as css and js in public
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({extended: false})) //extract POST data into req.body if available

const session = require('express-session')
app.use(session({
    secret: 'thiscanbewhatever',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

//just thing to stay logged in to fix some issues real quick will comment out later
/*app.use((req,res,next)=> {
    req.session.isLoggedIn = true
    req.session.userId = 5
    req.session.apiToken = 'V2AwjoBSUtdD9FzcGArNLuAjy1RMsggAae6pJ3x1ERP4qNrYDJCozkQSvbDr'
    next()
})*/

//says routes file we want to use
const mainRoutes = require('./routes/main')
const authRoutes = require('./routes/auth')
app.use(mainRoutes)
app.use(authRoutes)

//response code json for when error occurs
app.use( (req, res, next) => {
    res.status(404).render('error', { 
        title: 'Book Error',
        message: "Page Not Found"
    })
})


//port number that we want the web server to listen one
app.listen(3000)