const express = require('express')
//tell them yes we want to use express framework in terminal npm install express --save
//create router object and then define stuff for it
const router = express.Router()
const authController = require('../controllers/auth')

router.get('/login', authController.getLogin);
router.get('/signup', authController.getSignup);
router.get('/logout', authController.getLogout);

router.post('/login', authController.postLogin);

module.exports = router