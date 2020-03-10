var express = require('express');
var router = express.Router();
var passport = require('passport') // needed for login

var mongoose = require('mongoose')
var Country = require('../models/country') // for country listings
var User = require('../models/user') // for registration & login

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'COMP2106 Global Food Market',
    user: req.user
  });
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
        countries: countries,
        user: req.user
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
  // check the session for error messages to display
  let messages = req.session.messages || []  // store any session messages in a local variable
  req.session.messages = [] // clear out any session messages

  // pass any messages to login view
  res.render('login', {
    messages: messages
  })
})

// POST: /login => authenticate user
router.post('/login', passport.authenticate('local', {
  successRedirect: '/foods',
  failureRedirect: '/login',
  failureMessage: 'Invalid Login'
}))

// GET: /logout => sign user out
router.get('/logout', (req, res, next) => {
  // clear any messages in the session object
  req.session.messages = []

  // sign out & redirect to login
  req.logout()
  res.redirect('/login')
})

// GET: /google => invoke Google Sign-In
router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}), (req, res, next) => {})

// GET: /google/callback => process successful google sign-in request
router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/login'
}), (req, res, next) => {
  res.redirect('/foods')
})

// GET: /facebook => invoke Facebook Log In
router.get('/facebook', passport.authenticate('facebook'),
    (req, res, next) => {}
)

// GET: /facebook/callback => process successful facebook log in
router.get('/facebook/callback', passport.authenticate('facebook', {
  failureRedirect: '/login'
}), (req, res, next) => {
  res.redirect('/foods')
})

module.exports = router;
