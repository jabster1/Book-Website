const axios = require('axios')
//use axios to connect to api and BASE_URL will work similarly to POSTMAN in using axios later to post,delete, etc.
const BASE_URL = 'https://csci.hsutx.edu/~jab1908/web2/hw11/public/api'

exports.getIndex = (req, res, next) => {
    //method axios will return promise result with the get books route and controller method in our laravel api
    //tries to render the page before the result of the axios.get comes in do to traveling aceross internet
    //we use callback commands or js promises here to fix that issue and you can chain promises next()
    axios.get(BASE_URL + '/books')
        .then(response => {
           // console.log(response.data)
           console.log(req.session)
            res.render('index', {
                title: "BookMe",
                books: response.data,
                loggedIn: req.session.isLoggedIn
            })
        })
        .catch(error => {
            res.redirect('/error')
            console.log(error)
        })
   
}

exports.postBook = (req, res, next) => {
    let data = req.body
    console.log(data)
    axios.post(BASE_URL + '/books', {
        title: data.title, 
        condition: data.condition,
        price: data.price
    }, {
        //this is how we pass our apiToken to the api
        headers: { Authorization: 'Bearer ' + req.session.apiToken }
    })
        .then(response => {
            res.redirect('/addbook')
        })
        .catch(error => {
            req.session.errors = error.response.data
            req.session.old = req.body
            res.redirect('/addbook')
        })
   
}

exports.getAddBook = (req, res, next) => {
    let errors, old
    if(typeof req.session.errors === 'undefined') {
        errors = {},
        old= {}
    }else{
        errors = req.session.errors.errors
        old = req.session.old
        delete req.session.errors
        delete req.session.old
    }
    res.render('addbook', {
        title: "AddBook",
        errors: errors,
        old: old
    })
}

exports.getBookDetail = (req, res, next) => {
   if(isNaN(req.query.book_id)){
       res.render('error', {
           title: "Book Error",
           message: "Invalid Book id"
       })
   } else if(typeof Number(req.query.book_id) === 'number' && (req.query.book_id>60 || req.query.book_id<1)){
        res.render('error', {
            title: "Book Error",
            message: "Book not Found"
        })
    }else {
        //console.log(req.query)
        axios.get(BASE_URL + '/books/' + req.query.book_id, {
            headers: { Authorization: 'Bearer ' + req.session.apiToken }
        })
            .then(response => {
                console.log(response.data)
                res.render('bookdetail', {
                    title: "BookDetail",
                    book: response.data[0],
                    isUser: req.session.userId
                })
            })
            .catch(error => {
                res.redirect('/error')
            })
    }
   
    
}

//extract that query string parameter in NodeJS
//Query string parameters get sent in req variable in our parameters
exports.getError = (req, res, next) => {
    //whatever is passed for message in the url is the request
    let message
   
    if(typeof req.query.message === 'undefined') {
        message = 'Unexpected Error!' 
    }else{
        message = req.query.message
    }
    res.render('error', {
        title: "Book Error",
        message: message
    })
}

    exports.deleteMessage = (req, res, next) => {
        let data = req.body
        console.log(data)
        axios.delete(BASE_URL + '/books/' + data.book_id, {
            //this is how we pass our apiToken to the api bearer auth like postman we did
            headers: { Authorization: 'Bearer ' + req.session.apiToken }
        })
            .then(response => {
                res.redirect('/addbook')
            })
            .catch(error => {
                res.redirect('/addbook')
            })  
    }
