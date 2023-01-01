const axios = require('axios')
//use axios to connect to api and BASE_URL will work similarly to POSTMAN in using axios later to post,delete, etc.
const BASE_URL = 'https://csci.hsutx.edu/~jab1908/web2/hw11/public/api'

exports.getLogin = (req, res, next) => {
    //still need to pass errors object becuz we will be looking for it in the database from error post login part (same old)
    res.render('login', {
        title: "Books Login",
        errors: {},
        old: {}
    })
}

exports.postLogin = (req, res, next) => {
    let old = req.body
    //my laravel api does all the authentication so we do not care about it here we just post the values we get from the user
    //my api will compare with the database
    axios.post(BASE_URL + '/login', {
        email: req.body.email,
        password: req.body.password
    })
    //we are sending this request to our api so must handle it with a promise
        .then(response => {
            console.log(response.data)
            //session var passed as part of the request object **The name isLoggedIn is made up
            //isLoggedIn is a created session variable that we just made up right now
            req.session.isLoggedIn = true
            req.session.userId = response.data.data.user_id
            req.session.apiToken = response.data.data.api_token
            res.redirect('/')
        })
        .catch (error => {
            //errors in response.data will get the JSON error messages from the api
            console.log(error.response.data)
            res.render('login', {
                title: "Books Login",
                errors: error.response.data.errors,
                old: old
            })
        })
}

exports.getLogout = (req, res, next) => {
    axios.post(BASE_URL + '/logout', {}, {
        headers: { Authorization: 'Bearer ' + req.session.apiToken }
    })
    //we are sending this request to our api so must handle it with a promise
        .then(response => {
            req.session.destroy(err => {
                res.redirect('/')
            })
        })
        .catch (error => {
            res.redirect('/')
        })
}

exports.getSignup = (req, res, next) => {
    
    res.render('signup', {
        title: "Books Signup"
    })
}
