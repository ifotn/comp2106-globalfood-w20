var express = require('express');
var router = express.Router();

var mongoose = require('mongoose')
var Country = require('../models/country') // for country listings
var User = require('../models/user') // for registration & login

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'COMP2106 Global Food Market' });
});

/* GET about page */
router.get('/about', (req, res, next) => {
  // res.render('about', {
  //   title: 'About Us',
  //   countries: [{
  //     name: 'Canada'
  //   }, {
  //     name: 'India'
  //   }, {
  //     name: 'Italy'
  //   }, {
  //     name: 'Barbados'
  //   }, {
  //     name: 'Iran'
  //   }, {
  //     name: 'Taiwan'
  //   }, {
  //     name: 'Korea'
  //   }, {
  //     name: 'Viet Nam'
  //   }]
  // })
  Country.find((err, countries)=> {
    if(err){
      console.log(err)
      res.send(err)
    }else{
      // load the main countries page
      res.render('about', {
        countries: countries
      })
    }
  })
})

// GET: /register => load register form
router.get('/register', (req, res, next) => {
  res.render('register')
})

// POST: /register => use passport to create a new user
router.post('/register', (req, res, next) => {
  // use the User model & passport to register.  Send password separately so passport can hash it
  User.register(new User({ username: req.body.username }), req.body.password, (err, newUser) => {
    if (err) { // reload register page and pass error details to it for display
      console.log(err)
       res.render('register', { message: err} )
    }
    else { // register was successful.  log new user in and load main food page
      req.login(newUser, (err) => {
        res.redirect('/foods')
      })
    }
  })
})


// GET: /login => load login form
router.get('/login', (req, res, next) => {
  res.render('login')
})



module.exports = router;
