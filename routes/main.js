const express = require('express')
//tell them yes we want to use express framework in terminal npm install express --save
//create router object and then define stuff for it
const router = express.Router()
const mainController = require('../controllers/main')

router.get('/', mainController.getIndex);
router.get('/addbook', mainController.getAddBook);
router.get('/bookdetail', mainController.getBookDetail);

router.get('/error', mainController.getError);

router.post('/addbook', mainController.postBook);
router.post('/deleteMessage', mainController.deleteMessage);

module.exports = router